import { type ReactNode, useState, useEffect } from "react";
import { colors } from "./colors";

export interface ThemeButtonProps {
  color: string;
  dark?: boolean;
  onClick: () => void;
  className?: string;
}

/**
 * Single circular button split diagonally — half dark/light, half theme color.
 */
export function ThemeButton({ color, dark = false, onClick, className = "" }: ThemeButtonProps) {
  const monoColor = dark ? "#000" : "#fff";
  const monoStroke = dark ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.12)";

  return (
    <button
      onClick={onClick}
      className={`w-7 h-7 rounded-full transition-all active:scale-90 hover:scale-110 overflow-hidden ${className}`}
      style={{ boxShadow: `0 2px 10px ${color}55` }}
      title="Theme"
    >
      <svg width="100%" height="100%" viewBox="0 0 100 100">
        {/* top-left: mono */}
        <path d="M0 0 L100 0 L0 100 Z" fill={monoColor} />
        {/* bottom-right: theme color */}
        <path d="M100 0 L100 100 L0 100 Z" fill={color} />
        {/* border */}
        <circle cx="50" cy="50" r="49" fill="none" stroke={monoStroke} strokeWidth="2" />
      </svg>
    </button>
  );
}

export interface ThemeDialogProps {
  open: boolean;
  onClose: () => void;
  current: string;
  onSelect: (color: string) => void;
  dark?: boolean;
  onDarkToggle?: () => void;
  /** Override the color palette. Defaults to built-in colors. */
  palette?: Record<string, string>;
}

/**
 * Bottom-sheet style color picker dialog.
 * Shows a 5-column grid of color circles with check on the active one.
 */
export function ThemeDialog({
  open,
  onClose,
  current,
  onSelect,
  dark = false,
  onDarkToggle,
  palette = colors,
}: ThemeDialogProps) {
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onClose]);

  if (!open) return null;

  const entries = Object.entries(palette);

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center" onClick={onClose}>
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
      <div
        className="relative z-10 w-full max-w-101.5 mb-3 mx-3 rounded-2xl bg-white dark:bg-zinc-900 shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-4 pt-4 pb-3">
          <p className="text-sm font-bold text-zinc-900 dark:text-white mb-3">테마</p>

          {onDarkToggle && (
            <div className="flex gap-2 mb-4">
              {[
                { label: "라이트", isDark: false },
                { label: "다크", isDark: true },
              ].map((mode) => {
                const active = dark === mode.isDark;
                return (
                  <button
                    key={mode.label}
                    onClick={() => { if (!active) onDarkToggle(); }}
                    className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-2xl transition-all ${
                      active
                        ? "bg-zinc-900 dark:bg-white"
                        : "bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700"
                    }`}
                  >
                    {mode.isDark ? (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill={active ? "white" : "#71717a"}>
                        <path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79z" />
                      </svg>
                    ) : (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill={active ? "#18181b" : "#71717a"}>
                        <circle cx="12" cy="12" r="5" />
                        <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" stroke={active ? "#18181b" : "#71717a"} strokeWidth="2" strokeLinecap="round" />
                      </svg>
                    )}
                    <span className={`text-sm font-semibold ${
                      active
                        ? "text-white dark:text-zinc-900"
                        : "text-zinc-400 dark:text-zinc-500"
                    }`}>
                      {mode.label}
                    </span>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        <div className="px-4 pb-3 grid grid-cols-5 gap-3 justify-items-center">
          {entries.map(([name, value]) => (
            <button
              key={value}
              onClick={() => {
                onSelect(value);
                onClose();
              }}
              className={`relative w-11 h-11 rounded-full transition-all hover:scale-110 ${
                current === value
                  ? "ring-2 ring-offset-2 ring-offset-white dark:ring-offset-zinc-900"
                  : ""
              }`}
              style={{
                backgroundColor: value,
                ...(current === value ? { ["--tw-ring-color" as string]: value } : {}),
              }}
            >
              {current === value && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
              )}
            </button>
          ))}
        </div>

        <div className="px-4 py-3 border-t border-zinc-100 dark:border-zinc-800">
          <button
            onClick={onClose}
            className="w-full py-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
