import { DataSource, MongoRepository } from "typeorm";
import { Cards } from "../models/Cards";
import { Service } from "typedi";
import { prefixedLogger } from "../lib/Helper";
import { logger } from "../lib/logger";
import { randomUUID } from "crypto";


@Service()
export class CardService {
    private log = prefixedLogger(logger, "CardService | ");
    private cardsRepo: MongoRepository<Cards>;

  constructor(
    private dataSource: DataSource,
) {
    this.cardsRepo =  this.dataSource.getMongoRepository(Cards);

}

  public async createCard(input: any): Promise<Cards | any> {
    this.log.info(`createCard :: Creating card with sessionId: ${input?.sessionId}`);
    const now = new Date();
    const card: Cards = {
        ...(input as Cards),
      cardId: `CARD-${randomUUID()}`,
      sessionId: input?.sessionId,
      columnId: input?.columnId,
      content: input?.content,
      hidden: false,
      votes: 0,
      createdAt: now,
      updatedAt: now,
    };
    const cardSave = this.cardsRepo.create(card);
    return await this.cardsRepo.save(cardSave);
  }

  async updateCardText(cardId: string, sessionId: string, text: string): Promise<Cards | null> {
    const card = await this.cardsRepo.findOne({ where: { cardId, sessionId } });
    if (!card) return null;

    card.content = text;
    card.updatedAt = new Date();
    return this.cardsRepo.save(card);
  }

  // later =  moveCard (column to column? it is frontend, but needs to be updated in the db), deleteCard, etc.
}
