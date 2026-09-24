import { readFile } from 'node:fs/promises';
import { createClient } from '@libsql/client';
const sql = await readFile(new URL('../migrations/001_initial.sqlite.sql', import.meta.url), 'utf8');
const client = createClient({ url: process.env.TURSO_DATABASE_URL ?? 'file::memory:', authToken: process.env.TURSO_AUTH_TOKEN });
for (const statement of sql.split(';').map((part) => part.trim()).filter(Boolean)) await client.execute(statement);
console.log('SQLite/Turso migrations applied');
