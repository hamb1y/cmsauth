import { json } from '@sveltejs/kit';
export const GET = ({ url }) => { const repo = url.searchParams.get('repo') ?? 'owner/site'; const origin = url.origin; return json({ yaml: `backend:\n  name: github\n  repo: ${repo}\n  branch: main\n  base_url: ${origin}\n  api_root: ${origin}/gh/${repo}\n  auth_methods: [oauth]\n  open_authoring: false\n` }); };
