import { json } from '@sveltejs/kit';
import { createUser, listUsers } from '$lib/server/admin-store';
export const GET = () => json({ users: listUsers() });
export const POST = async ({ request }) => { const body = await request.json(); if (!body.email || !body.name) return json({ error: 'email and name are required' }, { status: 400 }); return json({ user: createUser({ email: body.email, name: body.name, role: body.role ?? 'editor', siteId: body.siteId ?? 'pilot-jnvckm' }) }, { status: 201 }); };
