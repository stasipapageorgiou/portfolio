// Runs before the page paints so the theme never flashes.
// Every visit starts in the visitor's system setting (light or dark). If they
// flip the sun/moon toggle, that choice holds while they browse this visit,
// then resets: it's kept in sessionStorage, which clears when the tab closes.
// The toggle button itself is added by main.js.
try {
  // Choices saved permanently by an older version of the site no longer apply
  localStorage.removeItem("theme");
} catch (error) {
  // Storage is unavailable (private window). Nothing to clear.
}
try {
  var chosen = sessionStorage.getItem("theme");
  if (chosen === "light" || chosen === "dark") {
    document.documentElement.dataset.theme = chosen;
  }
} catch (error) {
  // Storage is unavailable. The system theme applies.
}
