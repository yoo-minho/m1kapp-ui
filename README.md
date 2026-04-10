# @m1kapp/ui

> Mobile-first app shell for side projects.
> Build apps that feel native — in minutes.

```
┌─────────────────────┐
│ Header (sticky)     │  ← AppShellHeader
├─────────────────────┤
│                     │
│ Content (scroll)    │  ← AppShellContent
│                     │
├─────────────────────┤
│ TabBar (sticky)     │  ← TabBar + Tab
└─────────────────────┘
   rounded · shadow · floating on color
          ↑
       Watermark (full-screen colored bg)
```

## Install

```bash
npm install @m1kapp/ui
```

**Requirements:** React 18+, Tailwind CSS 4+

Add the font (optional but recommended):

```html
<!-- index.html -->
<link rel="stylesheet" href="https://static.toss.im/dist/tps.css" />
```

```ts
// main.tsx
import { fontFamily } from "@m1kapp/ui";
document.body.style.fontFamily = fontFamily.toss;
```

---

## Quick Start

```tsx
import { useState } from "react";
import {
  Watermark, AppShell, AppShellHeader, AppShellContent,
  TabBar, Tab, Section, StatChip, ThemeButton, ThemeDialog,
  colors,
} from "@m1kapp/ui";

export default function App() {
  const [tab, setTab] = useState("home");
  const [themeColor, setThemeColor] = useState(colors.blue);
  const [themeOpen, setThemeOpen] = useState(false);
  const [dark, setDark] = useState(false);

  return (
    <>
      <Watermark color={themeColor} text="myapp">
        <AppShell>
          <AppShellHeader>
            <span className="text-xl font-black">myapp</span>
            <ThemeButton
              color={themeColor}
              dark={dark}
              onClick={() => setThemeOpen(true)}
            />
          </AppShellHeader>

          <AppShellContent>
            <Section>
              <StatChip label="Users" value={128} />
            </Section>
          </AppShellContent>

          <TabBar>
            <Tab
              active={tab === "home"}
              onClick={() => setTab("home")}
              label="Home"
              activeColor={themeColor}
              icon={<HomeIcon />}
            />
          </TabBar>
        </AppShell>
      </Watermark>

      <ThemeDialog
        open={themeOpen}
        onClose={() => setThemeOpen(false)}
        current={themeColor}
        onSelect={setThemeColor}
        dark={dark}
        onDarkToggle={() => {
          setDark((v) => !v);
          document.documentElement.classList.toggle("dark");
        }}
      />
    </>
  );
}
```

---

## Components

### `Watermark`

Full-screen colored background with a repeating text pattern. The "floating app" aesthetic.

```tsx
<Watermark
  color="#3b82f6"       // background color
  text="myapp"          // repeating watermark text
  speed={20}            // animation speed in seconds. 0 = static
  sponsor={{ name: "@m1kapp/ui", url: "https://github.com/m1kapp/ui" }}
>
  <AppShell>...</AppShell>
</Watermark>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `color` | `string` | `#0f172a` | Background color |
| `text` | `string` | `"m1k"` | Watermark pattern text |
| `maxWidth` | `number` | `430` | Max width of content area |
| `padding` | `number` | `12` | Padding around the shell (px) |
| `speed` | `number` | `20` | Drift animation speed (s). `0` = no animation |
| `sponsor` | `WatermarkSponsor` | — | 1k milestone sponsor — name shown interleaved with watermark text; entire bg becomes a link |

```ts
interface WatermarkSponsor {
  name: string; // shown in background
  url: string;  // entire background becomes a clickable link
}
```

---

### `AppShell`

Mobile app container — rounded corners, drop shadow, ring. Centers within `Watermark`.

```tsx
<AppShell maxWidth={430}>
  <AppShellHeader>...</AppShellHeader>
  <AppShellContent>...</AppShellContent>
  <TabBar>...</TabBar>
</AppShell>
```

| Prop | Type | Default |
|------|------|---------|
| `maxWidth` | `number` | `430` |
| `className` | `string` | — |
| `style` | `CSSProperties` | — |

---

### `AppShellHeader`

Sticky top bar (h-14) with blur backdrop.

```tsx
<AppShellHeader>
  <span className="font-black">myapp</span>
  <ThemeButton color={themeColor} dark={dark} onClick={...} />
</AppShellHeader>
```

---

### `AppShellContent`

Scrollable area between header and tab bar.

```tsx
<AppShellContent>
  <Section>...</Section>
  <Divider />
  <Section>...</Section>
</AppShellContent>
```

---

### `TabBar` + `Tab`

Sticky bottom nav (h-16) with active color support.

```tsx
<TabBar>
  <Tab
    active={tab === "home"}
    onClick={() => setTab("home")}
    label="Home"
    icon={<HomeIcon />}
    activeColor={themeColor}   // optional, defaults to current text color
  />
</TabBar>
```

| Prop | Type | Description |
|------|------|-------------|
| `active` | `boolean` | Selected state |
| `onClick` | `() => void` | — |
| `icon` | `ReactNode` | Icon element |
| `label` | `string` | Label below icon |
| `activeColor` | `string?` | Color when active |

---

### `ThemeButton`

Single circular button split diagonally — half light/dark indicator, half theme color dot. Put it in the header.

```tsx
<ThemeButton
  color={themeColor}   // theme color (bottom-right half)
  dark={dark}          // light mode = white half, dark mode = black half
  onClick={() => setThemeOpen(true)}
/>
```

---

### `ThemeDialog`

Bottom-sheet color picker + dark/light mode toggle.

```tsx
<ThemeDialog
  open={themeOpen}
  onClose={() => setThemeOpen(false)}
  current={themeColor}
  onSelect={(color) => setThemeColor(color)}
  dark={dark}
  onDarkToggle={() => {
    setDark((v) => !v);
    document.documentElement.classList.toggle("dark");
  }}
/>
```

| Prop | Type | Description |
|------|------|-------------|
| `open` | `boolean` | Show/hide |
| `onClose` | `() => void` | Called on backdrop click or Escape |
| `current` | `string` | Currently selected color |
| `onSelect` | `(color: string) => void` | Called when a color is picked (closes dialog) |
| `dark` | `boolean?` | Current dark mode state |
| `onDarkToggle` | `() => void?` | Called when light/dark is toggled |
| `palette` | `Record<string, string>?` | Override color palette (default: built-in `colors`) |

---

### `Section` + `SectionHeader`

```tsx
<Section className="pt-5">
  <SectionHeader>Stats</SectionHeader>
  <p>Content with px-4 padding applied.</p>
</Section>
```

---

### `Divider`

```tsx
<Divider />
```

---

### `StatChip`

Compact label + number display.

```tsx
<div className="flex gap-3">
  <StatChip label="Users" value={1024} />
  <StatChip label="Revenue" value={9800} />
</div>
```

---

### `EmptyState`

```tsx
<EmptyState message="Nothing here yet" />

// Custom icon:
<EmptyState message="No results" icon={<SearchIcon />} />
```

---

### `Typewriter`

Human-like typing effect with a blinking cursor.

```tsx
<Typewriter
  words={["side project", "weekend build", "바이브코딩"]}
  color={themeColor}
  speed={80}        // ms per character
  pause={2000}      // ms between words
/>
```

---

### `colors`

Curated palette. Use with `Watermark`, `Tab`, and `ThemeDialog`.

```ts
import { colors } from "@m1kapp/ui";

colors.blue    // #3b82f6
colors.purple  // #8b5cf6
colors.green   // #10b981
colors.orange  // #f97316
colors.pink    // #ec4899
colors.red     // #ef4444
colors.yellow  // #eab308
colors.cyan    // #06b6d4
colors.slate   // #0f172a
colors.zinc    // #27272a
```

---

### `fonts` + `fontFamily`

CDN font references — no files bundled.

```ts
import { fonts, fontFamily } from "@m1kapp/ui";

// In HTML:
// <link rel="stylesheet" href={fonts.toss} />

// In JS:
document.body.style.fontFamily = fontFamily.toss;

// Available:
fonts.toss        // Toss Product Sans
fonts.pretendard  // Pretendard Variable
fonts.inter       // Inter
```

---

## Dark Mode

Uses Tailwind's class-based dark mode. Add this to your CSS:

```css
/* index.css */
@custom-variant dark (&:where(.dark, .dark *));
```

Then toggle with:

```ts
document.documentElement.classList.toggle("dark", isDark);
```

---

## Philosophy

In the AI era, a side project takes a day to build.  
But making it *feel* like an app still takes effort.

`@m1kapp/ui` gives you the shell — header, scrollable content, bottom tabs, floating on a colored background — so you can focus on the idea.

Built and battle-tested at [m1k.app](https://m1k.app).

## License

MIT
