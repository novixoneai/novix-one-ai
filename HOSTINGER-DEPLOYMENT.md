# Hostinger deployment

## Package

Upload and extract `novix-one-hostinger-upload.zip` specifically inside `/public_html/`. The extracted `index.html` must be directly inside `/public_html/`—not inside a nested folder.

This is a static production build. It does not need Bun, Node.js, Hono, or a database on Hostinger.

## Before replacing the current site

1. Download a backup of the existing `public_html/` files from Hostinger File Manager.
2. If the current site uses email or other services, do not change the domain's DNS records unless necessary. Replacing website files is separate from changing DNS.
3. In hPanel, open **Websites → Manage → Files → File Manager**.
4. Open `/public_html/`, the document root for `novixone.co`.
5. Upload `novix-one-hostinger-upload.zip`.
6. Extract it inside `/public_html/`.
7. Confirm that `index.html`, `assets/`, `images/`, `novix-hero.mp4`, and `favicon.svg` are directly inside `/public_html/`.
8. Remove or rename the old website files only after the new files are extracted. Keep the backup.
9. Clear Hostinger/browser cache and open the domain in a private browser window.

## Important limitation

The contact form currently displays a confirmation message in the browser, but it does not send submissions to email or save them to a database. The live site can be connected to a form backend later.

## Updating later

After changing the site, run `bun run build`, replace the contents of the Hostinger package with the new `dist/` contents, create a new ZIP with the same structure, and upload/extract it inside `/public_html/`.
