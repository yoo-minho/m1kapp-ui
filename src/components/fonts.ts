/**
 * Font presets for @m1kapp/ui.
 * These return CSS @import strings to load fonts from official CDNs.
 * No font files are bundled — only references to the original sources.
 */

export const fonts = {
  /** Toss Product Sans — from toss.im (free for commercial use) */
  toss: 'https://static.toss.im/dist/tps.css',
  /** Pretendard — popular Korean web font */
  pretendard: 'https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css',
  /** Inter — clean Latin sans-serif */
  inter: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;900&display=swap',
} as const;

export type FontName = keyof typeof fonts;

/**
 * Returns a <link> href for the given font preset.
 * Usage in your HTML head or via a <link> tag:
 *
 * ```tsx
 * <link rel="stylesheet" href={fonts.toss} />
 * ```
 *
 * Or in CSS:
 * ```css
 * @import url("https://static.toss.im/dist/tps.css");
 * body { font-family: "Toss Product Sans", sans-serif; }
 * ```
 */
export const fontFamily = {
  toss: '"Toss Product Sans", "Pretendard", system-ui, sans-serif',
  pretendard: '"Pretendard Variable", "Pretendard", system-ui, sans-serif',
  inter: '"Inter", system-ui, sans-serif',
} as const;
