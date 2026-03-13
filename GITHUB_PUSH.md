# GitHub Push Reference
**Repo:** `wangjonesprojects/Luminal-Journey`

---

## First Time Setup

### 1. Install GitHub CLI
```bash
brew install gh
```

### 2. Login via browser (no password needed)
```bash
gh auth login
```
Select:
- **GitHub.com**
- **HTTPS**
- **Login with a web browser**

Authenticate in the browser window that opens.

### 3. Wire gh login to git
```bash
gh auth setup-git
```

---

## Every Push

```bash
# 1. Build
npm run build

# 2. Stage all changes
git add .

# 3. Commit with message
git commit -m "your message here"

# 4. Push → triggers GitHub Actions auto-deploy
git push origin main
```

---

## Check Deploy Status

Go to:
```
github.com/wangjonesprojects/Luminal-Journey/actions
```

Deploy takes ~2 minutes. Live URL:
```
https://wangjonesprojects.github.io/Luminal-Journey/
```

---

## Troubleshooting

**403 Permission denied**
```bash
# Wrong git account cached — re-wire with gh
gh auth setup-git
git push origin main
```

**Wrong remote URL**
```bash
git remote set-url origin https://wangjonesprojects@github.com/wangjonesprojects/Luminal-Journey.git
```

**Check current git identity**
```bash
git config user.email
git config user.name
```

**Update git identity**
```bash
git config user.email "hi@keeya.nl"
git config user.name "wangjonesprojects"
```

**Check remote URL**
```bash
git remote -v
```

---

## Routes (local + live)

| Page | Local | Live |
|---|---|---|
| Landing | `localhost:5176/` | `wangjonesprojects.github.io/Luminal-Journey/` |
| Intake | `localhost:5176/intake` | `.../Luminal-Journey/intake` |
| Admin | `localhost:5176/admin` | `.../Luminal-Journey/admin` |
