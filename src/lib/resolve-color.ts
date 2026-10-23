/**
 * Resolves a CSS custom property (any colour syntax, including oklch) to sRGB 0–1 floats
 * by painting one pixel on a 2D canvas. Used to feed tokens into WebGL shaders.
 */
export function resolveColor(
  variable: string,
  element: Element = document.documentElement,
): [number, number, number, number] {
  const value = getComputedStyle(element).getPropertyValue(variable).trim() || "white";
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = 1;
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  if (!ctx) return [1, 1, 1, 1];
  ctx.clearRect(0, 0, 1, 1);
  ctx.fillStyle = value;
  ctx.fillRect(0, 0, 1, 1);
  const [r, g, b, a] = ctx.getImageData(0, 0, 1, 1).data;
  return [r / 255, g / 255, b / 255, a / 255];
}
