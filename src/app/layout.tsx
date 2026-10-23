import type { Metadata, Viewport } from "next";

import { Backdrop } from "@/components/shell/backdrop";
import { CommandPalette } from "@/components/shell/command-palette";
import { ShellProvider } from "@/components/shell/shell-context";
import { SiteFooter } from "@/components/shell/site-footer";
import { SiteHeader } from "@/components/shell/site-header";
import { WarpTransition } from "@/components/shell/warp-transition";
import { pageMetadata } from "@/lib/metadata";
import { SITE } from "@/lib/site";
import { ThemeProvider } from "@/lib/theme/theme-provider";
import { themeScript } from "@/lib/theme/theme-script";

import "./globals.css";

export const metadata: Metadata = {
  ...pageMetadata({ path: "/", og: "home" }),
  metadataBase: new URL(SITE.url),
  title: { default: `${SITE.name}: Mission Control`, template: `%s | ${SITE.name}` },
  applicationName: SITE.name,
  authors: [{ name: SITE.fullName, url: SITE.url }],
  creator: SITE.fullName,
  keywords: [
    "Ashish Kumar Patra",
    "software engineer",
    "data scientist",
    "machine learning",
    "Formula 1 telemetry",
    "IIT Guwahati",
    "IIIT Bhubaneswar",
  ],
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#080a16" },
    { media: "(prefers-color-scheme: light)", color: "#f3f7fc" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <link
          rel="preload"
          href="/fonts/SpaceGrotesk-Variable.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/Inter-Variable.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </head>
      <body>
        <ThemeProvider>
          <ShellProvider>
            <a
              href="#main"
              className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-sm focus:bg-accent focus:px-4 focus:py-2 focus:text-on-accent"
            >
              Skip to content
            </a>
            <Backdrop />
            <SiteHeader />
            <main id="main" tabIndex={-1} className="focus:outline-none">
              {children}
            </main>
            <SiteFooter />
            <CommandPalette />
            <WarpTransition />
          </ShellProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
