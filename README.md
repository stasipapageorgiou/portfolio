# stasi.page

My portfolio site. Plain HTML, CSS, and JavaScript with no build step, hosted free on GitHub Pages.

```
index.html              Home: intro, selected work, experience, contact
work/zookeeper/         Case study pages (each folder has an index.html)
work/white-pine/
work/roos-roast/
about/                  About page
play/                   Drawing and graphic design gallery
404.html                Shown for any page that doesn't exist
home/ projects/ about-me/ more/   Redirects from old Google Sites URLs
assets/css/styles.css   All styles. Colors and fonts are the tokens at the top.
assets/js/main.js       Copy email button, footer year, theme toggle, scroll reveals, draggable puzzle
assets/js/theme.js      Applies a saved light or dark choice before the page paints
assets/images/          All images (placeholders for now)
assets/fonts/           Montserrat (body) and Fraunces (headlines), self-hosted
```

---

## Part 1. Before you launch

### Replace the placeholder images
Every image is a lavender placeholder that shows its own filename and size. To swap one:

1. Export the real image from Figma (select the frame, Export, PNG, 2x).
2. Rename it to match the placeholder exactly, for example `employee-week.png`.
3. Drag it into the same folder in `assets/images/` and replace the old file.
4. Compress it at [squoosh.app](https://squoosh.app) so pages load fast. Aim for under 400 KB each.
5. If your image has a different shape than the placeholder, update the `width` and `height` in the `<img>` tag to match (they only set the shape, not the display size).
6. Read the `alt` text in the HTML and make sure it describes what your real image shows.

You can also save images from the old Google Site (right click, Save image as) while it's still up.

Needed before launch: the three `cover.png` and three `hero.png` files, `about/portrait.png`, and the case study figures. The Play gallery can launch with fewer images; delete any `<li>` you don't need.

### Check these content details
I made these calls while rewriting. Confirm or fix each one:

- [ ] **Sage Intacct.** The old site said "Sage Innact." I changed it to Sage Intacct, the product's real name.
- [ ] **Treetown Tech.** The old site mixed "TreeTown" and "Treetown." I used Treetown everywhere.
- [ ] **Degree years** on the About page: BS and BA in 2025, Master of Management in 2026.
- [ ] **Zookeeper status.** It says development is underway. Update if it has shipped.
- [ ] **"How I worked"** on Zookeeper comes from the skill tags on your old project list (scoping, testing, spec writing). Make sure it matches what you did.
- [ ] **"How I got here"** on the About page tells your CS to UX to business story. Rewrite any line that doesn't sound like you.
- [ ] **Experience descriptions** on the home page, especially Martha Cook. Add dates if you want them.
- [ ] **Project prototypes.** The Zookeeper prototype links weren't public on the old site, so there are none. Add a button if you can share one.
- [ ] **Optional reflection** for Zookeeper: there is a commented-out "What I learned" section near the bottom of `work/zookeeper/index.html`. Hiring managers like seeing one.

---

## Part 2. Set up your computer (one time)

1. **VS Code.** Download from [code.visualstudio.com](https://code.visualstudio.com) and install.
2. **Git.** On Mac, open Terminal and run `git --version`. If it isn't installed, macOS offers to install it. On Windows, install from [git-scm.com](https://git-scm.com).
3. **GitHub account.** Sign up at [github.com](https://github.com). Pick your username carefully, because your preview address will be `USERNAME.github.io`.
4. **Live Server extension.** In VS Code, open Extensions (the four squares icon), search **Live Server** by Ritwick Dey, and install it.
5. **Tell Git who you are.** In VS Code, open Terminal, New Terminal, and run:
   ```
   git config --global user.name "Stasi Papageorgiou"
   git config --global user.email "you@example.com"
   ```
   Use the same email as your GitHub account.

## Part 3. Open and preview the site

1. Unzip `stasi-portfolio.zip` somewhere you'll keep it, like `Documents/stasi-portfolio`.
2. In VS Code: File, Open Folder, choose `stasi-portfolio`.
3. Open `index.html`, then click **Go Live** in the bottom right corner. The site opens in your browser and refreshes every time you save.
4. To test mobile, open your browser's developer tools (Cmd + Option + I on Mac) and click the phone icon.

Use Live Server rather than double clicking the HTML file. Links between pages only work through a server.

### Editing tips
- **Text:** find it in the HTML file and change it. Save, and Live Server updates.
- **The header and footer are copied on every page.** If you add a nav link, add it to all seven pages. VS Code's search (Cmd + Shift + F) with Replace All makes this quick.
- **Colors:** change the values at the top of `assets/css/styles.css`. Light mode is the first block; dark mode follows.
- **New case study:** copy the `work/roos-roast` folder, rename it, edit the text, then add a card for it in `index.html` and a URL to `sitemap.xml`.
- **Project colors:** each project has one color token near the top of `styles.css` (`--zoo`, `--pine`, `--roos`, with lighter versions in the two dark mode blocks). A card or page picks it up through `data-project="name"`. For a new project, add a token in all three places, add one `[data-project="name"]` line in the "Per-project color" section, and put `data-project` on the card's `<article>`, the case study's `<main>`, and any "Next case study" link that points to it. Check the color against the page background for 4.5:1 contrast.
- **Headlines** (`h1`, `h2`, card titles, big numbers, pull quotes) use Fraunces. Wrap a word in `<em>` inside an `h1` or `h2` to get the colored italic.
- **The theme toggle** in the header is added by `main.js`, so it isn't in the HTML.

## Part 4. Put the code on GitHub

1. In VS Code, click the **Source Control** icon on the left (the branching lines).
2. Click **Publish to GitHub** and sign in when asked.
3. When asked for a name, use **`USERNAME.github.io`** (your exact GitHub username). Choose **public repository**, since free GitHub Pages needs a public repo.
4. If VS Code asks which files to include, include everything.

Your code is now on GitHub.

## Part 5. Turn on GitHub Pages

1. On github.com, open the repo and go to **Settings**, then **Pages**.
2. Under **Build and deployment**, set Source to **Deploy from a branch**, branch **main**, folder **/ (root)**. Save.
3. Wait a minute or two, then visit `https://USERNAME.github.io`. This is your live preview.
4. Click through every page on your laptop and your phone before moving the domain.

## Part 6. Move stasi.page from Google Sites to GitHub

Your domain is registered at GoDaddy and currently points to Google Sites. You'll change GoDaddy's DNS records so it points to GitHub instead. Your Google Site stays exactly as it is until you're done, so nothing is lost.

**Heads up:** `.page` domains only work over HTTPS. Between the DNS change and GitHub issuing your security certificate, the site may show an error for a little while (often minutes, sometimes a few hours). Do this at a quiet time, not the morning you send applications.

### Step 1. Verify the domain with GitHub (prevents anyone else from claiming it)
1. On GitHub, click your profile photo, **Settings**, then **Pages** in the left sidebar (this is your account settings, not the repo).
2. Click **Add a domain**, enter `stasi.page`, and GitHub shows a TXT record. Keep this tab open.
3. In GoDaddy, go to **Domain Portfolio**, click **stasi.page**, then **DNS**.
4. Click **Add New Record**: Type **TXT**, Name = the part GitHub shows before `.stasi.page` (it starts with `_github-pages-challenge-`), Value = the code GitHub shows. Save.
5. Back on GitHub, click **Verify**. If it fails, wait 15 minutes and try again.

### Step 2. Tell your repo to use the domain
1. In the repo, go to **Settings**, **Pages**, **Custom domain**.
2. Enter `www.stasi.page` and click **Save**. GitHub adds a file named `CNAME` to your repo. Keep it.
3. GitHub will say the DNS check is failing. That's expected until Step 3.

### Step 3. Change the DNS records in GoDaddy
Still on the stasi.page **DNS** page in GoDaddy:

1. **Turn off forwarding.** Check the **Forwarding** tab. If stasi.page forwards to www.stasi.page, delete that forwarding rule.
2. **Delete the old `@` A records** (often one record pointing to a GoDaddy "Parked" address). Don't delete TXT or MX records; those handle verification and email.
3. **Add four A records**, each with Name `@`:

   | Type | Name | Value |
   |---|---|---|
   | A | @ | 185.199.108.153 |
   | A | @ | 185.199.109.153 |
   | A | @ | 185.199.110.153 |
   | A | @ | 185.199.111.153 |

4. **Edit the `www` CNAME record.** It currently points to `ghs.googlehosted.com` (Google Sites). Change its value to `USERNAME.github.io` and save.

### Step 4. Wait, then turn on HTTPS
1. DNS changes usually take effect within an hour, but can take up to 24 hours.
2. Return to repo **Settings**, **Pages**. When it says your DNS check succeeded, check **Enforce HTTPS**. (If the box is grayed out, the certificate is still being issued. Check back later.)
3. Visit `https://www.stasi.page` and `https://stasi.page`. Both should show the new site, and the second should redirect to the first.
4. Test an old link like `https://www.stasi.page/projects/peabody`. It should redirect to the new White Pine page.

### Step 5. Clean up Google Sites
Once the new site is live, open your Google Site, go to **Settings**, **Custom domains**, and click the trash icon next to `www.stasi.page`. You can unpublish the Google Site after you've saved every image you need from it.

## Part 7. Updating the site later

1. Edit in VS Code and preview with Live Server.
2. Open **Source Control**, type a short message (like "Add Zookeeper images"), and click **Commit**.
3. Click **Sync Changes**. The live site updates in about a minute.

## Part 8. Accessibility checks to keep doing

The site passes automated WCAG 2.1 AA checks (axe) in light and dark mode on desktop and mobile. Keep it that way:

- Every new image needs `alt` text that says what it shows. A screenshot's alt should name the screen and its key point, not "image of dashboard."
- Keep one `<h1>` per page and don't skip heading levels.
- Check new colors for contrast at [webaim.org/resources/contrastchecker](https://webaim.org/resources/contrastchecker/). Body text needs 4.5:1.
- Tab through each page with the keyboard. You should always see where you are.
- Run Lighthouse in Chrome's developer tools (Lighthouse tab, Analyze page load) after big changes.

## Troubleshooting

- **Styles missing on GitHub but fine locally:** file names are case sensitive on GitHub. `Cover.png` and `cover.png` are different files.
- **Site shows the old Google Site:** DNS is still updating, or the `www` CNAME still points to `ghs.googlehosted.com`.
- **"Domain does not resolve" on GitHub:** recheck the four A records and the www CNAME for typos. The CNAME value has no `https://`.
- **Privacy error on stasi.page:** the HTTPS certificate is still being issued. Wait and refresh.
