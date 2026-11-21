// Small enhancements only. Every page works without JavaScript.

const root = document.documentElement;
const motionOK = window.matchMedia("(prefers-reduced-motion: no-preference)").matches;

// Copy email button: copies the address and announces the result to screen readers.
document.querySelectorAll("[data-copy]").forEach((button) => {
  const status = document.getElementById(button.dataset.status || "");
  button.hidden = false;

  button.addEventListener("click", async () => {
    const text = button.getAttribute("data-copy");
    try {
      await navigator.clipboard.writeText(text);
      if (status) status.textContent = "Email address copied.";
    } catch (error) {
      if (status) status.textContent = "Copy didn't work. The address is " + text + ".";
    }
  });
});

// Keep the footer year current.
document.querySelectorAll("[data-year]").forEach((el) => {
  el.textContent = new Date().getFullYear();
});

// Light and dark toggle. Added here so the header markup stays the same on every page.
// The saved choice is applied early by theme.js.
const navList = document.querySelector(".site-nav ul");
if (navList) {
  const systemDark = window.matchMedia("(prefers-color-scheme: dark)");
  const isDark = () => (root.dataset.theme ? root.dataset.theme === "dark" : systemDark.matches);

  const item = document.createElement("li");
  const toggle = document.createElement("button");
  toggle.type = "button";
  toggle.className = "theme-toggle";
  toggle.innerHTML =
    '<svg class="icon-moon" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5Z"/></svg>' +
    '<svg class="icon-sun" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>';

  const sync = () => {
    toggle.dataset.mode = isDark() ? "dark" : "light";
    toggle.setAttribute("aria-label", isDark() ? "Switch to light theme" : "Switch to dark theme");
  };

  toggle.addEventListener("click", () => {
    const next = isDark() ? "light" : "dark";
    root.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch (error) {
      // Storage is unavailable. The choice lasts for this page only.
    }
    sync();
  });
  systemDark.addEventListener("change", sync);

  sync();
  item.append(toggle);
  navList.append(item);
}

// Scroll reveals. Only content that starts below the screen is hidden,
// so nothing visible on load ever flickers.
const revealTargets =
  ".section-head, .work-list > li, .roles > li, .contact, .case-section, .gallery li, .next";
if (motionOK && "IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { rootMargin: "0px 0px -8% 0px" }
  );
  document.querySelectorAll(revealTargets).forEach((el) => {
    if (el.getBoundingClientRect().top > window.innerHeight) {
      el.classList.add("reveal");
      observer.observe(el);
    }
  });
}

// Draggable puzzle. Mouse and trackpad only, so touch scrolling is never blocked.
// A piece dropped near its slot snaps back in. Dropped farther away, it stays loose.
if (window.matchMedia("(pointer: fine)").matches) {
  document.querySelectorAll(".puzzle svg").forEach((svg) => {
    svg.closest(".puzzle").classList.add("is-draggable");
    const snapDistance = 45; // in SVG units

    svg.querySelectorAll(".piece").forEach((piece) => {
      const pos = { x: 0, y: 0 };
      let drag = null;

      piece.addEventListener("pointerdown", (event) => {
        if (event.button !== 0) return;
        event.preventDefault();
        svg.append(piece); // bring to front
        piece.setPointerCapture(event.pointerId);
        drag = {
          x: event.clientX,
          y: event.clientY,
          startX: pos.x,
          startY: pos.y,
          scale: svg.viewBox.baseVal.width / svg.getBoundingClientRect().width,
        };
        piece.classList.remove("is-settling");
        piece.classList.add("is-loose", "is-dragging");
      });

      piece.addEventListener("pointermove", (event) => {
        if (!drag) return;
        pos.x = drag.startX + (event.clientX - drag.x) * drag.scale;
        pos.y = drag.startY + (event.clientY - drag.y) * drag.scale;
        piece.style.transform = "translate(" + pos.x + "px, " + pos.y + "px)";
      });

      const drop = () => {
        if (!drag) return;
        drag = null;
        piece.classList.remove("is-dragging");
        if (Math.hypot(pos.x, pos.y) < snapDistance) {
          pos.x = 0;
          pos.y = 0;
          if (motionOK) piece.classList.add("is-settling");
          piece.style.transform = "translate(0px, 0px)";
        }
      };
      piece.addEventListener("pointerup", drop);
      piece.addEventListener("pointercancel", drop);
    });
  });
}

// Case study videos: play while on screen, pause when scrolled away.
// Skipped for reduced motion; the controls still let anyone press play.
const autoplayVideos = document.querySelectorAll("video[data-autoplay]");
if (motionOK && "IntersectionObserver" in window && autoplayVideos.length) {
  const videoObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const video = entry.target;
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      });
    },
    { threshold: 0.25 }
  );
  autoplayVideos.forEach((video) => videoObserver.observe(video));
}

// Play page background: soft glows that drift as you scroll (parallax).
// Purely decorative. The scatter is fixed (same seed every visit), so the page
// always looks the same at a given screen size.
const playBg = document.querySelector(".play-bg");
if (playBg) {
  // Full URLs, since a url() inside a CSS variable resolves against the stylesheet
  const base = new URL("../assets/images/play/background/", location.href).href;
  const glows = [1, 2, 3, 4].map((n) => base + "glow-" + n + ".png");
  const SEED = 20261117; // change this number to get a different fixed scatter

  // speed: how far the glows move per pixel scrolled (0 = with the page, 1 = fixed)
  const layers = [{ images: glows, speed: motionOK ? 0.75 : 0, spacing: 400, size: [720, 1300] }].map((layer) => {
    const el = document.createElement("div");
    el.className = "play-bg__layer";
    playBg.append(el);
    return { ...layer, el };
  });

  const makeRandom = (s) => () => {
    s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };

  let builtFor = "";
  const build = () => {
    const width = playBg.clientWidth;
    const pageHeight = playBg.clientHeight;
    const viewH = window.innerHeight;
    const key = width + "x" + pageHeight + "x" + viewH;
    if (key === builtFor) return;
    builtFor = key;
    const scale = width < 700 ? 0.7 : 1;
    const maxScroll = Math.max(0, pageHeight - viewH);

    layers.forEach((layer) => {
      const random = makeRandom(SEED);
      // A layer that moves with the scroll needs less height to cover the page.
      const height = maxScroll * (1 - layer.speed) + viewH;
      layer.el.style.height = height + "px";
      layer.el.replaceChildren();
      // One glow per row, alternating sides, at random sizes and turns.
      const rows = Math.ceil(height / (layer.spacing * scale)) + 1;
      for (let i = 0; i < rows; i++) {
        const leftSide = i % 2 === 0;
        const item = document.createElement("span");
        item.className = "play-bg__item play-bg__glow";
        item.style.left = (leftSide ? -6 + random() * 40 : 66 + random() * 40) + "%";
        item.style.top = (i + random()) * layer.spacing * scale + "px";
        item.style.setProperty("--size", Math.round((layer.size[0] + random() * (layer.size[1] - layer.size[0])) * scale) + "px");
        item.style.setProperty("--turn", Math.round(random() * 360) + "deg");
        item.style.setProperty("--img", "url(" + layer.images[Math.floor(random() * layer.images.length)] + ")");
        layer.el.append(item);
      }
    });
    move();
  };

  const move = () => {
    layers.forEach((layer) => {
      layer.el.style.transform = "translate3d(0, " + window.scrollY * layer.speed + "px, 0)";
    });
  };

  let ticking = false;
  if (motionOK) {
    window.addEventListener(
      "scroll",
      () => {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(() => {
          move();
          ticking = false;
        });
      },
      { passive: true }
    );
  }
  // Rebuild once fonts settle (text moves) and whenever the page size changes.
  if (document.fonts) document.fonts.ready.then(() => { builtFor = ""; build(); });
  if ("ResizeObserver" in window) {
    new ResizeObserver(() => requestAnimationFrame(build)).observe(playBg);
  }
  build();
}

// Lightbox: click (or press Enter on) a framed image to see it large in the
// middle of the screen. Skips the About portrait and the home page work cards.
// Images that share a container (a gallery, the collage, a pair of figures)
// get previous and next arrows, plus the arrow keys, to move between them.
const zoomable = [...document.querySelectorAll("main figure img")].filter(
  (img) => !img.closest(".portrait, .puzzle")
);
if (zoomable.length && "HTMLDialogElement" in window) {
  const groupSelector = ".gallery, .collage, .figure-grid, .figure-quotes, .sketch-grid, .brief";
  const arrow = (dir, label, path) =>
    '<button type="button" class="lightbox__nav lightbox__nav--' + dir + '" aria-label="' + label + '">' +
    '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="' + path + '"/></svg></button>';

  const dialog = document.createElement("dialog");
  dialog.className = "lightbox";
  dialog.setAttribute("aria-label", "Enlarged image");
  dialog.innerHTML =
    '<button type="button" class="lightbox__close" aria-label="Close enlarged image">' +
    '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M6 6l12 12M18 6L6 18"/></svg></button>' +
    arrow("prev", "Previous image", "M15 5l-7 7 7 7") +
    arrow("next", "Next image", "M9 5l7 7-7 7") +
    '<figure class="lightbox__figure"><img alt=""><figcaption></figcaption>' +
    '<p class="lightbox__count" aria-live="polite"></p></figure>';
  document.body.append(dialog);
  const bigImg = dialog.querySelector("img");
  const caption = dialog.querySelector("figcaption");
  const count = dialog.querySelector(".lightbox__count");
  const prevBtn = dialog.querySelector(".lightbox__nav--prev");
  const nextBtn = dialog.querySelector(".lightbox__nav--next");
  let opener = null;
  let group = [];
  let index = 0;

  const show = (i) => {
    index = (i + group.length) % group.length;
    const img = group[index];
    bigImg.src = img.currentSrc || img.src;
    bigImg.alt = img.alt;
    const text = img.closest("figure").querySelector(":scope > figcaption")?.textContent.trim() || "";
    caption.textContent = text;
    caption.hidden = !text;
    const many = group.length > 1;
    prevBtn.hidden = nextBtn.hidden = count.hidden = !many;
    count.textContent = many ? index + 1 + " of " + group.length : "";
  };

  const open = (img) => {
    opener = img;
    const container = img.closest(groupSelector);
    group = container ? zoomable.filter((other) => container.contains(other)) : [img];
    show(group.indexOf(img));
    dialog.showModal();
    document.documentElement.classList.add("lightbox-open");
  };

  dialog.addEventListener("close", () => {
    document.documentElement.classList.remove("lightbox-open");
    bigImg.removeAttribute("src");
    if (opener) opener.focus();
  });
  prevBtn.addEventListener("click", (event) => {
    event.stopPropagation();
    show(index - 1);
  });
  nextBtn.addEventListener("click", (event) => {
    event.stopPropagation();
    show(index + 1);
  });
  dialog.addEventListener("keydown", (event) => {
    if (group.length < 2) return;
    if (event.key === "ArrowLeft") show(index - 1);
    if (event.key === "ArrowRight") show(index + 1);
  });
  // Close on the X, or a click anywhere outside the image and the arrows
  dialog.addEventListener("click", (event) => {
    if (event.target !== bigImg) dialog.close();
  });

  zoomable.forEach((img) => {
    img.classList.add("is-zoomable");
    img.tabIndex = 0;
    img.setAttribute("role", "button");
    img.setAttribute("aria-label", "Enlarge image: " + img.alt);
    img.addEventListener("click", () => open(img));
    img.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        open(img);
      }
    });
  });
}
