export const config = {
  baseUrl: process.env.PUBLIC_BASE_URL ?? 'http://localhost:5173',
  bootstrapEmail: (process.env.BOOTSTRAP_ADMIN_EMAIL ?? '').toLowerCase(),
  sessionSecret: process.env.SESSION_SECRET ?? 'development-only-session-secret',
  githubApi: 'https://api.github.com'
};
