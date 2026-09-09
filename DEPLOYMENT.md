# Deployment

This portfolio is designed for **static hosting**: GitHub Pages, Cloudflare Pages, and Vercel.

## GitHub Pages

1. Settings → Pages → Source: GitHub Actions (preferred) or `gh-pages`.
2. For a project site, the live URL is:

`https://dev-moe-kyawaung.github.io/moekyawaung-developer-portfolio-44/`

3. If using Next.js, export static files (`output: 'export'`) so Pages can serve HTML.

Example workflow (`.github/workflows/deploy.yml`):

```yaml
name: Deploy GitHub Pages
on:
  push:
    branches: [main]
permissions:
  contents: read
  pages: write
  id-token: write
jobs:
  deploy:
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
      - run: npm ci
      - run: npm run build
      - uses: actions/upload-pages-artifact@v3
        with:
          path: out
      - id: deployment
        uses: actions/deploy-pages@v4
