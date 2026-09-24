import type { GitProvider, GitResponse } from './types';
import { config } from './config';
const token = () => process.env.GITHUB_INSTALLATION_TOKEN ?? 'development-installation-token';
async function request(method: string, path: string, body: Uint8Array | null, headers?: Headers): Promise<GitResponse> {
  const upstream = new URL(path, config.githubApi);
  const response = await fetch(upstream, { method, headers: { Accept: 'application/vnd.github+json', Authorization: `Bearer ${token()}`, ...(headers ? Object.fromEntries(headers) : {}), ...(body ? { 'Content-Type': headers?.get('content-type') ?? 'application/json' } : {}) }, body: body ? Buffer.from(body) : undefined });
  return { status: response.status, headers: { 'content-type': response.headers.get('content-type') ?? 'application/json' }, body: new Uint8Array(await response.arrayBuffer()) };
}
export const githubProvider: GitProvider = {
  getRepo: (repo) => request('GET', `/repos/${repo}`, null), getFile: (repo, path, ref) => request('GET', `/repos/${repo}/contents/${path}${ref ? `?ref=${encodeURIComponent(ref)}` : ''}`, null), putFile: (repo, path, input) => request('PUT', `/repos/${repo}/contents/${path}`, new TextEncoder().encode(JSON.stringify(input))), deleteFile: (repo, path, input) => request('DELETE', `/repos/${repo}/contents/${path}`, new TextEncoder().encode(JSON.stringify(input))), listTree: (repo, ref) => request('GET', `/repos/${repo}/git/trees/${encodeURIComponent(ref ?? 'main')}?recursive=1`, null), createPullRequest: (repo, input) => request('POST', `/repos/${repo}/pulls`, new TextEncoder().encode(JSON.stringify(input))), getPullRequest: (repo, number) => request('GET', `/repos/${repo}/pulls/${number}`, null), updatePullRequest: (repo, number, input) => request('PATCH', `/repos/${repo}/pulls/${number}`, new TextEncoder().encode(JSON.stringify(input))), mergePullRequest: (repo, number, input) => request('PUT', `/repos/${repo}/pulls/${number}/merge`, new TextEncoder().encode(JSON.stringify(input))), getBranchHead: (repo, branch) => request('GET', `/repos/${repo}/git/ref/heads/${encodeURIComponent(branch)}`, null), raw: request
};
