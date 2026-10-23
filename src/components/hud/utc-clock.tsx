"use client";

import { useEffect, useState } from "react";

function format(date: Date): string {
  return date.toISOString().slice(11, 19);
}

/** Live UTC clock for the hero HUD. Renders a placeholder on the server to avoid a hydration mismatch. */
export function UtcClock({ className }: { className?: string }) {
  const [now, setNow] = useState<string | null>(null);
  useEffect(() => {
    setNow(format(new Date()));
    const id = window.setInterval(() => setNow(format(new Date())), 1000);
    return () => window.clearInterval(id);
  }, []);
  return (
    <time className={className} dateTime={now ?? undefined} suppressHydrationWarning>
      {now ?? "--:--:--"} UTC
    </time>
  );
}
