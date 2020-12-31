import {Pool, PoolConfig} from "pg";

export interface Database {
  config: PoolConfig;
  pool: Pool;
  connected: boolean;
}

export class Database {
  private static instance: Database | null = null;

  private constructor(config: PoolConfig) {
    this.config = config;
    this.pool = new Pool({...config, max: 10});
    this.connected = false;
  }

  static setup(config: PoolConfig) {
    if (Database.instance) {
      console.log("Database already initialized.");
      return Database.instance;
    }
    Database.instance = new Database(config);
    return Database.instance;
  }

  async query<T>(query: string) {
    if (!this.connected) {
      // console.log("Connecting with PostgreSQL pool!");
      await this.pool.connect();
      this.connected = true;
    }
    const {rowCount: count, rows: data} = await this.pool.query<T>(query);
    return {count, data};
  }
}
