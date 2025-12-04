import { Request, Response } from "express";
import * as HTTP_STATUS from 'http-status-codes';
import { Get, JsonController, UseBefore, Res, HttpCode } from 'routing-controllers';
import { DataSource, Repository } from 'typeorm';
import * as bodyParser from "body-parser";
import { Session } from '../models/Session';
import { logger } from '../lib/logger';
import { prefixedLogger } from '../lib/Helper';

@JsonController('/health')
// @UseBefore(bodyParser.urlencoded({ extended: true }), bodyParser.json())
export class HealthController {
    private log = prefixedLogger(logger, "HealthController | ");
    private sessionRepo;

    constructor(
        private dataSource: DataSource,
    ) {
        this.sessionRepo = this.dataSource.getRepository(Session);
    }

    @Get('/')
    @HttpCode(HTTP_STATUS.OK)
    public async health(@Res() response: Response): Promise<any | undefined> {
        this.log.info('Request to access health');

        const mongoDBStatus = await this.checkMongoHealth();

        const healthStatus = {
            mongoDBStatus,
        };
        const healthStatusCode: number = mongoDBStatus ? HTTP_STATUS.OK : HTTP_STATUS.FAILED_DEPENDENCY;
        return response.status(healthStatusCode).send(healthStatus);
    }

    public async checkMongoHealth(): Promise<boolean> {
        try {
            this.log.info('Request to check mongodb health');
            const userCount = await this.sessionRepo.count();
            if (userCount > -1) {
                this.log.info('Success - checkMongoHealth with usercount' + userCount);
                return Promise.resolve(true);
            } else {
                return Promise.resolve(false);
            }
        } catch (e) {
            this.log.error('Error occurred in checkMongoHealth', e);
            return Promise.resolve(false);
        }
    }


    @Get('/health-api')
    @HttpCode(HTTP_STATUS.OK)
    public async healthApi(@Res() response: Response): Promise<any | undefined> {
        this.log.info('Request to access health-api');
        return response.status(HTTP_STATUS.OK).send({ status: true });
    }
}