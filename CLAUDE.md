# Sickness Labs — AI Instructions

Content site about "indie project diseases" — founder syndrome, burnout, feature creep, scope creep, etc.

**Template:** `inSite` — components live in `site/sicknesslabs_com/components/`. See `../../docs/reference.md` → "`inSite` Template Pattern".

## Site Structure

6 sections, 22 articles:

- `/founder/` (4) — `founder-syndrome`, `startup-burnout`, `imposter-syndrome`, `procrastination`
- `/idea/` (3) — `analysis-paralysis`, `shiny-object-syndrome`, `validation-skip`
- `/build/` (4) — `feature-creep`, `scope-creep`, `mvp-overengineering`, `feature-prioritization`
- `/market/` (4) — `customer-validation`, `market-validation`, `product-market-fit`, `pricing-phobia`
- `/launch/` (4) — `launch-fear`, `no-distribution`, `no-audience-first`, `mvp-launch`
- `/graveyard/` (3) — `zombie-projects`, `perpetual-beta`, `pivot-or-quit`

### Page Structure Pattern

- **Section index:** `o_breadcrumbs` + `o_hero` + `o_cards`
- **Article:** `o_breadcrumbs` + `o_hero_article` + `o_paragraphs` (multiple) + optional enrichments (`o_image_grid`, `o_comparison_table`, `o_checklist`, `o_howto`) + `o_faq` + `o_cards`
- **Home:** `o_hero` + `o_html`
- **About:** `o_breadcrumbs` + `o_paragraphs`

`o_cards` at the bottom of articles acts as "Next Read" links. `o_faq` emits FAQPage JSON-LD, `o_howto` emits HowTo JSON-LD, `o_breadcrumbs` emits BreadcrumbList JSON-LD.

## Hosting: Cloudflare Workers (Static Assets)

Primary: `www.sicknesslabs.com`. Non-www → www redirect is set in the Cloudflare dashboard (DNS → Rules → Redirect Rules), not in the Worker.

### Files

- **`wrangler.jsonc`** — Worker config (routes, assets directory, html handling, 404)
- **`_redirects`** — `/favicon.ico`, `/style.min.*.css` cache busting
- **`public/`** — generated deploy directory (gitignored), built by `scripts/deploy.sh`

### How `public/` is built

`scripts/deploy.sh sicknesslabs_com` assembles `public/`:

```
html/*           → public/*           (home.html renamed to index.html)
style.min.css    → public/style.min.css
assets/          → public/assets/     (icons/, imgs/, logo.svg)
root files       → public/            (robots.txt, sitemap.xml, sitemap-images.xml, site.webmanifest, ads.txt, humans.txt, llms.txt, llms-full.txt)
_redirects       → public/_redirects
```

### Routing (Cloudflare, no Worker script)

- `html_handling: "auto-trailing-slash"` — `/about` → 301 → `/about/` → serves `about.html`
- `not_found_handling: "404-page"` — missing pages serve `404.html`
- `_redirects` handles `/favicon.ico` and `/style.min.{timestamp}.css` cache busting

### Deploy

```bash
wrangler login                              # first time only
scripts/deploy.sh sicknesslabs_com          # builds public/ and runs wrangler deploy
```

### Do NOT deploy

`src/`, `components/`, `dist/`, `keywords/`, `trash/`, `settings.json`, `keywords.json`, `.htaccess`, `style.css`, `filelist.php`, `CLAUDE.md`, `README.md` — CMS/admin only, not needed in production.
