import { hash, verify } from '@node-rs/argon2';
import { authenticator } from 'otplib';
import { createHash, randomBytes } from 'node:crypto';
import { encrypt } from './crypto';
import { newOpaqueToken, hashToken } from './security';
export const hashPassword = (password: string) => hash(password, { memoryCost: 19456, timeCost: 2, parallelism: 1 });
export const verifyPassword = (password: string, encoded: string) => verify(encoded, password);
export function createTotpEnrollment(email: string) { const secret = authenticator.generateSecret(); return { secret, encrypted: encrypt(secret), uri: authenticator.keyuri(email, 'cmsauth', secret) }; }
authenticator.options = { window: 1 };
export const verifyTotp = (token: string, secret: string) => authenticator.verify({ token, secret });
export function recoveryCodes(count = 10) { return Array.from({ length: count }, () => randomBytes(6).toString('hex')); }
export const hashRecoveryCode = (code: string) => createHash('sha256').update(code).digest('hex');
export function createSessionRecord(userId: string, siteId: string) { const token = newOpaqueToken(); return { token, tokenHash: hashToken(token), userId, siteId, expiresAt: new Date(Date.now() + 30 * 86400000) }; }
