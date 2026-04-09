# @m1k/ui

> Mobile-first app shell for side projects.
> Build apps that feel like native — in minutes.

```
┌─────────────────────┐
│ Header (sticky)     │
├─────────────────────┤
│                     │
│ Content (scroll)    │
│                     │
├─────────────────────┤
│ TabBar (sticky)     │
└─────────────────────┘
     rounded, shadow
     floating on color
```

## Install

```bash
npm install @m1k/ui
```

## Quick Start

```tsx
import {
  Watermark,
  AppShell,
  AppShellHeader,
  AppShellContent,
  TabBar,
  Tab,
  Section,
  SectionHeader,
  Divider,
  StatChip,
  EmptyState,
} from "@m1k/ui";

export default function App() {
  const [tab, setTab] = useState("home");

  return (
    <Watermark color="#3b82f6" text="myapp">
      <AppShell>
        <AppShellHeader>
          <span className="text-2xl font-black">myapp</span>
        </AppShellHeader>

        <AppShellContent>
          <Section>
            <h1 className="text-xl font-bold">Hello</h1>
          </Section>

          <Divider />

          <Section className="flex gap-3">
            <StatChip label="Today" value={42} />
            <StatChip label="Total" value={1234} />
          </Section>
        </AppShellContent>

        <TabBar>
          <Tab
            active={tab === "home"}
            onClick={() => setTab("home")}
            label="Home"
            icon={<span>🏠</span>}
          />
          <Tab
            active={tab === "profile"}
            onClick={() => setTab("profile")}
            label="Profile"
            icon={<span>👤</span>}
          />
        </TabBar>
      </AppShell>
    </Watermark>
  );
}
```

## Components

### Layout

| Component | Description |
|-----------|-------------|
| `Watermark` | Full-screen colored background with text pattern. The "floating app" look. |
| `AppShell` | Mobile app container (rounded, shadow, ring) |
| `AppShellHeader` | Sticky top header with blur backdrop |
| `AppShellContent` | Scrollable main content area |
| `TabBar` | Sticky bottom navigation |
| `Tab` | Individual tab button |

### Content

| Component | Description |
|-----------|-------------|
| `Section` | Padded content section (px-4) |
| `SectionHeader` | Small uppercase section title |
| `Divider` | Horizontal separator line |
| `StatChip` | Compact stat display (label + number) |
| `EmptyState` | Placeholder with icon and message |

## Props

### `Watermark`

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `color` | `string` | `#0f172a` | Background color |
| `text` | `string` | `m1k` | Watermark pattern text |
| `maxWidth` | `number` | `430` | Max width of content area |
| `padding` | `number` | `12` | Padding around the shell |

### `AppShell`

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `maxWidth` | `number` | `430` | Max width |
| `className` | `string` | | Additional classes |

### `Tab`

| Prop | Type | Description |
|------|------|-------------|
| `active` | `boolean` | Whether tab is selected |
| `onClick` | `() => void` | Click handler |
| `icon` | `ReactNode` | Tab icon |
| `label` | `string` | Tab label text |
| `activeColor` | `string?` | Color when active |

## Requirements

- React 18+
- Tailwind CSS 4+

## Philosophy

In the AI era, building a side project takes a day.
But making it *feel* like an app still takes effort.

`@m1k/ui` gives you the mobile app shell — header, scrollable content, bottom tabs, floating on a colored background — so you can focus on what matters: your idea.

Built and battle-tested in [m1k](https://m1k.app).

## License

MIT
