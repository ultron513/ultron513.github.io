import type { Metadata } from "next";

import { CvConsole } from "@/components/cv-search/cv-console";
import { Comms } from "@/components/sections/comms";
import { PageHeader } from "@/components/sections/page-header";
import { profile } from "@/content";
import { getCvMeta } from "@/lib/cv-meta";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Contact",
  description:
    "Contact Ashish Kumar Patra about software engineering, AI/ML, data, research and technical collaboration opportunities.",
  path: "/contact",
  og: "contact",
});

export default function ContactPage() {
  return (
    <div className="pt-28 sm:pt-32">
      <div className="mx-auto max-w-6xl px-5">
        <PageHeader
          context={`${profile.location.city}, ${profile.location.country}`}
          title="Comms channel"
          lead="Email is the fastest way to reach me. LinkedIn and GitHub work too."
        />
      </div>
      <Comms console={<CvConsole meta={getCvMeta()} compact />} />
    </div>
  );
}
