import { error } from '@sveltejs/kit';
import { resolveSiteFromPathAsync } from '$lib/server/sites';
import { proxy } from '$lib/server/proxy';
import type { RequestHandler } from './$types';
async function siteFor(event: Parameters<RequestHandler>[0]) { const site = await resolveSiteFromPathAsync(event.url.pathname); if (!site || !site.enabled) throw error(404, 'site not found'); return site; }
export const OPTIONS: RequestHandler = async (event) => { const site = await siteFor(event); return cors(new Response(null, { status: 204 }), site, event.request.headers.get('origin')); };
export const GET: RequestHandler = async (event) => { const site = await siteFor(event); return cors(await proxy(event, site, event.params.rest), site, event.request.headers.get('origin')); };
export const HEAD: RequestHandler = GET;
export const POST: RequestHandler = async (event) => { const site = await siteFor(event); return cors(await proxy(event, site, event.params.rest), site, event.request.headers.get('origin')); };
export const PUT: RequestHandler = POST; export const PATCH: RequestHandler = POST; export const DELETE: RequestHandler = POST;
function cors(response: Response, site: Awaited<ReturnType<typeof siteFor>>, origin: string | null): Response { const headers = new Headers(response.headers); if (origin && site.allowedOrigins.includes(origin)) { headers.set('access-control-allow-origin', origin); headers.set('access-control-allow-credentials', 'false'); headers.set('access-control-allow-methods', 'GET,HEAD,POST,PUT,PATCH,DELETE,OPTIONS'); headers.set('access-control-allow-headers', 'Authorization, Content-Type'); headers.set('vary', 'Origin'); } return new Response(response.body, { status: response.status, headers }); }
