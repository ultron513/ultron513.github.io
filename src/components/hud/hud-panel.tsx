import { cn } from "@/lib/utils";

/** Glass surface with HUD corner brackets: the site's signature panel (spec §2). */
export function HudPanel({
  as: Tag = "div",
  className,
  children,
  ...rest
}: { as?: "div" | "section" | "article" | "aside" | "li" } & React.HTMLAttributes<HTMLElement>) {
  return (
    <Tag className={cn("hud glass rounded-md shadow-depth", className)} {...rest}>
      {children}
    </Tag>
  );
}
