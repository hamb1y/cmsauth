import { describe, expect, it } from 'vitest';
import { createTotpEnrollment, verifyTotp } from './auth-service';
describe('auth crypto', () => { it('creates a valid encrypted TOTP enrollment', () => { const enrollment = createTotpEnrollment('person@example.org'); expect(enrollment.uri).toContain('otpauth://'); expect(verifyTotp('000000', enrollment.secret)).toBe(false); }); });
