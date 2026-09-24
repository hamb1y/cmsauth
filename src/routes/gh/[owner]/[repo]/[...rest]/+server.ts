import { error } from '@sveltejs/kit';
import { resolveSiteFromPath, resolveSite } from '$lib/server/sites';
import { proxy } from '$lib/server/proxy';
import type { RequestHandler } from './$types';
function siteFor(event: Parameters<RequestHandler>[0]) { const site = resolveSiteFromPath(event.url.pathname); if (!site || !site.enabled) throw error(404, 'site not found'); return site; }
export const OPTIONS: RequestHandler = async ({ request }) => { const site = siteFor({ url: new URL(request.url), request } as Parameters<RequestHandler>[0]); return cors(new Response(null, { status: 204 }), site, request.headers.get('origin')); };
export const GET: RequestHandler = async (event) => cors(await proxy(event, siteFor(event), event.params.rest), siteFor(event), event.request.headers.get('origin'));
export const HEAD: RequestHandler = GET;
export const POST: RequestHandler = async (event) => cors(await proxy(event, siteFor(event), event.params.rest), siteFor(event), event.request.headers.get('origin'));
export const PUT: RequestHandler = POST; export const PATCH: RequestHandler = POST; export const DELETE: RequestHandler = POST;
function cors(response: Response, site: ReturnType<typeof siteFor>, origin: string | null): Response { const headers = new Headers(response.headers); if (origin && site.allowedOrigins.includes(origin)) { headers.set('access-control-allow-origin', origin); headers.set('access-control-allow-credentials', 'false'); headers.set('access-control-allow-methods', 'GET,HEAD,POST,PUT,PATCH,DELETE,OPTIONS'); headers.set('access-control-allow-headers', 'Authorization, Content-Type'); headers.set('vary', 'Origin'); } return new Response(response.body, { status: response.status, headers }); }
