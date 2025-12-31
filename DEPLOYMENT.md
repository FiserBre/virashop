# Deploying VIRA to InfinityFree (static hosting)

This project is a Vite + React app. The build output is static files that you can upload to InfinityFree's `htdocs` directory.

Steps

1. Prepare static assets

   - Vite serves files placed in `public/` at the root of the built site. If you currently keep images in an `images/` folder at project root, move or copy that folder to `public/images/` so they are included and referenced by `/images/...` in runtime.
   - Alternative: import images through JS/TSX so Vite bundles them, but moving to `public/` is simplest.

2. Build the app

   ```bash
   npm install
   npm run build
   ```

   - The production files will be in the `dist/` folder.

3. Upload to InfinityFree

   - Using FTP (FileZilla, WinSCP, or any FTP client), connect with credentials from your InfinityFree control panel.
   - Upload the _contents_ of the `dist/` folder into the `htdocs` folder on InfinityFree. Do not nest them inside another folder.
   - Upload the `.htaccess` file (provided in the project root) to `htdocs` as well. It ensures client-side routing works and rewrites non-file requests to `index.html`.

4. Verify
   - Visit your InfinityFree domain. Your single-page React app should load and client-side routes should work.

Notes & Troubleshooting

- Files exist in `htdocs/images/...` (or the proper path used by your code).
- Your code references public files with leading `/images/...` (works when files are in `htdocs/images`).

Optional: Automate copy of images

If you prefer not to move images manually into `public/`, you can add a simple `postbuild` script to copy `images/` into `dist/`.

On Windows PowerShell you could run after build:

```powershell
# from project root (PowerShell)
Remove-Item -Recurse -Force dist\images -ErrorAction SilentlyContinue; Copy-Item -Recurse images dist\images
```

But placing assets in `public/` is the recommended Vite approach.

If you want, I can:

Tell me which (if any) of the optional actions you'd like me to perform next.

### Build directly into `htdocs`

You can now run a single command that builds the site and prepares the `htdocs` folder for upload:

```powershell
npm run build:htdocs
```

This script will:

- Run `npm run build` (Vite production build)
- Create or clear `./htdocs`
- Copy the `dist` production files into `htdocs`
- Copy the `images/` folder (if present) into `htdocs/images`
- Copy the `.htaccess` file into `htdocs` so client-side routing works on InfinityFree

After running `npm run build:htdocs`, upload the contents of `htdocs/` (or upload the entire `htdocs` folder contents via FTP) to InfinityFree's `htdocs` on your account.

If you'd like, I can also move `images/` into `public/` and remove the extra copy step — tell me which you prefer.
