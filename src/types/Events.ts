export type ClientToServerEvent =
    | { type: "JOIN_SESSION"; sessionId: string; displayName: string }
    | { type: "CREATE_CARD"; sessionId: string; columnId: string; text: string }
    | { type: "MOVE_CARD"; sessionId: string; cardId: string; toColumnId: string; position: number }
    | { type: "UPDATE_CARD"; sessionId: string; cardId: string; text: string }
    | { type: "DELETE_CARD"; sessionId: string; cardId: string };

export type ServerToClientEvent =
    | { type: "SESSION_STATE"; sessionId: string /* full board snapshot */ }
    | { type: "CARD_CREATED"; sessionId: string; card: any }
    | { type: "CARD_MOVED"; sessionId: string; cardId: string; toColumnId: string; position: number }
    | { type: "CARD_UPDATED"; sessionId: string; card: any }
    | { type: "CARD_DELETED"; sessionId: string; cardId: string }
    | { type: "USER_JOINED"; sessionId: string; participant: any }
    | { type: "USER_LEFT"; sessionId: string; participantId: string };
