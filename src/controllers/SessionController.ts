// import { Request, Response } from "express";
import { SessionService } from "../services/SessionService";
import { StatusCodes } from "http-status-codes";
import { logger } from "../lib/logger";
import { Get, JsonController, Post, Body, HttpCode, BadRequestError } from "routing-controllers";
import { prefixedLogger } from "../lib/Helper";
import { CreateSessionDto } from "./dto/CreateSessionDto";

@JsonController('/')
// @UseBefore(bodyParser.urlencoded({ extended: true }), bodyParser.json())
export class SessionController {
  private log = prefixedLogger(logger, "SessionController | ");

  constructor(
      private sessionService: SessionService,
    // @logger(__filename) private log: typeof logger,
  ) { }

  @Get("sessions")
  @HttpCode(StatusCodes.OK)
  public async getSessions(): Promise<any | void> {
    const sessions = await this.sessionService.listSessions();
    // this.log.info({ count: sessions.length }, "Listing sessions");
    return sessions;
  }

  @Post("sessions")
  @HttpCode(StatusCodes.CREATED)
  public async postSession(
    @Body() body: CreateSessionDto
  ): Promise<any | void> {
    try {
      const session = await this.sessionService.createSession(body);
      this.log.info({ sessionId: session.id }, "Session created");
      return session;
    } catch (error) {
      this.log.error({ error }, "Error creating session");
      throw new Error("Internal Server Error, oopsie daisies (i don't actually know what happened, i'm just an stdout type of log lol)");
    }

  }
}