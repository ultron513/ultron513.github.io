import Link from "next/link";

const footerNavigation = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Experience",
    href: "/experience",
  },
  {
    label: "Projects",
    href: "/projects",
  },
  {
    label: "Certificates",
    href: "/certificates",
  },
  {
    label: "Contact",
    href: "/contact",
  },
];

const socialLinks = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/ashish-patra-513akp/",
  },
  {
    label: "GitHub",
    href: "https://github.com/ultron513",
  },
  {
    label: "Email",
    href: "mailto:ashish.patra513@gmail.com",
  },
];

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[var(--background)]">
      <div className="mx-auto max-w-7xl px-6 py-12 sm:py-16">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <Link
              href="/"
              className="text-xl font-semibold tracking-tight transition-opacity hover:opacity-70"
            >
              Ashish Patra
            </Link>

            <p className="mt-4 max-w-md text-sm leading-6 text-zinc-500">
              Software development, artificial intelligence, data science,
              machine learning, and full-stack engineering.
            </p>
          </div>

          <div className="flex flex-wrap gap-x-6 gap-y-3">
            {footerNavigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm text-zinc-500 transition-colors hover:text-white"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-5 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-zinc-600">
            © {new Date().getFullYear()} Ashish Kumar Patra. All rights
            reserved.
          </p>

          <div className="flex flex-wrap gap-5">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={link.href.startsWith("http") ? "noreferrer" : undefined}
                className="text-xs text-zinc-600 transition-colors hover:text-white"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}