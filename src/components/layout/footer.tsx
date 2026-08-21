import Link from "next/link";

import { navigation } from "@/data/navigation";
import { profile } from "@/data/profile";

const socialLinks = [
  {
    label: "LinkedIn",
    href: profile.contact.linkedin,
  },
  {
    label: "GitHub",
    href: profile.contact.github,
  },
  {
    label: "Email",
    href: `mailto:${profile.contact.email}`,
  },
];

export function Footer() {
  return (
    <footer className="border-t border-white/[0.08] bg-[#030303]">
      <div className="mx-auto max-w-7xl px-5 py-10 sm:px-6 sm:py-12 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:gap-16">
          <div className="max-w-xl">
            <Link
              href="/"
              className="group inline-flex items-center gap-3"
            >
              <span
                aria-hidden="true"
                className="flex size-9 items-center justify-center rounded-full border border-white/[0.1] bg-white/[0.03] font-['Space_Grotesk'] text-xs font-medium text-white transition-all duration-300 group-hover:border-white/[0.2] group-hover:bg-white/[0.06]"
              >
                AP
              </span>

              <span className="text-sm font-medium text-zinc-300 transition-colors group-hover:text-white">
                Ashish Patra
              </span>
            </Link>

            <p className="mt-5 max-w-md text-sm leading-7 text-zinc-700">
              Software engineering, artificial intelligence, data science,
              machine learning, and full-stack systems.
            </p>
          </div>

          <nav
            aria-label="Footer navigation"
            className="grid grid-cols-2 gap-x-8 gap-y-3 sm:grid-cols-3 sm:gap-x-12"
          >
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm text-zinc-600 transition-colors hover:text-white"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="mt-10 flex flex-col gap-5 border-t border-white/[0.07] pt-6 sm:mt-12 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-zinc-800">
            © {new Date().getFullYear()} Ashish Kumar Patra
          </p>

          <div className="flex flex-wrap gap-x-5 gap-y-2">
            {socialLinks.map((link) => {
              const isExternal =
                link.href.startsWith("http");

              return (
                <a
                  key={link.label}
                  href={link.href}
                  target={
                    isExternal
                      ? "_blank"
                      : undefined
                  }
                  rel={
                    isExternal
                      ? "noreferrer"
                      : undefined
                  }
                  className="text-xs text-zinc-700 transition-colors hover:text-zinc-300"
                >
                  {link.label}
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
}