import { createHash, randomBytes, timingSafeEqual } from 'node:crypto';
import type { Role } from './types';
export const hashToken = (token: string) => createHash('sha256').update(token).digest('hex');
export const newOpaqueToken = () => randomBytes(32).toString('base64url');
export function isSafeProviderPath(path: string): boolean { return path.startsWith('/') && !path.startsWith('//') && !/^https?:/i.test(path) && !path.includes('://') && !path.split('/').includes('..'); }
export function canWrite(role: Role): boolean { return role === 'admin' || role === 'editor' || role === 'author'; }
export function safeEqual(a: string, b: string): boolean { const aa = Buffer.from(a); const bb = Buffer.from(b); return aa.length === bb.length && timingSafeEqual(aa, bb); }
