import { json } from '@sveltejs/kit';
import { db } from '$lib/server/sqlite';
export const GET = async () => { if (!process.env.TURSO_DATABASE_URL) return json({ entries: [] }); try { const result = await db.query('SELECT created_at as createdAt, site_id as siteId, user_id as userId, method, path, status FROM audit ORDER BY created_at DESC LIMIT 200'); return json({ entries: result.rows }); } catch { return json({ entries: [] }); } };
