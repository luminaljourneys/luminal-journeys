# Luminal Journeys DevOps Reference
> Keep this in the root of the project. Your single source of truth for CI/CD, deployments, and auth.

---

## Daily Workflow — 4 Commands

```bash
# 0. Local development
make dev

# 1. Send to staging (triggers auto-deploy to staging URL)
make stage m="feat: description of what you changed"

# 2. QA on staging URL
# https://luminaljourneys-staging.web.app

# 3. Promote to production when happy
make prod
```

---

## Makefile Commands

| Command | What it does |
|---------|-------------|
| `make dev` | Start local dev server on localhost |
| `make install` | Install npm dependencies |
| `make build` | Build the project locally to dist/ |
| `make commit m="message"` | Stage + commit, no push |
| `make stage m="message"` | Stage + commit + push to dev → triggers staging deploy |
| `make prod` | Merge dev → main → push → triggers production deploy |
| `make ship m="message"` | Emergency: commit + push to dev + merge to main (skips staging QA) |

**Rule: Always run `make` from root `/luminaljourneys/`.**

---

## Project Structure

```
luminaljourneys/          ← root, run all make commands here
├── src/                  ← source code
├── dist/                 ← build output (auto-generated)
├── public/               ← static assets including robots.txt
├── firebase.json         ← Firebase hosting config
├── .firebaserc           ← Firebase project + targets
├── Makefile              ← all commands live here
├── .github/
│   └── workflows/
│       ├── ci.yml        ← runs on dev push, build check only
│       └── deploy.yml    ← runs on dev+main, deploys to staging/production
└── .env.local            ← Firebase config (never commit this)
```

Note: No subfolder — web app lives directly in root. All `npm` commands run from root.

---

## Git Branch Rules

| Branch | Purpose | Deploys to |
|--------|---------|-----------|
| `dev` | All active work | Staging |
| `main` | Stable, reviewed code | Production |

- Never commit directly to `main`
- All work happens on `dev`
- `make prod` handles the merge

---

## Firebase Hosting Targets

| Target | Firebase URL | Custom Domain |
|--------|-------------|---------------|
| production | luminaljourneys.web.app | luminaljourneys.com (DNS pending) |
| staging | luminaljourneys-staging.web.app | — |

---

## Authentication — Workload Identity Federation (Never Expires)

No token. No expiry. GitHub Actions authenticates via repo identity.

### Key resources
- **Firebase Project ID:** `luminaljourneys`
- **Project Number:** `815989961728`
- **Service Account:** `firebase-deployer@luminaljourneys.iam.gserviceaccount.com`
- **Identity Pool:** `github-pool`
- **Provider:** `github-provider`
- **Provider resource name:** `projects/815989961728/locations/global/workloadIdentityPools/github-pool/providers/github-provider`
- **GitHub Repo:** `luminaljourneys/luminaljourneys.github.io`

### GitHub Secrets (already set)
| Secret | Value |
|--------|-------|
| `WIF_PROVIDER` | `projects/815989961728/locations/global/workloadIdentityPools/github-pool/providers/github-provider` |
| `WIF_SERVICE_ACCOUNT` | `firebase-deployer@luminaljourneys.iam.gserviceaccount.com` |

---

## SSH Key Setup

Key: `~/.ssh/id_ed25519_luminal`
Alias: `github-luminal`
Account: `luminaljourneys`

SSH config entry:
```
Host github-luminal
  HostName github.com
  User git
  IdentityFile ~/.ssh/id_ed25519_luminal
  AddKeysToAgent yes
  UseKeychain yes
```

Test connection:
```bash
ssh -T github-luminal
# Expected: Hi luminaljourneys!
```

Keys are stored in macOS Keychain permanently — no manual re-adding after reboot.

---

## GoDaddy DNS Setup — luminaljourneys.com

### Records to keep
| Type | Name | Value |
|------|------|-------|
| A | @ | `199.36.158.100` |
| TXT | @ | `hosting-site=luminaljourneys` |
| TXT | @ | `v=spf1 include:mailgun.org ~all` |

### Records to delete
| Type | Name | Value |
|------|------|-------|
| A | @ | `WebsiteBuilder Site` ← DELETE THIS |

Once deleted → go to Firebase Console → Hosting → luminaljourneys.com → click **Verify**.

DNS propagation can take up to 24 hours but usually resolves in minutes.

---

## robots.txt — Block All Crawlers (Coming Soon Mode)

File location: `public/robots.txt`

```
User-agent: *
Disallow: /
```

Remove or update this when site goes public.

---

## Common Errors & Fixes

| Error | Cause | Fix |
|-------|-------|-----|
| `Permission denied to luminaljourneys` | Wrong SSH key in agent | `ssh-add --apple-use-keychain ~/.ssh/id_ed25519_luminal` |
| `Failed to authenticate, have you run firebase login?` | Credentials not passed to Firebase CLI | Ensure `GOOGLE_APPLICATION_CREDENTIALS` env var is set in deploy step |
| `attribute condition rejected` | WIF provider repo name mismatch | Update provider condition to match exact repo name |
| `Hosting target linked to multiple sites` | Duplicate target mapping | `firebase target:clear hosting staging` then reapply |
| `nothing to commit` on wrong branch | On main instead of dev | `git checkout dev` first |

---

## Project Registry

| Project | Repo | Firebase Project | Staging URL | Production URL |
|---------|------|-----------------|-------------|----------------|
| Luminal Journeys | luminaljourneys/luminaljourneys.github.io | luminaljourneys | luminaljourneys-staging.web.app | luminaljourneys.com |

---

*Last updated: March 25, 2026 — Keeya Wang-Jones / BridgeLogics*