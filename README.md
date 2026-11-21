# stasi.page

My portfolio site. Plain HTML, CSS, and JavaScript with no build step, hosted on GitHub Pages at [www.stasi.page](https://www.stasi.page).

```
index.html              Home: intro, selected work, experience, contact
work/zookeeper/         Case study pages (each folder has an index.html)
work/white-pine/
work/roos-roast/
about/                  About page
play/                   Drawing and graphic design galleries
404.html                Shown for any page that doesn't exist
home/ projects/ about-me/ more/   Redirects from older URLs
assets/css/styles.css   All styles. Colors and fonts are the tokens at the top.
assets/js/main.js       Copy email button, footer year, theme toggle, scroll reveals,
                        draggable puzzle, video autoplay, Play background, lightbox
assets/js/theme.js      Applies a saved light or dark choice before the page paints
assets/images/          Images and screen recordings, one folder per page
assets/fonts/           Montserrat (body) and Fraunces (headlines), self-hosted
CNAME                   The custom domain for GitHub Pages. Keep it.
```

## Preview locally

Run a local server from the project folder, then open http://localhost:4173:

```
python3 -m http.server 4173
```

(Or use the Live Server extension in VS Code.) Use a server rather than opening the HTML files directly, because links between pages only work through one.

## Publishing

The site deploys from the `main` branch. Anything pushed to `main` is live on stasi.page within a minute or two.

## Editing notes

- **Text:** find it in the page's HTML file and change it.
- **The header and footer are copied on every page.** If you add a nav link, add it to every page. A project-wide search and replace makes this quick.
- **Colors:** change the values at the top of `assets/css/styles.css`. Light mode is the first block; dark mode follows.
- **Project colors:** each project has a color token near the top of `styles.css` (`--zoo`, `--pine`, `--roos`, with lighter versions in the dark mode blocks). A card or page picks it up through `data-project="name"`.
- **New case study:** copy a folder in `work/`, rename it, edit the text, then add a card in `index.html` and a URL in `sitemap.xml`.
- **Headlines** (`h1`, `h2`, card titles, big numbers) use Fraunces. Wrap a word in `<em>` inside an `h1` or `h2` for the colored italic.
- **Images:** always set `width` and `height` to the file's real size (they set the shape, not the display size), and write `alt` text that says what the image shows.
- **Screen recordings:** use small looping MP4s with a `poster` image and `data-autoplay`, not GIFs. They play when scrolled into view and pause when scrolled away.
- **Lightbox:** images inside a `<figure>` open large when clicked. Images that share a gallery, grid, or before/after panel get arrows to move between them.
- **The theme toggle** in the header is added by `main.js`, so it isn't in the HTML.

## Accessibility

- Every image needs `alt` text that says what it shows.
- Keep one `<h1>` per page and don't skip heading levels.
- Check new colors for contrast at [webaim.org/resources/contrastchecker](https://webaim.org/resources/contrastchecker/). Body text needs 4.5:1.
- Tab through each page with the keyboard; focus should always be visible.
- Motion respects the reduced-motion setting: videos don't autoplay and the background doesn't move.
