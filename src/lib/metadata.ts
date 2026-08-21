import type { Metadata } from "next";

import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "./constants";

export function createMetadata(
  title?: string,
  description: string = SITE_DESCRIPTION,
): Metadata {
  const fullTitle = title ? `${title} | ${SITE_NAME}` : SITE_NAME;

  return {
    title: fullTitle,
    description,
    metadataBase: new URL(SITE_URL),
    authors: [
      {
        name: "Ashish Kumar Patra",
      },
    ],
    creator: "Ashish Kumar Patra",
    applicationName: SITE_NAME,
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      title: fullTitle,
      description,
      type: "website",
      siteName: SITE_NAME,
      url: SITE_URL,
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
    },
  };
}