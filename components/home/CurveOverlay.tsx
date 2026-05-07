/**
 * Decorative organic curves layered over the nav-bar column to echo the
 * postcard's curved boundaries between sections. Pointer-events disabled so
 * clicks pass through to the buttons underneath.
 *
 * Coordinates are derived from docs/design/oma-collective-site-v2.svg's
 * right-column area (x=611–866, y=0–530), shifted to a 255x530 viewBox.
 *
 * Hidden on phone/tablet — the bars are horizontal there and the curves
 * don't translate cleanly.
 */
export function CurveOverlay() {
  return (
    <svg
      viewBox="0 0 255 530"
      preserveAspectRatio="none"
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 hidden h-full w-full lg:block"
    >
      {/* Rust circle bumping DOWN from BUY/YOUR/TICKETS into THE EVENT */}
      <circle cx="231" cy="106" r="42.33" fill="var(--color-rust)" />
      {/* Chartreuse half-circle on the LEFT edge of THE EVENT */}
      <circle cx="0" cy="212" r="47.44" fill="var(--color-chartreuse)" />
      {/* Two teal half-circles bumping UP from THE VENUE into RUN OF SHOW */}
      <circle cx="173" cy="318" r="40.98" fill="var(--color-teal)" />
      <circle cx="255" cy="318" r="40.98" fill="var(--color-teal)" />
      {/* Maroon circle bumping UP from ABOUT THE OMA into THE VENUE */}
      <circle cx="217" cy="427" r="66.32" fill="var(--color-inner-maroon)" />
    </svg>
  );
}
