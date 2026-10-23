/** Fixed decorative layer behind all content: horizon glow, faint scan lines and grain (spec §7). */
export function Backdrop() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div
        className="absolute inset-x-0 bottom-[-40vh] h-[80vh] rounded-[50%] blur-3xl"
        style={{ background: "radial-gradient(closest-side, var(--horizon), transparent)" }}
      />
      <div className="scanlines absolute inset-0" />
      <div className="grain absolute inset-0" />
    </div>
  );
}
