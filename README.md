# Academic Portfolio — GitHub Pages Edition

A static portfolio modeled on the supplied reference. Includes a circuit-themed home page, circular portrait, research, publications, projects, experience, achievements, education, contact, search, and mobile navigation. All content is placeholder content until you replace it.

## 1. Personalize before publishing

1. Extract this ZIP on your computer.
2. Open `index.html` in a current browser. Add `?edit=1` before any `#home` fragment in the address (for example `file:///.../index.html?edit=1`).
3. Click **Customize**. Enter your name, biography, email, page content, photo, and CV link. Blank lines separate sections; the first line is each section heading.
4. Click **Save preview** to check your changes. This saves only in your browser.
5. Click **Download settings.js**. Move the downloaded file into the extracted folder, replacing its original `settings.js`.
6. Reopen `index.html` without `?edit=1` to check what visitors will see.

Alternatively, edit `settings.js` directly in a text editor. Keep its JavaScript punctuation intact. The photo and CV can use full HTTPS links or relative file paths such as `assets/portrait.jpg` and `assets/cv.pdf`. If using local files, create `assets` next to `index.html`, put the files there, and upload that folder too. Uploaded photos in Customize are embedded in settings.js.

Customize is a local preview tool, not an authenticated admin system. The published content comes from the committed settings.js; editing a browser preview does not update GitHub. Public visitors do not see the Customize button. Add `?edit=1` to open it yourself. Use **Download backup** and **Import settings** for JSON backups.

## 2. Create your GitHub repository

1. Sign in at https://github.com.
2. Click **+ → New repository**.
3. For your main personal website, name the repository exactly `YOUR_USERNAME.github.io`, replacing YOUR_USERNAME with your actual GitHub username. If that repository already exists, use it only if you intend to update its website; otherwise choose another name such as `academic-portfolio`.
4. Choose **Public** for the straightforward free GitHub Pages setup.
5. Select **Add a README file**, then **Create repository**.

Your uploaded source and published content will be public in this setup.

## 3. Upload the site

1. In your repository, click **Add file → Upload files**.
2. Drag the extracted site's files into the upload area: `index.html`, `style.css`, `app.js`, `settings.js`, `favicon.svg`, and optionally README.md and `.nojekyll`. Include `assets` if you created it.
3. Upload the FILES, not the ZIP and not the enclosing folder. `index.html` must appear at the repository's top level.
4. Enter a commit message, such as `Add academic portfolio`, and click **Commit changes**. If prompted, commit directly to `main` for this new repository.

The `.nojekyll` file skips Jekyll processing; the website uses no Jekyll-specific files, so it also works if your file picker hides that file.

## 4. Enable GitHub Pages

1. Open **Settings → Pages** in your repository.
2. Under **Build and deployment → Source**, select **Deploy from a branch**.
3. Select branch **main**, folder **/ (root)**, then **Save**.
4. Open the **Actions** tab and wait for the Pages deployment to succeed. It can take a few minutes.
5. Return to **Settings → Pages** and click **Visit site**.

For a repository named `YOUR_USERNAME.github.io`, your URL will be `https://YOUR_USERNAME.github.io/`. For a project repository such as `academic-portfolio`, it will be `https://YOUR_USERNAME.github.io/academic-portfolio/`. These are examples; GitHub Pages will show your actual URL.

## 5. Publish future edits

Open your live URL with `?edit=1`, customize, and download settings.js. In the repository, use **Add file → Upload files** and upload settings.js at the root, replacing the previous file. Commit. Pages republishes after the commit. Open the normal URL without `?edit=1` to check the published version. A hard refresh can help if a browser caches old files.

To change the browser's default tab title and sharing description, edit the `<title>` and description meta tag near the top of index.html. The in-page tab title updates from your profile when JavaScript runs.

## Troubleshooting

- **404:** Ensure Pages is enabled for main / (root), index.html is at the top level, and the Pages workflow succeeded.
- **Old or placeholder profile:** Confirm you replaced and committed settings.js. Saving a preview alone does not publish it.
- **Photo/CV missing:** Check capitalization and upload the file at the exact configured path. The photo is square-cropped. PDF links open in a new tab.
- **JavaScript syntax error after editing settings.js:** Check commas and quotes, or generate a valid replacement through Customize.
- **No Pages option:** Check your repository permissions and plan/organization policies.

No install, build command, API keys, server, or ChatGPT login is required for the GitHub-hosted version. No custom domain is included; you can configure a domain you own later.

Official guide: https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site
