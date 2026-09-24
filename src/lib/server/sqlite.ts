import { createClient, type Client } from '@libsql/client';

export interface Db { query<T = Record<string, unknown>>(text: string, values?: unknown[]): Promise<{ rows: T[] }>; transaction<T>(fn: (db: Db) => Promise<T>): Promise<T>; }
function client(): Client { return createClient({ url: process.env.TURSO_DATABASE_URL ?? 'file::memory:', authToken: process.env.TURSO_AUTH_TOKEN }); }
export class SqliteDb implements Db {
  constructor(private readonly connection: Client = client()) {}
  async query<T = Record<string, unknown>>(text: string, values: unknown[] = []) { const result = await this.connection.execute({ sql: text, args: values as any }); return { rows: result.rows as unknown as T[] }; }
  async transaction<T>(fn: (db: Db) => Promise<T>): Promise<T> { await this.connection.execute('BEGIN'); try { const result = await fn(this); await this.connection.execute('COMMIT'); return result; } catch (error) { await this.connection.execute('ROLLBACK'); throw error; } }
}
export const db = new SqliteDb();
