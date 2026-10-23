import type { Metadata } from "next";

import { CvConsole } from "@/components/cv-search/cv-console";
import { getCvMeta } from "@/lib/cv-meta";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "CV",
  description:
    "Download Ashish Kumar Patra's CV: experience at McLaren Racing, ISTA, Stanford Code in Place and IIT Guwahati, projects, education and skills.",
  path: "/cv",
  og: "cv",
});

export default function CvPage() {
  const meta = getCvMeta();
  return (
    <div className="mx-auto flex min-h-[100svh] max-w-3xl flex-col justify-center px-5 pb-20 pt-32">
      <h1 className="sr-only">Ashish Kumar Patra&apos;s CV</h1>
      <CvConsole meta={meta} />
      <p className="mt-6 text-center text-sm text-faint">
        Prefer a direct link?{" "}
        <a href={meta.path} className="link-quiet text-muted">
          {meta.fileName}
        </a>
        , {meta.sizeLabel}.
      </p>
    </div>
  );
}
