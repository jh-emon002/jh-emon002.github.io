# Md. Jaied Hasan - Portfolio Website

A static GitHub Pages portfolio updated from the supplied `settings.js`, GitHub profile README, and earlier CVs. The existing dark circuit theme, portrait, CV download buttons, and per-item photo galleries are retained. No build step or server-side framework is needed.

## What's new

- **Projects:** 17 entries, including seven added from the GitHub README: Frequency Converter with Real-Time Display and Tuning, Tic-Tac-Toe Using Basic Gates, Frequency Division Multiplexing, Sensitivity Analysis of IEEE 30 & 33 Bus Systems, Linear Induction Motor, Transient Analysis App, and AutoCAD Electrical Service Design for a 14-story building. Existing Wi-Fi 8, federated PCA, ML, rescue drone, smart helmet, robotics, and other projects remain.
- **Skills:** New dedicated page featuring the GitHub README's programming, simulation, embedded, AI/ML, PCB, and app-development tools, plus wireless research methods supported by the CV.
- **Beyond engineering:** Fighter-jet and aviation interest on the homepage, as described in the GitHub README.
- **Contact:** Both email addresses and clickable LinkedIn, GitHub, Facebook, and Kaggle profiles.
- **Homepage:** The "Fresh EEE Graduate" tagline and "Always learning. Always improving." closing line.
- **Publications:** Your three uploaded publication entries and their exact submitted/accepted/under-review statuses remain unchanged. Existing publication image paths are preserved.
- **Education:** Undergraduate and HSC qualifications only; no graduate-degree entry.

## Files

```text
index.html             Main HTML and edit dialogs
style.css              Responsive dark-theme styling
app.js                 Navigation, galleries, customization, search, rendering
settings.js            Public content, publication/project entries, image paths
favicon.svg
assets/
  portrait.jpg         Existing portfolio portrait
  cv.pdf               Research CV
  master-cv.pdf        Master CV
  IMAGE_GUIDE.md       Complete photo-path list for all 20 items
  publications/        Put your own publication images here
  projects/            Put your own project photos here
```

## Multi-image galleries

Every item has an `images` array inside `settings.js`. It may contain 1, 3, 20, or more paths. Galleries display loaded photos in a horizontal, scrollable strip; clicking any thumbnail opens an enlarged photo with previous/next navigation. Missing images are hidden gracefully. The layout is mobile-responsive.

**Images are referenced, not embedded.** No project/publication photos were uploaded along with these source files. The website will show a gallery for an item once files exist in its configured `assets/` paths. Preserve existing photo files when replacing website source code; avoid deleting the `assets/` directories in your GitHub clone.

See [`assets/IMAGE_GUIDE.md`](assets/IMAGE_GUIDE.md) for every image filename, including the custom paths in your most recent `settings.js`.

### Adding more images

In `settings.js`, find a publication or project entry and add more strings to its `images` list:

```js
"images": [
  "assets/projects/wifi8-beamforming.jpg",
  "assets/projects/wifi8-beamforming-2.jpg",
  "assets/projects/wifi8-beamforming-3.jpg",
  "assets/projects/wifi8-beamforming-4.png"
]
```

You can also manage images and items in the built-in editor at `?edit=1`: click **Customize**, locate the relevant project/publication, enter image paths on separate lines, **Save preview**, then **Download settings.js**. Upload/commit that settings file and all referenced photos to publish for everyone.

### Edit other website information

The Customize dialog also supports: profile tagline, aviation interests, social URLs, BUET email, and text for the Skills and other pages. To update a skill group, write a group heading on its first line and separate technologies with `|` on the next line, placing a blank line between groups. These edits are stored in the downloaded `settings.js`.

If you have previously used `?edit=1`, your browser may have older private preview data saved under `academic-portfolio-v1`, which can override the newly published settings only while in edit mode. Open the normal URL without `?edit=1` for the published version; export or clear the older preview data if needed.

## Local preview

Double-click `index.html`, or serve from the root folder for a closer GitHub Pages preview:

```bash
python -m http.server 8000
```

Open `http://localhost:8000/` in the browser. Use `http://localhost:8000/?edit=1` to customize.

## Publish to GitHub Pages

Copy the files from this package into your cloned repository. **Keep any existing photos in `assets/projects/` and `assets/publications/`**, since the ZIP does not contain them.

```bash
git status
git add index.html style.css app.js settings.js favicon.svg README.md assets/
git commit -m "Update portfolio from GitHub README and expand projects"
git push origin main
```

If your repository uses another branch, use that branch instead. For GitHub Pages, keep `index.html` at the repository root and configure deployment from `main` / root folder (unless your existing setup is different).

## Accuracy notes

Publication statuses and titles have been retained **verbatim from your latest uploaded `settings.js`**; the website does not claim a submission has been published. Project descriptions were expanded from your shared GitHub README without inventing new hardware, results, or publications. The new projects have placeholder image **paths only**; they do not have invented images.
