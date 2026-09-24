import { HttpGitProvider } from './providers';
export class GitLabProvider extends HttpGitProvider { constructor(token: string) { super('https://gitlab.com/api/v4', token); } }
