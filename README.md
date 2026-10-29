# Md. Jaied Hasan - Single-Page Portfolio

A minimal, responsive dark-themed academic and engineering portfolio. It is a single scrollable page, not a multi-page website, and is ready for GitHub Pages. The content is drawn from the supplied and previously updated `settings.js` and preserves the existing publication/project photo references.

## Layout and navigation

The top navigation stays visible while scrolling and links to exactly seven sections in this order:

1. Home
2. Education
3. Research & Publications
4. Projects
5. Experience
6. Skills & Achievements
7. Contact

On desktop, Home displays the introduction and About Me on the left, with a smaller portrait on the right. On smaller screens, the portrait appears beside the intro, followed by the longer About Me text. On mobile, swipe the top navigation horizontally to reach links that are outside the screen.

The Projects section includes a category filter. The search icon in the top bar can find sections, publications, projects and technical skills.

## Folder contents

```text
index.html                 Site HTML, search, image viewer, and edit dialogs
style.css                  Responsive dark slate theme, sticky nav, section styles
app.js                     Single-page sections, search, gallery, editor
settings.js                All public profile and portfolio content
favicon.svg                New wireless signal and PCB trace favicon
.nojekyll                  GitHub Pages helper
assets/
  portrait.jpg             Current portrait
  cv.pdf                   Academic CV
  master-cv.pdf            Complete CV
  IMAGE_GUIDE.md           Exact image paths for all publications/projects
  publications/            Your actual publication photos go here
  projects/                Your actual project photos go here
```

## Add as many publication or project images as you want

Each publication or project has an `images` list in `settings.js` with local asset filenames. For example:

```js
"images": [
  "assets/projects/wifi8-beamforming.jpg",
  "assets/projects/wifi8-beamforming-2.jpg",
  "assets/projects/wifi8-beamforming-3.jpg",
  "assets/projects/wifi8-beamforming-4.png"
]
```

Place each actual file at the specified path. Galleries will display every image that loads and hide missing image paths automatically. Click any thumbnail for a larger image, then use the arrows or your keyboard's left/right arrow keys. There is no preset gallery image limit.

**Important:** This ZIP does not contain project or publication image files, since they were not provided. If your repository already has files inside `assets/publications/` or `assets/projects/`, keep those folders and their images when updating the website. The ZIP includes the folders as placeholders. See `assets/IMAGE_GUIDE.md` for all currently configured paths.

## Edit profile, project descriptions, or image paths later

Open the website URL with `?edit=1`, for example:

```text
https://YOUR_USERNAME.github.io/?edit=1
```

Choose **Customize** at the bottom right. You can edit the bio, tagline, CV paths, social profiles, education/research/experience/skills/achievements text, and any publication/project item and its image paths. Enter one image filename per line. Use **Save preview** for a private browser-only preview. Then use **Download settings.js** to obtain the public settings file, and commit the replacement to your GitHub repository.

The visible combined sections still have separate editable content fields: Research and Publications are under one navigation section; Skills and Achievements are under one navigation section.

Private browser previews made with an older `?edit=1` version may override published settings when you are in edit mode. To inspect the public site, open it without `?edit=1`.

## Deploy to GitHub Pages

Copy `index.html`, `app.js`, `style.css`, `settings.js`, `favicon.svg`, `README.md`, `.nojekyll` and `assets/` from this package into the root of your existing site repository. Preserve existing pictures in `assets/projects/` and `assets/publications/`.

```bash
git add .
git commit -m "Switch portfolio to minimal single-page layout"
git push origin main
```

For a repository using a different deployment branch, push to that branch instead. GitHub Pages should deploy the repository root (or whichever folder is currently configured). No build step, Node installation, or API key is necessary.

## Notes on sources and statuses

The website includes 3 publication entries and 17 projects. Their descriptions, statuses and image paths come from the previous updated `settings.js`, based on the user's CV and GitHub README. Accepted or submitted items have not been relabeled as published work. Education displays only the undergraduate BUET degree (plus selected coursework). Higher-secondary and graduate education have been removed.

The favicon is a custom wireless-signal and PCB-trace motif, matching the new header symbol.

## Dark theme and achievements

The site uses low-glare slate backgrounds and teal accents. All scholarships and competition honors appear within **one achievements card**. The separate headings inside it remain editable via the `Achievements` text field.

## Image gallery performance recommendations

You may add as many image paths as needed to each `images` array. For efficient loading on GitHub Pages, prefer compressed WebP/JPEG images (roughly 100-300 KB for thumbnails, if practical). Store the files in `assets/projects/` or `assets/publications/`, and commit them alongside `settings.js`. The thumbnail strip scrolls horizontally; tapping a thumbnail opens its full-size viewer with keyboard/arrow navigation. Missing files stay hidden.


## Browser-tab favicon

The icon shown beside the page title in a browser tab is the **J monogram** in `favicon-jaied.svg`. The site also includes PNG and ICO fallbacks, and an Apple touch icon. These are referenced in `index.html`; the separate header logo is unchanged.

After pushing the update to GitHub Pages, refresh the page. If the old tab icon remains, try a hard refresh or an incognito window: browsers cache favicons aggressively. All favicon assets must be uploaded alongside `index.html`.
