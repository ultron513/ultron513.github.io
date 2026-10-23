/*
 * Flat (equirectangular) world projection shared by the route map and its build script.
 * Longitude spans the full -180..180; latitude is cropped to 78°N..56°S (no polar caps),
 * which keeps every inhabited coastline while giving the map a wide, flat aspect.
 */
export const MAP = { width: 1000, latTop: 78, latBottom: -56 } as const;
export const MAP_HEIGHT = (MAP.width * (MAP.latTop - MAP.latBottom)) / 360;

export function project(lat: number, lon: number): { x: number; y: number } {
  return {
    x: ((lon + 180) / 360) * MAP.width,
    y: ((MAP.latTop - lat) / (MAP.latTop - MAP.latBottom)) * MAP_HEIGHT,
  };
}

/** Great-circle distance in kilometres (haversine, mean Earth radius 6371 km). */
export function distanceKm(
  a: { lat: number; lon: number },
  b: { lat: number; lon: number },
): number {
  const rad = Math.PI / 180;
  const dLat = (b.lat - a.lat) * rad;
  const dLon = (b.lon - a.lon) * rad;
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(a.lat * rad) * Math.cos(b.lat * rad) * Math.sin(dLon / 2) ** 2;
  return 2 * 6371 * Math.asin(Math.sqrt(h));
}
