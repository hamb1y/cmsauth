import type { Site } from './types';

const pilot: Site = { id: 'pilot-jnvckm', tenantId: 'jnvckm', label: 'JNVCKM Alumni Association', repo: 'hamb1y/jnvckm', branch: 'main', provider: 'github', apiRoot: 'http://localhost:5173/gh/hamb1y/jnvckm', allowedOrigins: ['http://localhost:5173'], credentialRef: 'development-token', enabled: true, settings: {} };
const sites = new Map([[pilot.apiRoot, pilot], ['https://auth.example.org/gh/hamb1y/jnvckm', { ...pilot, apiRoot: 'https://auth.example.org/gh/hamb1y/jnvckm' }]]);
export function resolveSite(apiRoot: string): Site | undefined { return sites.get(apiRoot); }
export function resolveSiteFromPath(pathname: string): Site | undefined { const match = pathname.match(/^\/gh\/([^/]+)\/([^/]+)(?:\/|$)/); return match ? [...sites.values()].find((s) => s.repo === `${match[1]}/${match[2]}`) : undefined; }
export function registerSite(site: Site): void { sites.set(site.apiRoot, site); }
