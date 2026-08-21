import type {
  AnchorHTMLAttributes,
  ReactNode,
} from "react";

import { cn } from "@/lib/utils";

type ExternalLinkProps =
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    children: ReactNode;
    showIcon?: boolean;
  };

export function ExternalLink({
  children,
  className,
  showIcon = true,
  target = "_blank",
  rel = "noreferrer",
  ...props
}: ExternalLinkProps) {
  return (
    <a
      target={target}
      rel={rel}
      className={cn(
        "inline-flex items-center gap-1.5 transition-colors",
        className,
      )}
      {...props}
    >
      {children}

      {showIcon ? (
        <span aria-hidden="true" className="text-[0.9em]">
          ↗
        </span>
      ) : null}
    </a>
  );
}