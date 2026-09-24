import { describe, expect, it } from 'vitest';
import { canWrite, isSafeProviderPath } from './security';
import { resolveSiteFromPath } from './sites';
describe('proxy security', () => {
  it('rejects absolute, traversal, and scheme-relative upstream paths', () => { expect(isSafeProviderPath('/repos/a/b')).toBe(true); expect(isSafeProviderPath('//evil.example')).toBe(false); expect(isSafeProviderPath('/https://evil.example')).toBe(false); expect(isSafeProviderPath('/repos/a/../b')).toBe(false); });
  it('binds route repo to the configured site', () => { const site = resolveSiteFromPath('/gh/hamb1y/jnvckm/repos/hamb1y/jnvckm/contents/a'); expect(site?.repo).toBe('hamb1y/jnvckm'); expect(resolveSiteFromPath('/gh/acme/other/repos/hamb1y/jnvckm')).toBeUndefined(); });
  it('keeps viewer read-only', () => { expect(canWrite('viewer')).toBe(false); expect(canWrite('author')).toBe(true); });
});
