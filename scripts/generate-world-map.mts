/*
 * Builds the dot-matrix world map used by the Experience route map.
 *
 * Input:  Natural Earth 1:110m land (public domain), as TopoJSON from the `world-atlas` package:
 *           npm pack world-atlas@2 && tar xzf world-atlas-*.tgz   -> package/land-110m.json
 * Output: public/images/world-dots.svg, one tiny round dot per land cell on a staggered grid,
 *         projected with src/lib/geo.ts. The page uses it as a CSS mask, so its colour follows the theme.
 *
 * Run: pnpm map -- path/to/land-110m.json
 */
import { readFileSync, writeFileSync } from "node:fs";

import { MAP, MAP_HEIGHT, project } from "../src/lib/geo.ts";

type Topology = {
  transform: { scale: [number, number]; translate: [number, number] };
  arcs: [number, number][][];
  objects: { land: { geometries: { type: string; arcs: number[][][] | number[][] }[] } };
};

const input = process.argv.slice(2).find((arg) => arg !== "--");
if (!input) {
  console.error("Usage: pnpm map -- path/to/land-110m.json");
  process.exit(1);
}
const topology = JSON.parse(readFileSync(input, "utf8")) as Topology;
const { scale, translate } = topology.transform;

// Decode delta-encoded, quantised arcs into lon/lat points (TopoJSON spec §2.1.4).
const arcs = topology.arcs.map((arc) => {
  let x = 0;
  let y = 0;
  return arc.map(([dx, dy]) => {
    x += dx;
    y += dy;
    return [x * scale[0] + translate[0], y * scale[1] + translate[1]] as [number, number];
  });
});

function ring(indexes: number[]): [number, number][] {
  const points: [number, number][] = [];
  for (const index of indexes) {
    const arc = index < 0 ? [...arcs[~index]].reverse() : arcs[index];
    points.push(...(points.length ? arc.slice(1) : arc));
  }
  return points;
}

// Unwrap each ring so consecutive points never jump across the antimeridian (Chukotka, Fiji):
// the ring becomes one continuous shape that may extend past ±180°.
function unwrap(points: [number, number][]): [number, number][] {
  let shift = 0;
  return points.map(([lon, lat], i) => {
    if (i > 0) {
      const previous = points[i - 1][0];
      if (lon - previous > 180) shift -= 360;
      else if (previous - lon > 180) shift += 360;
    }
    return [lon + shift, lat];
  });
}

const rings: [number, number][][] = [];
for (const geometry of topology.objects.land.geometries) {
  const polygons = (geometry.type === "Polygon" ? [geometry.arcs] : geometry.arcs) as number[][][];
  for (const polygon of polygons) for (const r of polygon) rings.push(unwrap(ring(r)));
}

function insideRing(r: [number, number][], lon: number, lat: number): boolean {
  let inside = false;
  for (let i = 0, j = r.length - 1; i < r.length; j = i++) {
    const [xi, yi] = r[i];
    const [xj, yj] = r[j];
    if (yi > lat !== yj > lat && lon < ((xj - xi) * (lat - yi)) / (yj - yi) + xi) inside = !inside;
  }
  return inside;
}

// Even-odd across rings (outer rings and holes); each unwrapped ring is also tested one turn east and west.
function isLand(lon: number, lat: number): boolean {
  let land = false;
  for (const r of rings) {
    if (insideRing(r, lon, lat) || insideRing(r, lon + 360, lat) || insideRing(r, lon - 360, lat))
      land = !land;
  }
  return land;
}

const STEP = 1.6; // degrees between dots
const dots: string[] = [];
let row = 0;
for (let lat = MAP.latTop - STEP / 2; lat > MAP.latBottom; lat -= STEP, row++) {
  const offset = row % 2 ? STEP / 2 : 0; // staggered rows read as a finer, hex-like texture
  for (let lon = -180 + STEP / 2 + offset; lon < 180; lon += STEP) {
    if (!isLand(lon, lat)) continue;
    const { x, y } = project(lat, lon);
    dots.push(`M${x.toFixed(1)} ${y.toFixed(1)}h0`);
  }
}

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${MAP.width} ${MAP_HEIGHT.toFixed(2)}"><!-- Land: Natural Earth 1:110m (public domain), via world-atlas. --><path d="${dots.join("")}" stroke="#000" stroke-width="2.6" stroke-linecap="round" fill="none"/></svg>\n`;
writeFileSync("public/images/world-dots.svg", svg);
console.log(`world-dots.svg: ${dots.length} land dots, ${Math.round(svg.length / 1024)} kB`);
