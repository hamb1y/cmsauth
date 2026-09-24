import { issueDevelopmentSession } from '$lib/server/auth';
import { resolveSite } from '$lib/server/sites';
import { config } from '$lib/server/config';
import type { RequestHandler } from './$types';
export const GET: RequestHandler = ({ url }) => { const repo = url.searchParams.get('site'); const site = repo ? resolveSite(`${config.baseUrl}/gh/${repo}`) : undefined; if (!site) return new Response('<h1>Unknown site</h1>', { status: 404, headers: { 'content-type': 'text/html' } }); const token = issueDevelopmentSession(site); return new Response(`<!doctype html><meta charset="utf-8"><title>Sign in</title><script>const token=${JSON.stringify(token)};const message='authorization:github:success:'+JSON.stringify({token});if(window.opener){window.opener.postMessage('authorizing:github',location.origin);window.opener.postMessage(message,location.origin);window.close()}</script><p>Signed in. You can close this window.</p>`, { headers: { 'content-type': 'text/html; charset=utf-8' } }); };
