/*
 * Tiny static server for the exported site in out/ (used by Playwright and Lighthouse).
 * Mirrors GitHub Pages: directory -> index.html, unknown path -> 404.html with status 404.
 * Run: node scripts/serve-out.mjs [port]
 */
import { createReadStream, existsSync, statSync } from "node:fs";
import { createServer } from "node:http";
import { extname, join, normalize } from "node:path";

const root = join(process.cwd(), "out");
const port = Number(process.argv[2] ?? process.env.PORT ?? 4173);
const types = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript",
  ".css": "text/css",
  ".json": "application/json",
  ".txt": "text/plain; charset=utf-8",
  ".xml": "application/xml",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".webp": "image/webp",
  ".ico": "image/x-icon",
  ".woff2": "font/woff2",
  ".pdf": "application/pdf",
};

function resolve(urlPath) {
  const safe = normalize(decodeURIComponent(urlPath.split("?")[0])).replace(/^(\.\.[/\\])+/, "");
  let file = join(root, safe);
  if (existsSync(file) && statSync(file).isDirectory()) file = join(file, "index.html");
  else if (!existsSync(file) && existsSync(`${file}.html`)) file = `${file}.html`;
  return existsSync(file) ? file : null;
}

createServer((req, res) => {
  const file = resolve(req.url ?? "/");
  const target = file ?? join(root, "404.html");
  res.writeHead(file ? 200 : 404, {
    "content-type": types[extname(target)] ?? "application/octet-stream",
  });
  createReadStream(target).pipe(res);
}).listen(port, () => console.log(`Serving out/ on http://localhost:${port}`));
