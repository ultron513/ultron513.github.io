"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

type Panel = "palette" | "cv" | null;

type ShellContextValue = {
  panel: Panel;
  openPalette: () => void;
  openCv: () => void;
  close: () => void;
};

const ShellContext = createContext<ShellContextValue | null>(null);

/** Holds which overlay is open (station palette or CV console) and the Ctrl/Cmd+K shortcut. */
export function ShellProvider({ children }: { children: React.ReactNode }) {
  const [panel, setPanel] = useState<Panel>(null);
  const openPalette = useCallback(() => setPanel("palette"), []);
  const openCv = useCallback(() => setPanel("cv"), []);
  const close = useCallback(() => setPanel(null), []);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setPanel((current) => (current === "palette" ? null : "palette"));
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const value = useMemo(
    () => ({ panel, openPalette, openCv, close }),
    [panel, openPalette, openCv, close],
  );
  return <ShellContext.Provider value={value}>{children}</ShellContext.Provider>;
}

export function useShell(): ShellContextValue {
  const value = useContext(ShellContext);
  if (!value) throw new Error("useShell must be used inside <ShellProvider>");
  return value;
}
