# Md Jaied Hasan - Academic Portfolio

A minimal, dark, single-page portfolio. Host the contents of this folder in your GitHub Pages repository.

## Website files

- `index.html`: page skeleton, navigation, the favicon reference.
- `settings.js`: **edit all published content here** (bio, education, research, 3 publications, 17 projects, skills, achievements, contact, and Beyond the Lab).
- `style.css`: layout and colors.
- `app.js`: section rendering, search, filters, and multi-photo lightbox. Usually does not need editing.
- `favicon.svg`: the **same J monogram** appears on the browser tab and in the header.
- `assets/portrait.jpg`, `assets/cv.pdf`, `assets/master-cv.pdf`: existing portrait and CVs.
- `assets/projects/`, `assets/publications/`: add your actual photos in these folders.

## Add many photos to any project or publication

1. Copy your photos to `assets/projects/` or `assets/publications/`.
2. Open `settings.js` in VS Code (or another text editor).
3. Find the item by `title` within `projectItems` or `publicationItems`, and add filenames to its `images` array.

```javascript
"images": [
  "assets/projects/rescue-drone.jpg",
  "assets/projects/rescue-drone-2.jpg",
  "assets/projects/rescue-drone-3.jpg",
  "assets/projects/rescue-drone-4.png"
]
```

There is **no image-count limit**. Missing files are hidden automatically. Available photos appear as a horizontally scrolling strip; click one to view it larger and use the arrows to navigate. To remove an image, remove its line from the array. Empty image arrays are also supported.

For new items, copy an existing item object in the appropriate array and update its `title`, `category`, `status`, `meta`, `description`, `link`, and `images`.

## Publish

Update the source files and images in your GitHub Pages repository. From the repository directory run:

```sh
git add .
git commit -m "Update portfolio"
git push origin main
```

No build step, dependencies, web-based editor, or API keys are required. If your browser shows an old tab icon after deployment, hard refresh or open in a private window; `index.html` uses a versioned SVG favicon reference.
