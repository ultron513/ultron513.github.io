/*
 * Re-encodes project and experience images (spec §7 budgets: ≤ 250 kB each).
 * Writes <name>.webp at 1600 w and <name>-800.webp at 800 w, in place.
 * Idempotent: the 1600 w file is re-encoded from itself, so running twice is safe.
 * Run: node --experimental-strip-types scripts/optimise-images.mts
 */
import { readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import sharp from "sharp";

const BUDGET = 250 * 1024;
const dirs = ["public/images/projects"];

for (const dir of dirs) {
  for (const file of readdirSync(dir)) {
    if (!file.endsWith(".webp") || file.endsWith("-800.webp")) continue;
    const path = join(dir, file);
    const input = readFileSync(path);
    const before = statSync(path).size;

    let quality = 78;
    let large = await sharp(input)
      .resize({ width: 1600, withoutEnlargement: true })
      .webp({ quality, effort: 6 })
      .toBuffer();
    while (large.length > BUDGET && quality > 40) {
      quality -= 6;
      large = await sharp(input)
        .resize({ width: 1600, withoutEnlargement: true })
        .webp({ quality, effort: 6 })
        .toBuffer();
    }
    const small = await sharp(input)
      .resize({ width: 800 })
      .webp({ quality: 74, effort: 6 })
      .toBuffer();

    writeFileSync(path, large);
    writeFileSync(path.replace(/\.webp$/, "-800.webp"), small);
    const kb = (n: number) => `${Math.round(n / 1024)} kB`;
    console.log(
      `${file}: ${kb(before)} -> ${kb(large.length)} (q${quality}) + 800w ${kb(small.length)}`,
    );
    if (large.length > BUDGET) {
      console.error(`  over budget: ${file}`);
      process.exitCode = 1;
    }
  }
}
