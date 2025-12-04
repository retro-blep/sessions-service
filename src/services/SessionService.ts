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
    const session: Session = {
      ...body as Session,
      _id: randomUUID(),
      settings: {
        psswd: body.settings?.psswd ? await hashPassword(body.settings.psswd) : undefined,

       },
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const sessionSave = this.sessionRepo.create(session);
    return await this.sessionRepo.save(sessionSave);
  };

  public async getSessionById(id: string): Promise<Session | any> {
    this.log.info("getSessionById :: Fetching session with id:", id);
    return await this.sessionRepo.find({ where: { id } });
  };

  public async updateSessionName(id: string, name: string): Promise<Session | any> {
    this.log.info("updateSessionName :: Updating session with id:", id);
    return await this.sessionRepo.updateOne({ where: { id } }, { $set: { name } })
  };

  // REMEMBER: make a delete sessions function later ya? maybe archive it or something

  public async listSessions(filter?: Partial<Session>): Promise<any> {
    this.log.info("listSessions :: Listing all sessions");
    const sessions = await this.sessionRepo.find({
      where: filter,
      order: { createdAt: -1 }
    });
    logger.info({ count: (sessions).length }, "Listing sessions");
    return sessions;
  };
}