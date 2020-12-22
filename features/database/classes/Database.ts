import {Pool, PoolConfig} from "pg";

export interface Database {
  config: PoolConfig;
  pool: Pool;
  connected: boolean;
}

export class Database {
  constructor(config: PoolConfig) {
    this.config = config;
    this.pool = new Pool(config);
    this.connected = false;
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
