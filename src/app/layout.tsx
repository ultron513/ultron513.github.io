import type { Metadata } from "next";

import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { PageTransition } from "@/components/layout/page-transition";
import { LoadingScreen } from "@/components/shared/loading-screen";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/constants";

import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  metadataBase: new URL(SITE_URL),
  keywords: [
    "Ashish Patra",
    "Software Engineer",
    "Data Science",
    "Artificial Intelligence",
    "Machine Learning",
    "Full Stack Development",
    "IIT Guwahati",
    "IIIT Bhubaneswar",
  ],
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
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    type: "website",
    siteName: SITE_NAME,
    url: SITE_URL,
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-[var(--background)] text-[var(--foreground)] antialiased">
        <a
          href="#main-content"
          className="sr-only fixed left-4 top-4 z-[300] rounded-full bg-white px-4 py-2 text-sm font-medium text-black focus:not-sr-only"
        >
          Skip to content
        </a>

        <LoadingScreen />

        <Navbar />

        <PageTransition>
          <div
            id="main-content"
            className="relative min-h-screen"
          >
            {children}
          </div>
        </PageTransition>

        <Footer />
      </body>
    </html>
  );
}