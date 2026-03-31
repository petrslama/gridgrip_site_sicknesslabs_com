# Sickness Labs — AI Instructions

## Template: inSite
Template `inSite` means components live directly in `site/sicknesslabs_com/components/`, NOT in `template/inSite/`. This is defined in `admin/index.php`:
```php
TEMPLATE_NAME === 'inSite' ? SITE_DIR . '/components' : ROOT_DIR . '/template/' . TEMPLATE_NAME . '/components'
```

## Components
```
site/sicknesslabs_com/components/
	atoms/        a_button, a_description, a_eyebrow, a_fu_type, a_h1, a_h2, a_h3, a_icon, a_image, a_image_cover
	molecules/    m_buttons, m_section_settings, m_section_title
	organisms/    o_breadcrumbs, o_cards, o_checklist, o_comparison_table, o_faq, o_footer, o_header, o_hero, o_howto, o_html, o_image_grid, o_paragraphs
	roots/        r_debug, r_html, r_seo
```

### Key Components for Articles
- **o_paragraphs** — Article body content. Repeater of items, each with optional `a_h2` heading and `text` (HTML). Articles use multiple o_paragraphs sections.
- **o_cards** — Grid of linked cards with icon, title, description, href. Used on section index pages AND at the bottom of articles as "Next Read" links.
- **o_comparison_table** — Comparison table. Optional article enrichment.
- **o_checklist** — Checklist section. Optional article enrichment.
- **o_howto** — HowTo section with JSON-LD. Optional article enrichment.
- **o_image_grid** — Image grid. Optional article enrichment.

## Site Structure
Content site about "indie project diseases" — founder syndrome, burnout, feature creep, scope creep, etc.

6 sections, 22 articles:
- `/founder/` (4) — founder-syndrome, startup-burnout, imposter-syndrome, procrastination
- `/idea/` (3) — analysis-paralysis, shiny-object-syndrome, validation-skip
- `/build/` (4) — feature-creep, scope-creep, mvp-overengineering, feature-prioritization
- `/market/` (4) — customer-validation, market-validation, product-market-fit, pricing-phobia
- `/launch/` (4) — launch-fear, no-distribution, no-audience-first, mvp-launch
- `/graveyard/` (3) — zombie-projects, perpetual-beta, pivot-or-quit

### Page Structure Pattern
- **Section index pages**: o_breadcrumbs + o_hero + o_cards
- **Article pages**: o_breadcrumbs + o_hero + o_paragraphs (multiple) + optional enrichments (o_image_grid, o_comparison_table, o_checklist, o_howto) + o_faq + o_cards
- **Home**: o_hero + o_html
- **About**: o_breadcrumbs + o_paragraphs

## Structured Data
- `o_faq` — FAQPage JSON-LD schema
- `o_howto` — HowTo JSON-LD schema
- `o_breadcrumbs` — BreadcrumbList JSON-LD schema
