export interface GitCredential { getToken(credentialRef: string): Promise<string>; }
export class GitHubAppCredential implements GitCredential { async getToken(ref: string): Promise<string> { const token = process.env.GITHUB_INSTALLATION_TOKEN; if (!token) throw new Error(`No short-lived token configured for ${ref}`); return token; } }
