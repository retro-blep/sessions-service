// import { Request, Response } from "express";
import { SessionService } from "../services/SessionService";
import { CardService } from "../services/CardService";
import { StatusCodes } from "http-status-codes";
import { logger } from "../lib/logger";
import {
  Get,
  JsonController,
  Post,
  Body,
  HttpCode,
  Param,
  Delete,
  Patch,
} from "routing-controllers";
import { prefixedLogger } from "../lib/Helper";
import { CreateSessionDto } from "../models/dto/CreateSessionDto";

@JsonController("/session")
// @UseBefore(bodyParser.urlencoded({ extended: true }), bodyParser.json())
export class SessionController {
  private log = prefixedLogger(logger, "SessionController | ");

  constructor(
    private sessionService: SessionService,
    private cardService: CardService,
    // @logger(__filename) private log: typeof logger,
  ) {}

  @Get("/")
  @HttpCode(StatusCodes.OK)
  public async getSessions(): Promise<any | void> {
    const sessions = await this.sessionService.listSessions();
    // this.log.info({ count: sessions.length }, "Listing sessions");
    return sessions;
  }

  @Get("/:sessionId")
  @HttpCode(StatusCodes.OK)
  public async getSpecificSession(
    @Param('sessionId') sessionId: any,
  ): Promise<any | void> {
    this.log.info("sessionId", JSON.stringify(sessionId));
    const idNum = sessionId;
    this.log.info(`Retrieving session #${idNum}.`);
    const sessions = await this.sessionService.getSessionById(sessionId);
    return sessions;
  }

  @Post("/")
  @HttpCode(StatusCodes.CREATED)
  public async postSession(
    @Body() body: CreateSessionDto,
  ): Promise<any | void> {
    try {
      if (!body) throw new Error("empty body; nothing can be created here.");
      const session = await this.sessionService.createSession(body);
      this.log.info({ sessionId: session.id }, "Session created");
      return session;
    } catch (error: any) {
      this.log.error({ error }, "Error creating session");
      throw new Error(
        `Internal Server Error, oopsie daisies (i don't actually know what happened, i'm just an stdout type of log lol, but this guy might: ${error.message || JSON.stringify(error)}`,
      );
    }
  }

  @Post("/:sessionId/cards")
  @HttpCode(StatusCodes.CREATED)
  public async postCards(
    @Body() body: any,
    @Param('sessionId') sessionId : any
  ): Promise<any | void> {
    try {
      if (!sessionId) throw new Error("no session ?!? No cards then :/.");
      const { columnId, content } = body;
      
      const input = { columnId, content, sessionId };
      const sessionCards = await this.cardService.createCard(input);
      this.log.info({ sessionId: sessionCards.id }, "Cards for this session created");
      return sessionCards;
    } catch (error: any) {
      this.log.error({ error }, "Error creating session");
      throw new Error(
        `Internal Server Error, oopsie daisies (i don't actually know what happened, i'm just an stdout type of log lol, but this guy might: ${error.message || JSON.stringify(error)}`,
      );
    }
  }

  @Get("/:sessionId/cards")
  @HttpCode(StatusCodes.CREATED)
  public async getCards(
    @Param('sessionId') sessionId: any
  ): Promise<any | void> {
    try {
      // IMPLEMENT THIS THING lolol
      const cards = await this.cardService.listCardsBySession(sessionId);
      return cards;
    } catch (error: any) {
      this.log.error({ error }, "Error creating session");
      throw new Error(
        `Internal Server Error, oopsie daisies (i don't actually know what happened, i'm just an stdout type of log lol, but this guy might: ${error.message || JSON.stringify(error)}`,
      );
    }
  }

  @Patch("/:sessionId/:cardId")
  @HttpCode(StatusCodes.OK)
  public async updateCards(
    @Body() body: CreateSessionDto,
  ): Promise<any | void> {
    try {
      if (!body) throw new Error("empty body; nothing can be created here.");
      const session = await this.sessionService.createSession(body);
      this.log.info({ sessionId: session.id }, "Session created");
      return session;
    } catch (error: any) {
      this.log.error({ error }, "Error creating session");
      throw new Error(
        `Internal Server Error, oopsie daisies (i don't actually know what happened, i'm just an stdout type of log lol, but this guy might: ${error.message || JSON.stringify(error)}`,
      );
    }
  }

  @Delete("/:sessionId/:cardId")
  @HttpCode(StatusCodes.OK)
  public async deleteCards(): Promise<any | void> {
    try {
      // delete card service 
      return true;
    } catch (error: any) {
      this.log.error({ error }, "Error creating session");
      throw new Error(
        `Internal Server Error, oopsie daisies (i don't actually know what happened, i'm just an stdout type of log lol, but this guy might: ${error.message || JSON.stringify(error)}`,
      );
    }
  }
}
