import type { RequestEvent } from '@sveltejs/kit';
import type { SessionContext, Site, Role, User } from './types';
import { newOpaqueToken, hashToken } from './security';
const stubUser: User = { id: 'dev-user', email: 'editor@example.org', name: 'CMS Editor', login: 'editor-example-org', htmlUrl: 'http://localhost:5173/admin' };
export function issueDevelopmentSession(site: Site): string { const token = newOpaqueToken(); developmentSessions.set(hashToken(token), { id: 'dev-session', userId: stubUser.id, siteId: site.id, role: 'admin', user: stubUser, expiresAt: new Date(Date.now() + 30 * 86400000) }); return token; }
const developmentSessions = new Map<string, SessionContext>();
export async function getSession(event: RequestEvent, site: Site): Promise<SessionContext | undefined> { const value = event.request.headers.get('authorization')?.replace(/^token\s+/i, '') || event.cookies.get('cmsauth_session'); if (!value) return undefined; const session = developmentSessions.get(hashToken(value)); return session && session.siteId === site.id && session.expiresAt > new Date() ? session : undefined; }
export function roleFromSession(session: SessionContext | undefined): Role | undefined { return session?.role; }
