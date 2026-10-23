import { readFileSync } from "node:fs";
import { join } from "node:path";

import { profile } from "@/content";

export type CvMeta = {
  fileName: string;
  path: string;
  sizeLabel: string;
  updatedLabel: string;
  updatedIso: string;
  pages?: number;
};

/**
 * Reads the CV file at build time (spec §6): size from the file, last-updated date from the PDF's own
 * ModDate (file timestamps are unreliable after a git checkout). Server-only: uses the filesystem.
 */
export function getCvMeta(): CvMeta {
  const bytes = readFileSync(join(process.cwd(), "public", profile.cv.path));
  const text = bytes.toString("latin1");
  const date =
    text.match(/\/ModDate\s*\(D:(\d{4})(\d{2})(\d{2})/) ??
    text.match(/\/CreationDate\s*\(D:(\d{4})(\d{2})(\d{2})/);
  const pages = (text.match(/\/Type\s*\/Page(?!s)/g) ?? []).length || undefined;
  const iso = date ? `${date[1]}-${date[2]}-${date[3]}` : "";
  const updatedLabel = iso
    ? new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
        timeZone: "UTC",
      })
    : "Unknown";
  return {
    fileName: profile.cv.fileName,
    path: profile.cv.path,
    sizeLabel: `${Math.round(bytes.length / 1024)} kB`,
    updatedLabel,
    updatedIso: iso,
    pages,
  };
}
