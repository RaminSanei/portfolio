    # GitHub Pages - Ready build

This archive was prepared to be ready for **GitHub Pages**.

Changes made automatically:
- Renamed `main.html` → `index.html`
- Added an empty `.nojekyll` file to avoid Jekyll processing (recommended for static sites).

How to publish (quick options):

1) Create a new GitHub repo (e.g. `username/portfolio`) and push:
```bash
git init
git add .
git commit -m "Initial site"
git branch -M main
git remote add origin https://github.com/<username>/<repo>.git
git push -u origin main
```

2) Or, on GitHub web:
- Create a new repo (no README required).
- Drag-and-drop the files in this archive into the repo (Upload files) and commit.

3) Enable Pages:
- Go to **Settings > Pages** in the repo.
- Under "Build and deployment" choose **Deploy from a branch**, branch: `main` and folder: `/ (root)`.
- Save. Your site will be published at:
  `https://<username>.github.io/<repo>/` (or `https://<username>.github.io/` if repo named `<username>.github.io`).

More detailed docs:
- GitHub Pages quickstart and page configuration in the official docs.

If you want, I can also:
- prepare a `gh` CLI command sequence, or
- create a `gh-pages` branch workflow if you prefer that publish method.
