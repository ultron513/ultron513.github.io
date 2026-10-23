/** Deterministic PRNG (mulberry32) so every "illustrative" dataset renders identically on server and client. */
export function seeded(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Smooth 1-D value noise in [0, 1], built from the seeded PRNG. */
export function noise1d(seed: number, length: number, smoothing = 6): number[] {
  const rand = seeded(seed);
  const knots = Array.from({ length: Math.ceil(length / smoothing) + 2 }, rand);
  return Array.from({ length }, (_, i) => {
    const x = i / smoothing;
    const k = Math.floor(x);
    const t = x - k;
    const s = t * t * (3 - 2 * t);
    return knots[k] * (1 - s) + knots[k + 1] * s;
  });
}
