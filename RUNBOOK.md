# cmsauth runbook

## Rotate keys

Add the new encryption key with a new key id, read/decrypt rows using their stored key id, and rewrite them with the new key during a maintenance job. Do not replace `SESSION_SECRET` without revoking all sessions.

## Revoke a session

Set `sessions.revoked_at = now()` for the session id. The proxy checks revocation on every persistent-session lookup.

## Add a site

Insert a tenant and site row with a unique `api_root`, exact `allowed_origins`, the provider name, branch, and credential reference. Copy the generated `/api/admin/config?repo=owner/name` YAML into that site's `public/admin/config.yml`.

## Locked-out admin

Use a recovery code once, revoke all sessions, reset the TOTP secret, and enroll a new authenticator. If no recovery code remains, perform the change through a reviewed database maintenance session and record it in `audit`.

## Database backups

Use the provider's encrypted, point-in-time Postgres backups. Test restoring into a separate database before relying on it. Backups contain encrypted secrets but should still be treated as production credentials.
