// Runs before the page paints so a saved light or dark choice never flashes.
// The toggle button itself is added by main.js.
try {
  var saved = localStorage.getItem("theme");
  if (saved === "light" || saved === "dark") {
    document.documentElement.dataset.theme = saved;
  }
} catch (error) {
  // Storage is unavailable (private window). The system theme applies.
}
