# Md. Jaied Hasan — Academic Portfolio

A GitHub Pages-ready academic portfolio populated from the supplied research CV and master CV (October 2026), while preserving the original dark/circuit visual theme. Built with HTML, CSS, and JavaScript; no build step or server is necessary.

## What was updated

- Homepage: updated research profile, BUET affiliation, Wi-Fi 8 work, FlyRank AI internship, thesis, portrait, and links to both uploaded CVs.
- Research: current BUET research assistantship under Prof. Dr. Md. Forkan Uddin and the undergraduate thesis under Prof. Dr. Hafiz Imtiaz.
- Publications: separate cards for a manuscript under review, an accepted 2026 conference paper, and a submitted 2026 conference work. Status is **not** presented as published unless supported.
- Projects: 10 substantive research and engineering projects from the CVs.
- Experience: research assistantship, FlyRank AI, Banglalink attachment, and Bangladesh Mathematical Olympiad.
- Achievements: scholarships and Brain of Varendra competition.
- Education: undergraduate BUET degree and higher secondary college, **no graduate education**.
- Contact: email, LinkedIn, and GitHub.
- Images: per-publication and per-project galleries, supporting multiple local files, click-to-enlarge, keyboard left/right, mobile layouts, and graceful handling of missing files.

## Files

```
index.html
app.js
style.css
settings.js              <- website content, project/publication images
favicon.svg
assets/
  portrait.jpg           <- original portrait, extracted from existing settings.js
  cv.pdf                 <- the provided research CV
  master-cv.pdf          <- the provided extended master CV
  publications/          <- place publication images here
  projects/              <- place project images here
```

## Add photos for each publication or project

The image filenames are already configured in `settings.js`. **Copy your own photos to the matching paths** to display them automatically, without editing any code. A few examples:

- `assets/publications/federated-sparse-pca.jpg`
- `assets/publications/motorcycle-safety.jpg`
- `assets/publications/mobile-traffic-forecasting.jpg`
- `assets/projects/wifi8-beamforming.jpg`
- `assets/projects/rescue-drone.jpg`
- `assets/projects/smart-helmet.jpg`
- `assets/projects/toxicity-classification.jpg`

See `assets/IMAGE_GUIDE.md` for the complete list. The photos **were not included** in the uploaded files, so project/publication cards remain text-only until you provide photos. Missing image paths do not display broken-image icons.

To show multiple photos for a single project or paper, open `settings.js` and add more image paths to that item's `images` array:

```js
"images": [
  "assets/projects/wifi8-beamforming.jpg",
  "assets/projects/wifi8-beamforming-2.png",
  "assets/projects/wifi8-beamforming-3.webp"
]
```

You can also edit image paths through the built-in Customization panel:

1. Open `index.html?edit=1` in a browser (or add `?edit=1` to your live site URL).
2. Click **Customize** and scroll to **Publication entries & photos** or **Project entries & photos**.
3. Edit titles, statuses, categories, descriptions, and links; add image paths **one per line**. Add/remove entries as needed.
4. Click **Save preview** for a private browser preview.
5. Click **Download settings.js**, replace the file in the GitHub repository, and **upload all referenced photos to `assets/`**.
6. Commit. GitHub Pages will deploy the changes.

The Customize tool is local/browser-only; saving a preview does not publish edits. Other visitors will not see Customize unless they explicitly use `?edit=1`.

**Photo recommendations:** export JPG, PNG, or WebP; aim for at least 1200 pixels on the long edge, compress the images to keep the site fast, and do not upload photos you do not have permission to publish. The gallery will crop thumbnail previews; clicking opens the full image. Images have text-based alt labels generated from the project/publication title.

## Preview locally

The simple approach is to open `index.html` in a modern browser. If you prefer a local server, in the project folder run:

```bash
python -m http.server 8000
```

Then visit `http://localhost:8000/` (or `http://localhost:8000/?edit=1` to edit).

## Publish with GitHub Pages

Commit `index.html`, `style.css`, `app.js`, `settings.js`, `favicon.svg`, and **the entire `assets` directory** to your repository root. Keep the case and spelling of asset filenames unchanged. Under **Settings → Pages**, choose **Deploy from a branch**, `main`, `/ (root)` if not already configured. The live site updates after deployment.

For an existing local clone, copy the files into it, then run:

```bash
git add index.html style.css app.js settings.js favicon.svg README.md assets/
git commit -m "Update portfolio from CV and add image galleries"
git push origin main
```

If your repository uses a different branch, substitute that branch name. Check `git status` before committing to avoid overwriting unrelated changes.

## Notes on CV accuracy

The source CVs report one manuscript under review, one conference paper accepted in 2026, and one conference submission in 2026. The website reflects those stages rather than implying all have been published. Bibliographic details (author lists, venues, DOIs) and finished publication URLs were **not provided**, so they have not been invented; add them when available. The working title of the traffic-forecasting conference work is descriptive rather than verified as its final submission title.
