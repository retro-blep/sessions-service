import { DataSourceOptions, DataSource } from 'typeorm';
type DataSourceConfigs = DataSourceOptions & { name: string };
export class DatabaseManager {
    private static dataSources: Map<string, DataSource> = new Map();

    public static async init(connections?: DataSourceConfigs | DataSourceConfigs[] ): Promise<any> {
        if (!connections) {
            return;
        }

        const configs = Array.isArray(connections) ? connections : [connections];

        for (const config of configs) {
            const name = config.name;
            if (!name) {
                throw new Error('DataSource config is missing a "name" property.');
            }

            // If a DataSource with this name already exists and is initialized, skip.
            const existing = this.dataSources.get(name);
            if (existing && existing.isInitialized) {
                continue;
            }

            const dataSource = new DataSource(config);
            await dataSource.initialize();
            this.dataSources.set(name, dataSource);
        }
    }

    public static getConnection(connectionName?: string): DataSource {
        const name = connectionName ?? 'default';
        const ds = this.dataSources.get(name);
        if (!ds) {
            throw new Error(`DataSource with name "${name}" not found. (psst, check that DatabaseManager.init() was run)`);
        }
        return ds;
    }
}
export {};