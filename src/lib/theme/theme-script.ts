/*
 * Runs inline in <head> before first paint, so the page never flashes the wrong theme.
 * Saved choice wins; otherwise the OS preference decides (spec §2, open question 6).
 */
export const THEME_STORAGE_KEY = "mission-control-theme";

export const themeScript = `(function(){var d=document.documentElement,t;try{t=localStorage.getItem("${THEME_STORAGE_KEY}")}catch(e){}if(t!=="light"&&t!=="dark"){t=window.matchMedia&&window.matchMedia("(prefers-color-scheme: light)").matches?"light":"dark"}d.setAttribute("data-theme",t)})();`;
