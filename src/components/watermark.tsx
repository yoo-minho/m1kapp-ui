import { type ReactNode } from "react";

export interface WatermarkSponsor {
  /** Service name displayed in the background as clickable text */
  name: string;
  /** URL to navigate to when the sponsor text is clicked */
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
   * The sponsor's name is interleaved with the watermark text across the
   * background. Only the sponsor text is clickable (not the whole background).
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

const KEYFRAMES = `
html { height: 100dvh; }
@keyframes watermark-drift {
  0%   { transform: rotate(-12deg) scale(2) translate(0, 0); }
  100% { transform: rotate(-12deg) scale(2) translate(180px, 100px); }
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

  const textFontSize = Math.max(14, Math.min(28, Math.floor(160 / text.length)));
  const sponsorFontSize = sponsor
    ? Math.max(14, Math.min(28, Math.floor(160 / sponsor.name.length)))
    : textFontSize;

  const tileW = 180;
  const tileH = 100;
  const cols = 16;
  const rows = 16;
  const offsetX = (cols * tileW) / 2;
  const offsetY = (rows * tileH) / 2;

  return (
    <div
      className="h-dvh w-full relative overflow-hidden"
      style={{ backgroundColor: color, transition: "background-color 0.5s ease" }}
    >
      {/* background — pointer-events-none on container, auto on each link */}
      <div
        className="absolute inset-0 select-none"
        style={{
          transformOrigin: "center center",
          animation: speed > 0 ? `watermark-drift ${speed}s linear infinite` : undefined,
          transform: "rotate(-12deg) scale(2)",
          pointerEvents: "none",
        }}
      >
        {Array.from({ length: rows }).flatMap((_, row) =>
          Array.from({ length: cols }).map((_, col) => {
            const x = col * tileW - offsetX + tileW / 2;
            const y = row * tileH - offsetY + tileH / 2;
            const isSponsor = (row + col) % 2 === 1 && sponsor;

            const commonStyle: React.CSSProperties = {
              position: "absolute",
              left: x,
              top: y,
              transform: "translate(-50%, -50%)",
              fontWeight: 900,
              color: "rgba(255,255,255,0.12)",
              whiteSpace: "nowrap",
              lineHeight: 1,
              pointerEvents: "auto",
              cursor: "pointer",
            };

            if (isSponsor) {
              return (
                <a
                  key={`${row}-${col}`}
                  href={sponsor!.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:opacity-30 transition-opacity"
                  style={{ ...commonStyle, fontSize: sponsorFontSize, textDecoration: "none" }}
                >
                  {sponsor!.name}
                </a>
              );
            }

            return (
              <a
                key={`${row}-${col}`}
                href="https://m1k.app"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-30 transition-opacity"
                style={{ ...commonStyle, fontSize: textFontSize, textDecoration: "none" }}
              >
                {text}
              </a>
            );
          })
        )}
      </div>

      {/* content */}
      <div
        className="relative z-10 h-full flex items-center justify-center mx-auto"
        style={{ maxWidth, padding }}
      >
        {children}
      </div>
    </div>
  );
}
