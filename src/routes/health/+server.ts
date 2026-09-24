export const GET = () => new Response(JSON.stringify({ ok: true, service: 'cmsauth' }), { headers: { 'content-type': 'application/json' } });
