import { WebSocketServer, WebSocket } from "ws";
import type { IncomingMessage } from "http";
import type { ClientToServerEvent, ServerToClientEvent } from "../types/Events";
import { CardService } from "../services/CardService";
import { prefixedLogger } from "./Helper";
import { logger } from "./logger";

type SessionId = string;

interface AuthedSocket extends WebSocket {
    sessionId?: SessionId;
    displayName?: string;
    userId?: string; // optional: if you add auth later
}

export class RealtimeHub {
    private log = prefixedLogger(logger, "RealtimeHub | ");
    private wss: WebSocketServer;
    private sessions = new Map<SessionId, Set<AuthedSocket>>();
    
    constructor(
        server: import("http").Server,
        private readonly cardService?: CardService
        
    ) {;
        this.wss = new WebSocketServer({ noServer: true });

        server.on("upgrade", (req, socket, head) => {
            const { url } = req;
            if (!url?.startsWith("/ws")) {
                socket.destroy();
                return;
            }

            this.wss.handleUpgrade(req, socket, head, (ws) => {
                this.wss.emit("connection", ws, req);
            });
        });

        this.setupHandlers();
    }

    private setupHandlers() {
        this.wss.on("connection", (socket: AuthedSocket, req: IncomingMessage) => {
            // FOR NOW. obviously not going to be localhost for long, can't be annoyed to do the other stuff
            const url = new URL(req.url ?? "", "http://localhost");
            const sessionId = url.searchParams.get("sessionId") ?? undefined;
            const displayName = url.searchParams.get("displayName") ?? "Anonymous";

            if (!sessionId) {
                socket.close(1008, "sessionId required");
                return;
            }

            socket.sessionId = sessionId;
            socket.displayName = displayName;
            this.addSocketToSession(sessionId, socket);

            this.log.info(`[WS] client connected: session=${sessionId} name=${displayName}`);

            this.broadcastToSession(sessionId, {
                type: "USER_JOINED",
                sessionId,
                participant: { displayName },
            } as ServerToClientEvent);

            socket.on("message", (data) => {
                this.handleMessage(socket, data.toString());
            });

            socket.on("close", () => {
                this.removeSocketFromSession(sessionId, socket);
                this.log.info(`[WS] client disconnected: session=${sessionId} name=${displayName}`);

                this.broadcastToSession(sessionId, {
                    type: "USER_LEFT",
                    sessionId,
                    participantId: displayName, // or some id 
                } as ServerToClientEvent);
            });
        });
    }

    private addSocketToSession(sessionId: SessionId, socket: AuthedSocket) {
        if (!this.sessions.has(sessionId)) {
            this.sessions.set(sessionId, new Set());
        }
        this.sessions.get(sessionId)!.add(socket);
    }

    private removeSocketFromSession(sessionId: SessionId, socket: AuthedSocket) {
        const set = this.sessions.get(sessionId);
        if (!set) return;
        set.delete(socket);
        if (set.size === 0) {
            this.sessions.delete(sessionId);
        }
    }

    private handleMessage(socket: AuthedSocket, raw: string) {
        let event: ClientToServerEvent;
        try {
            event = JSON.parse(raw);
        } catch (e) {
            this.log.warn("[WS] invalid JSON from client", e);
            return;
        }

        this.dispatchClientEvent(socket, event).catch((err) => {
            this.log.error("[WS] error handling client event", err);
            // you can send back an error event if you want
        });
    }

    //  domain services call !
    private async dispatchClientEvent(
        socket: AuthedSocket,
        event: ClientToServerEvent,
    ): Promise<void> {
        const sessionId = socket.sessionId!;
        switch (event.type) {
            case "JOIN_SESSION": {
                // Later: load full session, send SESSION_STATE
                // const state = await this.sessionService.getSessionState(event.sessionId);
                // this.send(socket, { type: "SESSION_STATE", sessionId, ...state });
                break;
            }

            case "CREATE_CARD": {
                const card = await this.cardService?.createCard({
                    sessionId,
                    columnId: event.columnId,
                    content: event.text,
                });

                this.broadcastToSession(sessionId, {
                    type: "CARD_CREATED",
                    sessionId,
                    card,
                } as ServerToClientEvent);
                break;
            }
            case "MOVE_CARD": {
                this.broadcastToSession(sessionId, {
                    type: "CARD_MOVED",
                    sessionId,
                    cardId: event.cardId,
                    toColumnId: event.toColumnId,
                    position: event.position,
                } as ServerToClientEvent);
                break;
            }

            case "UPDATE_CARD": {
                // Later: call cardService.update
                this.broadcastToSession(sessionId, {
                    type: "CARD_UPDATED",
                    sessionId,
                    card: {
                        cardId: event.cardId,
                        content: event.text,
                    },
                } as ServerToClientEvent);
                break;
            }

            case "DELETE_CARD": {
                // Later: cardService.delete
                this.broadcastToSession(sessionId, {
                    type: "CARD_DELETED",
                    sessionId,
                    cardId: event.cardId,
                } as ServerToClientEvent);
                break;
            }

            default: {
                this.log.warn("[WS] unhandled event type", (event as any).type);
            }
        }
    }

    public broadcastToSession(sessionId: SessionId, event: ServerToClientEvent) {
        const sockets = this.sessions.get(sessionId);
        if (!sockets || sockets.size === 0) return;

        const msg = JSON.stringify(event);
        for (const socket of sockets) {
            if (socket.readyState === WebSocket.OPEN) {
                socket.send(msg);
            }
        }
    }

    public send(socket: WebSocket, event: ServerToClientEvent) {
        if (socket.readyState === WebSocket.OPEN) {
            socket.send(JSON.stringify(event));
        }
    }
}
