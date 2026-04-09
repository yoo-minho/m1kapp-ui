import { type ReactNode, useState, useEffect } from "react";
import { colors } from "./colors";

export interface ThemeButtonProps {
  color: string;
  onClick: () => void;
  className?: string;
}

/**
 * Small circular button showing the current theme color.
 * Designed for the AppShellHeader top-right slot.
 */
export function ThemeButton({ color, onClick, className = "" }: ThemeButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`w-7 h-7 rounded-full border-2 border-white dark:border-zinc-700 shadow-sm transition-transform hover:scale-110 ${className}`}
      style={{ backgroundColor: color }}
      title="Change theme"
    />
  );
}

export interface ThemeDialogProps {
  open: boolean;
  onClose: () => void;
  current: string;
  onSelect: (color: string) => void;
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
        className="relative z-10 w-full max-w-[406px] mb-3 mx-3 rounded-2xl bg-white dark:bg-zinc-900 shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-4 pt-4 pb-2">
          <p className="text-sm font-bold text-zinc-900 dark:text-white">Theme Color</p>
          <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-0.5">
            Change the Watermark background
          </p>
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
