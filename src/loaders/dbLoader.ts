// import { DataSourceOptions, DatabaseManager } from 'typeorm';
import { DataSourceOptions } from 'typeorm';
import { DatabaseManager } from './DatabaseManager';
import { env } from '../env';

type Options = DataSourceOptions & { name: string };
export const initializeDatabase = async (): Promise<void> => {
        const connectionOptions: Options[] = [
            {
            url: env.db.url,
            type: env.db.type as any, 
            username: env.db.username, 
            password: env.db.password, 
            database: env.db.database, 
            replicaSet: env.db.replicaset, 
            sslValidate:env.db.sslValidation,
            logging: env.db.logging, 
            migrationsRun:env.db.runMigrations,
            dropSchema: env.db.dropSchema,
            port: env.db.port,
            entities: env.dirs.entities, 
            name: 'default',
            },
        ];
        
        await DatabaseManager.init(connectionOptions);            
    };
