# finsnovai.com

A plain static site for GitHub Pages. No build step is needed to publish it.

- `index.html` is the home page (hero, writing, about, studio).
- `writing/index.html` lists every essay.
- `writing/<slug>/index.html` is one essay, with its images in `writing/<slug>/images/`.
- `assets/site.css` and `assets/site.js` hold all styles and behaviour. Dark mode is the default, and the toggle remembers the reader's choice.
- `assets/ornaments/` holds the zari borders (temple, mango and lotus) as SVG files with transparent backgrounds.

To add your photo, save it as `assets/vishnu.jpg` and replace the placeholder in the About section of `index.html` (the comment there shows the line to use).
