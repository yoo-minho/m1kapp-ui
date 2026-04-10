import { type ReactNode } from "react";

export interface WatermarkSponsor {
  /** Service name displayed in the background, interleaved with the watermark text */
  name: string;
  /** URL to navigate to when the background is clicked */
  url: string;
}

export interface WatermarkProps {
  children: ReactNode;
  /** Background fill color. Accepts any CSS color value. Default: "#0f172a" */
  color?: string;
  /**
   * Repeating watermark text shown across the background.
   * Default: "m1k"
   */
  text?: string;
  /** Max width of the center content area in px. Default: 430 */
  maxWidth?: number;
  /** Padding around the app shell in px. Default: 12 */
  padding?: number;
  /**
   * 1k milestone sponsor slot.
   * When provided, the sponsor's name is interleaved with the watermark text
   * across the background. The entire background becomes a clickable link
   * pointing to `sponsor.url`.
   *
   * Font size auto-scales based on text length (14–28px).
   *
   * @example
   * <Watermark
   *   color={colors.blue}
   *   sponsor={{ name: "@m1kapp/ui", url: "https://github.com/m1kapp/ui" }}
   * >
   *   <AppShell>...</AppShell>
   * </Watermark>
   */
  sponsor?: WatermarkSponsor;
  /**
   * Background drift animation speed in seconds per cycle.
   * Set to `0` to disable animation (static background).
   * Default: 20
   *
   * @example
   * <Watermark speed={0} />   // static
   * <Watermark speed={10} />  // faster
   * <Watermark speed={40} />  // very slow
   */
  speed?: number;
}

function buildSvgTile(texts: { value: string; x: number; y: number }[]): string {
  const w = 260;
  const h = 140;
  const items = texts
    .map(
      ({ value, x, y }) => {
        const fontSize = Math.max(14, Math.min(28, Math.floor(160 / value.length)));
        return `<text x="${x}" y="${y}" font-family="system-ui,sans-serif" font-size="${fontSize}" font-weight="900" fill="white" opacity="0.1">${value}</text>`;
      }
    )
    .join("\n");
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}">${items}</svg>`;
  return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
}

const KEYFRAMES = `
@keyframes watermark-drift {
  0%   { background-position: 0 0; }
  100% { background-position: 260px 140px; }
}
`;

let styleInjected = false;
function injectStyle() {
  if (styleInjected || typeof document === "undefined") return;
  const el = document.createElement("style");
  el.textContent = KEYFRAMES;
  document.head.appendChild(el);
  styleInjected = true;
}

/**
 * Full-screen colored background with repeating animated text watermark pattern.
 * Supports a sponsor prop — 1k milestone reward where the service name is
 * interleaved with "m1k" across the background, with a clickable link.
 */
export function Watermark({
  children,
  color = "#0f172a",
  text = "m1k",
  maxWidth = 430,
  padding = 12,
  sponsor,
  speed = 20,
}: WatermarkProps) {
  injectStyle();

  const tiles = sponsor
    ? [
        { value: text,         x: 10,  y: 50  },
        { value: sponsor.name, x: 130, y: 110 },
      ]
    : [
        { value: text, x: 10,  y: 50  },
        { value: text, x: 130, y: 110 },
      ];

  return (
    <div
      className="h-dvh w-full relative overflow-hidden"
      style={{ backgroundColor: color, transition: "background-color 0.5s ease" }}
    >
      {/* animated watermark layer */}
      <div
        className="absolute inset-0 pointer-events-none select-none"
        style={{
          backgroundImage: buildSvgTile(tiles),
          backgroundRepeat: "repeat",
          transform: "rotate(-12deg) scale(2)",
          transformOrigin: "center center",
          animation: speed > 0 ? `watermark-drift ${speed}s linear infinite` : undefined,
        }}
      />

      {/* sponsor clickable overlay (same pattern, transparent, pointer-events on) */}
      {sponsor && (
        <a
          href={sponsor.url}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute inset-0 z-1"
          aria-label={`${sponsor.name} — 1k sponsor`}
          style={{ cursor: "pointer" }}
        />
      )}

      <div
        className="relative z-10 h-full flex items-center justify-center mx-auto"
        style={{ maxWidth, padding }}
      >
        {children}
      </div>
    </div>
  );
}
