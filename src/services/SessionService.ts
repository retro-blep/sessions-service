import { DataSource, Repository } from 'typeorm';
import { Service } from 'typedi';
import { Session } from '../models/Session';
// import { SessionRepo } from '../repos/SessionRepo';
import { logger } from '../lib/logger';
import { prefixedLogger, hashPassword, verifyPassword } from '../lib/Helper';
import { randomUUID } from 'crypto';


@Service()
export class SessionService {
  private log = prefixedLogger(logger, "SessionService | ");
  private sessionRepo;

  constructor(
    private dataSource: DataSource,
  ) {
    this.sessionRepo = this.dataSource.getMongoRepository(Session);
  }

  public async createSession(body: any): Promise<Session | any> {

    // this.log.info(`createSession :: Creating session with name: ${name}`);
    const now = new Date();
    const session: Session = {
      ...(body as Session),
      id: randomUUID(),
      settings: body.settings
        ? {
          ...body.settings,
          psswd: body.settings.psswd ? await hashPassword(body.settings.psswd) : undefined,
        }
        : undefined,
      createdAt: now,
      updatedAt: now,
    };
    const sessionSave = this.sessionRepo.create(session);
    return await this.sessionRepo.save(sessionSave);
  };

  public async getSessionById(id: string): Promise<Session | any> {
    this.log.info("getSessionById :: Fetching session with id:", id);
    return await this.sessionRepo.findOneBy({ id });
  };

  public async updateSessionName(id: string, name: string): Promise<Session | any> {
    this.log.info("updateSessionName :: Updating session with id:", id);
    return await this.sessionRepo.update({ id }, { name, updatedAt: new Date() });
  };

  // REMEMBER: make a delete sessions function later ya? maybe archive it or something

  public async listSessions(filter?: Partial<Session>): Promise<any> {
    this.log.info("listSessions :: Listing all sessions");
    const sessions = await this.sessionRepo.find({
      where: filter,
      order: { createdAt: "DESC" }
    });
    logger.info({ count: (sessions).length }, "Listing sessions");
    return sessions;
  };
}