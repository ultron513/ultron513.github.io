export const SITE = {
  name: "Ashish Patra",
  fullName: "Ashish Kumar Patra",
  url: "https://ultron513.github.io",
  description:
    "Ashish Kumar Patra: software engineer, data scientist and AI/ML engineer. Race telemetry at McLaren, compiler research at ISTA, and projects across machine learning, computer vision and full-stack engineering.",
} as const;

export function absoluteUrl(path: string): string {
  const clean = path === "/" ? "/" : `/${path.replace(/^\/+|\/+$/g, "")}/`;
  return new URL(clean, SITE.url).toString();
}
