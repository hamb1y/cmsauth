import { json } from '@sveltejs/kit';
import { hashPassword } from '$lib/server/auth-service';
import { allow } from '$lib/server/rate-limit';
export async function POST({ request, getClientAddress }) { if (!allow(`login:${getClientAddress()}`, 10, 60_000)) return json({ error: 'too many attempts' }, { status: 429 }); const body = await request.json(); if (typeof body.password !== 'string' || body.password.length < 12) return json({ error: 'password must be at least 12 characters' }, { status: 400 }); return json({ passwordHash: await hashPassword(body.password) }); }
