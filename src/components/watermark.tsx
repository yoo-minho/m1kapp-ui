import { type ReactNode } from "react";

export interface WatermarkProps {
  children: ReactNode;
  /** Background color */
  color?: string;
  /** Watermark text. Default: "m1k" */
  text?: string;
  /** Max width of content area. Default: 430 */
  maxWidth?: number;
  /** Padding around the app shell. Default: 12px */
  padding?: number;
}

function buildSvgPattern(text: string, opacity: number = 0.08): string {
  const w = 220;
  const h = 120;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}">
    <text x="10" y="45" font-family="system-ui,sans-serif" font-size="44" font-weight="900" fill="white" opacity="${opacity}">${text}</text>
    <text x="120" y="100" font-family="system-ui,sans-serif" font-size="44" font-weight="900" fill="white" opacity="${opacity}">${text}</text>
  </svg>`;
  return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
}

/**
 * Full-screen colored background with repeating text watermark pattern.
 * Wraps the AppShell and provides the "floating app" look.
 */
export function Watermark({
  children,
  color = "#0f172a",
  text = "m1k",
  maxWidth = 430,
  padding = 12,
}: WatermarkProps) {
  return (
    <div
      className="h-dvh w-full relative overflow-hidden"
      style={{ backgroundColor: color, transition: "background-color 0.5s ease" }}
    >
      <div
        className="absolute inset-0 pointer-events-none select-none"
        style={{
          backgroundImage: buildSvgPattern(text),
          backgroundRepeat: "repeat",
          transform: "rotate(-12deg) scale(1.5)",
          transformOrigin: "center center",
        }}
      />
      <div
        className="relative z-10 h-full flex items-center justify-center mx-auto"
        style={{ maxWidth, padding }}
      >
        {children}
      </div>
    </div>
  );
}
