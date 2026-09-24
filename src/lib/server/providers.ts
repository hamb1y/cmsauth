import type { GitProvider, GitResponse } from './types';

export class HttpGitProvider implements GitProvider {
  constructor(private base: string, private token: string) {}
  private async call(method: string, path: string, body: Uint8Array | null = null, headers = new Headers()): Promise<GitResponse> {
    const response = await fetch(new URL(path, this.base), { method, body: body ? Buffer.from(body) : undefined, headers: { ...Object.fromEntries(headers), Authorization: `Bearer ${this.token}` } });
    return { status: response.status, headers: { 'content-type': response.headers.get('content-type') ?? 'application/json' }, body: new Uint8Array(await response.arrayBuffer()) };
  }
  getRepo(repo: string) { return this.call('GET', `/repos/${repo}`); }
  getFile(repo: string, path: string, ref?: string) { return this.call('GET', `/repos/${repo}/contents/${path}${ref ? `?ref=${encodeURIComponent(ref)}` : ''}`); }
  putFile(repo: string, path: string, input: unknown) { return this.call('PUT', `/repos/${repo}/contents/${path}`, new TextEncoder().encode(JSON.stringify(input))); }
  deleteFile(repo: string, path: string, input: unknown) { return this.call('DELETE', `/repos/${repo}/contents/${path}`, new TextEncoder().encode(JSON.stringify(input))); }
  listTree(repo: string, ref?: string) { return this.call('GET', `/repos/${repo}/git/trees/${encodeURIComponent(ref ?? 'main')}?recursive=1`); }
  createPullRequest(repo: string, input: unknown) { return this.call('POST', `/repos/${repo}/pulls`, new TextEncoder().encode(JSON.stringify(input))); }
  getPullRequest(repo: string, number: string) { return this.call('GET', `/repos/${repo}/pulls/${number}`); }
  updatePullRequest(repo: string, number: string, input: unknown) { return this.call('PATCH', `/repos/${repo}/pulls/${number}`, new TextEncoder().encode(JSON.stringify(input))); }
  mergePullRequest(repo: string, number: string, input: unknown) { return this.call('PUT', `/repos/${repo}/pulls/${number}/merge`, new TextEncoder().encode(JSON.stringify(input))); }
  getBranchHead(repo: string, branch: string) { return this.call('GET', `/repos/${repo}/git/ref/heads/${encodeURIComponent(branch)}`); }
  raw(method: string, path: string, body: Uint8Array | null, headers: Headers) { return this.call(method, path, body, headers); }
}
