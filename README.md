# cmsauth

`cmsauth` is a SvelteKit service boundary for Sveltia CMS: one deployment can serve multiple sites while keeping site identity, editor identity, roles, sessions, and Git credentials separate.

## Run locally

```sh
npm install
cp .env.example .env
npm run check
npm test
npm run build
npm run dev
```

Set `DATABASE_URL` and run `npm run migrate` before enabling the persistent adapters. The checked-in pilot config is at [`public/admin/config.yml`](public/admin/config.yml). It is the only site-facing change required.

## Architecture seams

- `Db` in `src/lib/server/db.ts` is SQL-only and has a Postgres adapter.
- `GitProvider` in `src/lib/server/types.ts` is implemented by the GitHub adapter and the generic HTTP/GitLab adapters.
- `GitCredential` in `src/lib/server/credential.ts` is the seam for GitHub App installation tokens.
- Password, TOTP, OAuth, and mail delivery are kept behind service modules so provider changes do not alter proxy authorization.

The proxy derives the site from `/gh/{owner}/{repo}`, checks the configured repository, strips/replaces the inbound authorization, rejects absolute and traversal paths, and allows CORS only for the site record's origins. Sessions are site-bound; a token issued for one site is not valid on another.

## Deployment

The included [`Dockerfile`](Dockerfile) runs on a container host. [`vercel.json`](vercel.json) targets Vercel's Node runtime. Run the idempotent SQL migration during deployment. Vercel's Node function request body limit is 4.5 MB, so site owners should keep CMS media below that limit.

SQLite/Turso would require a new `Db` adapter, migration dialect, and transaction/error semantics; no business or proxy code should change.

## Current delivery

The seven requested phases are represented in the repository: proxy spike and Sveltia config, Postgres schema/adapter, password/TOTP/session primitives and popup contract, credential/provider seams, RBAC and audit schema, GitLab adapter, and deployment/runbook documentation. Production rollout still requires real Google credentials, a mailer implementation, a GitHub App installation token, and a database; development uses an intentionally marked in-memory session and token fallback for smoke tests.
