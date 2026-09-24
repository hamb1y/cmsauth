import { randomUUID } from 'node:crypto';
import type { Role, User } from './types';
export interface AdminUser extends User { disabled: boolean; memberships: { siteId: string; role: Role }[]; }
const users = new Map<string, AdminUser>([['dev-user', { id: 'dev-user', email: 'editor@example.org', name: 'CMS Editor', login: 'editor-example-org', htmlUrl: '/admin', disabled: false, memberships: [{ siteId: 'pilot-jnvckm', role: 'admin' }] }]]);
export function listUsers(): AdminUser[] { return [...users.values()]; }
export function createUser(input: { email: string; name: string; role: Role; siteId: string }): AdminUser { const id = randomUUID(); const user = { id, email: input.email.toLowerCase(), name: input.name, login: input.email.toLowerCase().replace(/[^a-z0-9]+/g, '-'), htmlUrl: '/admin/users', disabled: false, memberships: [{ siteId: input.siteId, role: input.role }] }; users.set(id, user); return user; }
