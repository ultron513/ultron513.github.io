import { SOCIAL_LINKS } from "@/lib/constants";

const links = [
  {
    label: "LinkedIn",
    href: SOCIAL_LINKS.linkedin,
  },
  {
    label: "GitHub",
    href: SOCIAL_LINKS.github,
  },
  {
    label: "Email",
    href: SOCIAL_LINKS.email,
  },
];

type SocialLinksProps = {
  className?: string;
};

export function SocialLinks({
  className = "",
}: SocialLinksProps) {
  return (
    <nav
      aria-label="Social links"
      className={`flex flex-wrap items-center gap-4 ${className}`}
    >
      {links.map((link) => {
        const isExternal = link.href.startsWith("http");

        return (
          <a
            key={link.label}
            href={link.href}
            target={isExternal ? "_blank" : undefined}
            rel={isExternal ? "noreferrer" : undefined}
            className="text-sm text-zinc-500 transition-colors hover:text-white"
          >
            {link.label}
          </a>
        );
      })}
    </nav>
  );
}