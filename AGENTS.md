# Project rules

- Keep all visible French and English copy of the public site in `src/lib/i18n.tsx` so the language switch remains complete and consistent; the French-only admin under `/admin` may keep its copy inline.
- Give events their own `/evenements` content route and use TanStack Links for internal destinations so navigation and shareable metadata remain consistent.
- Admin edits override coded defaults at runtime: texts by i18n key (`site_content`), photo slots (`site_images`), rooms/restaurants tables and per-page SEO (`page_seo`), all loaded once via `siteDataQuery`; keep coded values as fallbacks so the site works with an empty database.
- Admin photos go to the private `media` bucket with long-lived signed links because the workspace blocks public buckets.
