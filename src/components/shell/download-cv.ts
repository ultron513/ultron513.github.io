import { profile } from "@/content";

/** Starts the CV download from script (palette action). The CV console uses a real <a download>. */
export function downloadCv() {
  const link = document.createElement("a");
  link.href = profile.cv.path;
  link.download = profile.cv.fileName;
  document.body.append(link);
  link.click();
  link.remove();
}
