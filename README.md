# Site: sicknesslabs_com

Content site about indie project diseases &mdash; founder syndrome, burnout, feature creep, scope creep, and other common pitfalls for solo founders and indie hackers.

## Template

`inSite` (components live in `site/sicknesslabs_com/components/`)

## Directory Structure

```
settings.json         # Template selection + site settings
src/                  # Page content (JSON)
  layout/             # Global layout pieces (header, footer)
  founder/            # Founder section articles (4)
  idea/               # Idea section articles (3)
  build/              # Build section articles (4)
  market/             # Market section articles (4)
  launch/             # Launch section articles (4)
  graveyard/          # Graveyard section articles (3)
html/                 # Generated static HTML (gitignored)
components/           # inSite template components (atoms, molecules, organisms, roots)
assets/               # Static assets (images, icons, JS)
```

## Pages

| Page | Source JSON | Description |
|------|-----------|-------------|
| Home | `src/home.json` | Homepage |
| About | `src/about.json` | About page |
| Sitemap | `src/sitemap.json` | Sitemap page |
| 404 | `src/404.json` | Error page |

### Sections (6) &mdash; 22 articles total

| Section | Index | Articles |
|---------|-------|----------|
| Founder | `src/founder.json` | founder-syndrome, startup-burnout, imposter-syndrome, procrastination |
| Idea | `src/idea.json` | analysis-paralysis, shiny-object-syndrome, validation-skip |
| Build | `src/build.json` | feature-creep, scope-creep, mvp-overengineering, feature-prioritization |
| Market | `src/market.json` | customer-validation, market-validation, product-market-fit, pricing-phobia |
| Launch | `src/launch.json` | launch-fear, no-distribution, no-audience-first, mvp-launch |
| Graveyard | `src/graveyard.json` | zombie-projects, perpetual-beta, pivot-or-quit |
