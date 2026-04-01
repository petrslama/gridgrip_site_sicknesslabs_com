#!/bin/bash
SITE_DIR="$(cd "$(dirname "$0")" && pwd)"
PUBLIC_DIR="$SITE_DIR/public"

rm -rf "$PUBLIC_DIR"
mkdir -p "$PUBLIC_DIR"

# HTML: html/* -> public/*, home.html -> index.html
cp -r "$SITE_DIR/html/"* "$PUBLIC_DIR/"
mv "$PUBLIC_DIR/home.html" "$PUBLIC_DIR/index.html"

# CSS
cp "$SITE_DIR/style.min.css" "$PUBLIC_DIR/"

# Assets (icons/, imgs/, logo.svg)
cp -r "$SITE_DIR/assets" "$PUBLIC_DIR/"

# Root files
for f in robots.txt sitemap.xml sitemap-images.xml site.webmanifest ads.txt humans.txt llms.txt llms-full.txt; do
	[ -f "$SITE_DIR/$f" ] && cp "$SITE_DIR/$f" "$PUBLIC_DIR/"
done

# _redirects
cp "$SITE_DIR/_redirects" "$PUBLIC_DIR/"

# Deploy
cd "$SITE_DIR" && wrangler deploy
