import { type ReactNode, type CSSProperties } from "react";

export interface AppShellProps {
  children: ReactNode;
  className?: string;
  /** Max width of the shell. Default: 430px */
  maxWidth?: number;
  style?: CSSProperties;
}

/**
 * Mobile app-like container with rounded corners, shadow, and ring.
 * Centers content and constrains width for a phone-like viewport.
 */
export function AppShell({
  children,
  className = "",
  maxWidth = 430,
  style,
}: AppShellProps) {
  return (
    <div
      className={`w-full h-full flex flex-col bg-white dark:bg-zinc-950 shadow-2xl ring-1 ring-black/5 dark:ring-white/10 rounded-2xl overflow-hidden ${className}`}
      style={{ maxWidth, ...style }}
    >
      {children}
    </div>
  );
}

export interface AppShellHeaderProps {
  children: ReactNode;
  className?: string;
}

/**
 * Sticky top header with blur backdrop.
 */
export function AppShellHeader({ children, className = "" }: AppShellHeaderProps) {
  return (
    <header
      className={`sticky top-0 z-20 px-4 py-3 flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800 bg-white/90 dark:bg-zinc-950/90 backdrop-blur-md rounded-t-2xl ${className}`}
    >
      {children}
    </header>
  );
}

export interface AppShellContentProps {
  children: ReactNode;
  className?: string;
}

/**
 * Scrollable main content area.
 */
export function AppShellContent({ children, className = "" }: AppShellContentProps) {
  return (
    <div className={`flex-1 overflow-y-auto ${className}`}>
      {children}
    </div>
  );
}
