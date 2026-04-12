import { useState, useEffect } from "react";
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
  colors,
  ThemeButton,
  ThemeDialog,
  EmojiButton,
  EmojiPicker,
  Tooltip,
  Typewriter,
  GrassMap,
  fontFamily,
} from "@m1kapp/ui";

const THEMES = Object.entries(colors).map(([name, color]) => ({ name, color }));

function makeGrassData() {
  const data: { date: string; count: number }[] = [];
  const today = new Date();
  for (let i = 364; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
    const roll = Math.random();
    data.push({ date: key, count: roll > 0.55 ? Math.floor(Math.random() * 80) + 1 : 0 });
  }
  return data;
}
const GRASS_DATA = makeGrassData();


const CODE_SNIPPET = `import {
  Watermark, AppShell,
  AppShellHeader, AppShellContent,
  TabBar, Tab, Section, StatChip
} from "@m1kapp/ui";

export default function App() {
  const [tab, setTab] = useState("home");

  return (
    <Watermark color="#3b82f6" text="myapp">
      <AppShell>
        <AppShellHeader>
          <span>myapp</span>
        </AppShellHeader>
        <AppShellContent>
          <Section>
            <StatChip label="Users" value={42} />
          </Section>
        </AppShellContent>
        <TabBar>
          <Tab
            active={tab === "home"}
            onClick={() => setTab("home")}
            label="Home"
            icon={<HomeIcon />}
          />
        </TabBar>
      </AppShell>
    </Watermark>
  );
}`;

/* ── Tab: Home ── */
function HomeTab({ themeColor }: { themeColor: string }) {
  return (
    <>
      <Section className="pt-5">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-black text-zinc-900 dark:text-white tracking-tight">
            @m1kapp/ui
          </h1>
          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-500">
            v0.1.16
          </span>
        </div>
        <p className="text-lg mt-3 min-h-7">
          <Typewriter
            words={[
              "바이브코딩으로 만든 앱",
              "주말에 만든 토이 프로젝트",
              "해커톤에서 만든 서비스",
              "your side project",
            ]}
            color={themeColor}
          />
        </p>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-2 leading-relaxed">
          사이드 프로젝트를 위한 모바일 앱 셸.
          <br />
          몇 분 만에 네이티브처럼 느껴지는 앱을 만드세요.
        </p>
      </Section>

      <Section className="mt-4">
        <div className="flex gap-2">
          <a
            href="https://github.com/m1kapp/ui"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 py-2.5 rounded-xl bg-zinc-900 dark:bg-zinc-800 text-center text-sm font-semibold text-white transition-colors hover:bg-zinc-800 dark:hover:bg-zinc-700 ring-1 ring-white/10"
          >
            GitHub
          </a>
          <button
            onClick={() => navigator.clipboard.writeText("npm install @m1kapp/ui")}
            className="flex-1 py-2.5 rounded-xl text-center text-sm font-medium font-mono text-zinc-600 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-900 transition-colors hover:bg-zinc-200 dark:hover:bg-zinc-800 ring-1 ring-zinc-200 dark:ring-white/10"
          >
            npm i @m1kapp/ui
          </button>
        </div>
      </Section>

      <Divider />

      <Section>
        <SectionHeader>이 페이지가 데모예요</SectionHeader>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
          지금 보이는 헤더, 탭, 섹션, 통계 칩 — 전부{" "}
          <strong className="text-zinc-700 dark:text-zinc-200">@m1kapp/ui</strong> 컴포넌트로 만들었어요.
          탭을 눌러서 둘러보세요.
        </p>
      </Section>

      <Divider />

      <Section>
        <SectionHeader>한눈에 보기</SectionHeader>
        <div className="flex gap-3">
          <StatChip label="컴포넌트" value={15} />
          <StatChip label="KB (gzip)" value={2} />
          <StatChip label="의존성" value={0} />
        </div>
      </Section>

      <Divider />

      <Section>
        <SectionHeader>요구사항</SectionHeader>
        <div className="space-y-2">
          {["React 18+", "Tailwind CSS 4+"].map((r) => (
            <div
              key={r}
              className="flex items-center gap-3 p-3 rounded-xl bg-zinc-50 dark:bg-zinc-900"
            >
              <div className="w-7 h-7 rounded-lg bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-zinc-500">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">{r}</span>
            </div>
          ))}
        </div>
      </Section>

      <Divider />

      <Section>
        <SectionHeader>도움주신분들</SectionHeader>
        <EmojiPlayground />
      </Section>

      <div className="pb-6" />
    </>
  );
}

/* ── Emoji Playground ── */
const PLAYGROUND_EMOJIS = [
  { em: "🦙", name: "A로 시작하는 Alpaca" },
  { em: "🐻", name: "B로 시작하는 Bear" },
  { em: "🐈", name: "C로 시작하는 Cat" },
  { em: "🐬", name: "D로 시작하는 Dolphin" },
  { em: "🦅", name: "E로 시작하는 Eagle" },
  { em: "🦊", name: "F로 시작하는 Fox" },
  { em: "🦍", name: "G로 시작하는 Gorilla" },
  { em: "🦛", name: "H로 시작하는 Hippo" },
  { em: "🦎", name: "I로 시작하는 Iguana" },
  { em: "🐆", name: "J로 시작하는 Jaguar" },
  { em: "🦘", name: "K로 시작하는 Kangaroo" },
  { em: "🦁", name: "L로 시작하는 Lion" },
  { em: "🐒", name: "M로 시작하는 Monkey" },
  { em: "🦭", name: "N로 시작하는 Narwhal" },
];

function EmojiPlayground() {
  return (
    <div className="flex flex-wrap gap-2">
      {PLAYGROUND_EMOJIS.map(({ em, name }) => (
        <Tooltip key={em} label={name}>
          <div className="w-10 h-10 rounded-full bg-zinc-100 dark:bg-zinc-800 border-2 border-white dark:border-zinc-900 flex items-center justify-center text-xl cursor-pointer hover:scale-110 transition-transform shadow-sm -ml-1 first:ml-0">
            {em}
          </div>
        </Tooltip>
      ))}
    </div>
  );
}

/* ── Preview + Code card ── */
function ComponentCard({ name, desc, code, children }: {
  name: string;
  desc: string;
  code: string;
  children: React.ReactNode;
}) {
  const [showCode, setShowCode] = useState(false);

  return (
    <div className="rounded-xl bg-zinc-50 dark:bg-zinc-900 overflow-hidden">
      {/* Header */}
      <div className="px-3 pt-3 pb-2">
        <p className="text-sm font-semibold text-zinc-800 dark:text-zinc-200 font-mono">
          {"<"}{name}{" />"}
        </p>
        <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">{desc}</p>
      </div>

      {/* Preview */}
      <div className="px-3 py-3 border-t border-zinc-200 dark:border-zinc-800">
        {children}
      </div>

      {/* Toggle */}
      <button
        onClick={() => setShowCode(!showCode)}
        className="w-full px-3 py-2 text-[10px] font-medium text-zinc-400 dark:text-zinc-500 border-t border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors text-left"
      >
        {showCode ? "코드 숨기기" : "코드 보기"}
      </button>

      {/* Code */}
      {showCode && (
        <pre className="px-3 py-3 border-t border-zinc-200 dark:border-zinc-800 text-[11px] text-zinc-500 dark:text-zinc-400 overflow-x-auto leading-relaxed bg-zinc-100 dark:bg-zinc-950">
          <code>{code}</code>
        </pre>
      )}
    </div>
  );
}

function EmojiPickerDemo() {
  const [open, setOpen] = useState(false);
  const [emoji, setEmoji] = useState("🏠");
  return (
    <>
      <div className="flex items-center justify-between">
        <span className="text-xs text-zinc-500">Tap the button →</span>
        <EmojiButton emoji={emoji} onClick={() => setOpen(true)} />
      </div>
      <EmojiPicker
        open={open}
        onClose={() => setOpen(false)}
        current={emoji}
        onSelect={setEmoji}
      />
    </>
  );
}

/* ── Tab: Components ── */
function ComponentsTab({ themeColor, dark, onThemeSelect }: { themeColor: string; dark: boolean; onThemeSelect: (color: string) => void }) {
  const [demoTab, setDemoTab] = useState("home");

  return (
    <>
      <Section className="pt-5">
        <SectionHeader>레이아웃</SectionHeader>
        <div className="space-y-3">
          <ComponentCard
            name="Watermark"
            desc="Full-screen colored background with repeating text pattern"
            code={`<Watermark color="${themeColor}" text="myapp">\n  {children}\n</Watermark>`}
          >
            <div
              className="h-24 rounded-lg relative overflow-hidden"
              style={{ backgroundColor: themeColor }}
            >
              <div
                className="absolute inset-0 pointer-events-none select-none opacity-15"
                style={{
                  backgroundImage: `url("data:image/svg+xml,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="120" height="60"><text x="5" y="25" font-family="system-ui" font-size="22" font-weight="900" fill="white">m1k</text></svg>')}")`,
                  backgroundRepeat: "repeat",
                  transform: "rotate(-12deg) scale(1.5)",
                }}
              />
              <div className="relative z-10 h-full flex items-center justify-center">
                <div className="bg-white dark:bg-zinc-900 rounded-lg px-6 py-3 shadow-lg text-xs font-medium text-zinc-500">
                  your app here
                </div>
              </div>
            </div>
          </ComponentCard>

          <ComponentCard
            name="AppShell"
            desc="Mobile app container with rounded corners, shadow, and ring"
            code={`<AppShell maxWidth={430}>\n  <AppShellHeader>...</AppShellHeader>\n  <AppShellContent>...</AppShellContent>\n  <TabBar>...</TabBar>\n</AppShell>`}
          >
            <div className="h-32">
              <AppShell>
                <AppShellHeader>
                  <span className="text-xs font-bold text-zinc-900 dark:text-white">myapp</span>
                  <span className="text-[10px] text-zinc-400">header</span>
                </AppShellHeader>
                <AppShellContent>
                  <div className="flex items-center justify-center h-full text-xs text-zinc-400 py-2">
                    content
                  </div>
                </AppShellContent>
                <TabBar>
                  <Tab active onClick={() => {}} label="Home" activeColor={themeColor} icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>} />
                  <Tab active={false} onClick={() => {}} label="More" activeColor={themeColor} icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="1" /><circle cx="19" cy="12" r="1" /><circle cx="5" cy="12" r="1" /></svg>} />
                </TabBar>
              </AppShell>
            </div>
          </ComponentCard>

          <ComponentCard
            name="AppShellHeader"
            desc="Sticky top header with blur backdrop"
            code={`<AppShellHeader>\n  <span className="font-bold">myapp</span>\n  <ThemeButton color={color} onClick={...} />\n</AppShellHeader>`}
          >
            <div className="h-14 rounded-2xl overflow-hidden">
              <AppShellHeader>
                <span className="text-sm font-bold text-zinc-900 dark:text-white">myapp</span>
                <ThemeButton color={themeColor} dark={dark} onClick={() => {}} />
              </AppShellHeader>
            </div>
          </ComponentCard>

          <ComponentCard
            name="TabBar + Tab"
            desc="Sticky bottom navigation with active state"
            code={`<TabBar>\n  <Tab\n    active={tab === "home"}\n    onClick={() => setTab("home")}\n    label="Home"\n    icon={<HomeIcon />}\n    activeColor="${themeColor}"\n  />\n</TabBar>`}
          >
            <div className="rounded-lg overflow-hidden border border-zinc-200 dark:border-zinc-800">
              <TabBar>
                {[
                  { key: "home", label: "Home", icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg> },
                  { key: "search", label: "Search", icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg> },
                  { key: "profile", label: "Profile", icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg> },
                ].map((t) => (
                  <Tab
                    key={t.key}
                    active={demoTab === t.key || (demoTab === "home" && t.key === "home")}
                    onClick={() => setDemoTab(t.key)}
                    label={t.label}
                    icon={t.icon}
                    activeColor={themeColor}
                  />
                ))}
              </TabBar>
            </div>
          </ComponentCard>
        </div>
      </Section>

      <Divider />

      <Section>
        <SectionHeader>콘텐츠</SectionHeader>
        <div className="space-y-3">
          <ComponentCard
            name="Section + SectionHeader"
            desc="Padded wrapper with small uppercase title"
            code={`<Section>\n  <SectionHeader>My Section</SectionHeader>\n  <p>Content here</p>\n</Section>`}
          >
            <div className="rounded-lg bg-white dark:bg-zinc-950 p-3">
              <p className="text-[11px] font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider mb-2">
                Section Title
              </p>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                Content goes here with px-4 padding
              </p>
            </div>
          </ComponentCard>

          <ComponentCard
            name="StatChip"
            desc="Compact stat display with label and number"
            code={`<div className="flex gap-3">\n  <StatChip label="Users" value={128} />\n  <StatChip label="Revenue" value={4200} />\n</div>`}
          >
            <div className="flex gap-3">
              <StatChip label="Users" value={128} />
              <StatChip label="Revenue" value={4200} />
            </div>
          </ComponentCard>

          <ComponentCard
            name="Divider"
            desc="Horizontal separator line with margin"
            code={`<Divider />`}
          >
            <div className="rounded-lg bg-white dark:bg-zinc-950 py-3">
              <p className="text-xs text-zinc-400 text-center mb-1">above</p>
              <Divider />
              <p className="text-xs text-zinc-400 text-center mt-1">below</p>
            </div>
          </ComponentCard>

          <ComponentCard
            name="EmptyState"
            desc="Placeholder with icon and message"
            code={`<EmptyState message="No items yet" />\n\n// Custom icon:\n<EmptyState\n  message="No results"\n  icon={<SearchIcon />}\n/>`}
          >
            <EmptyState message="Nothing here yet" />
          </ComponentCard>

          <ComponentCard
            name="GrassMap"
            desc="GitHub-style activity heatmap with year filter and tooltip"
            code={`<GrassMap\n  data={[{ date: "2025-01-01", count: 42 }, ...]}\n  accent="${themeColor}"\n  isDark={dark}\n  unit="명"\n/>`}
          >
            <GrassMap data={GRASS_DATA} accent={themeColor} isDark={dark} />
          </ComponentCard>

          <ComponentCard
            name="Typewriter"
            desc="Human-like typing effect with blinking cursor"
            code={`<Typewriter\n  words={["Hello", "World", "Side Project"]}\n  color="#3b82f6"\n  speed={80}\n/>`}
          >
            <p className="text-lg font-bold">
              <Typewriter
                words={["Build fast", "Ship faster", "Side project"]}
                color="#3b82f6"
              />
            </p>
          </ComponentCard>
        </div>
      </Section>

      <Divider />

      <Section>
        <SectionHeader>유틸리티</SectionHeader>
        <div className="space-y-3">
          <ComponentCard
            name="colors"
            desc="Curated color palette for Watermark and Tab"
            code={`import { colors } from "@m1kapp/ui";\n\n<Watermark color={colors.blue} />\n<Tab activeColor={colors.pink} />\n\n// All colors:\n// blue, purple, green, orange, pink,\n// red, yellow, cyan, slate, zinc`}
          >
            <div className="grid grid-cols-5 gap-3 justify-items-center">
              {THEMES.map((t) => (
                <div key={t.color} className="flex flex-col items-center gap-1.5">
                  <button
                    className="relative w-11 h-11 rounded-full transition-all hover:scale-110 active:scale-95"
                    onClick={() => onThemeSelect(t.color)}
                    style={{
                      backgroundColor: t.color,
                      boxShadow: themeColor === t.color
                        ? `0 0 0 2px #fff, 0 0 0 4px ${t.color}`
                        : `0 0 0 1.5px rgba(255,255,255,0.5), 0 2px 8px rgba(255,255,255,0.2)`,
                    }}
                  >
                    {themeColor === t.color && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </div>
                    )}
                  </button>
                  <span className="text-[9px] text-zinc-400 capitalize">{t.name}</span>
                </div>
              ))}
            </div>
          </ComponentCard>

          <ComponentCard
            name="ThemeButton + ThemeDialog"
            desc="Header color button with bottom-sheet picker"
            code={`import { ThemeButton, ThemeDialog, colors } from "@m1kapp/ui";\n\nconst [open, setOpen] = useState(false);\nconst [color, setColor] = useState(colors.blue);\n\n<AppShellHeader>\n  <span>myapp</span>\n  <ThemeButton\n    color={color}\n    onClick={() => setOpen(true)}\n  />\n</AppShellHeader>\n\n<ThemeDialog\n  open={open}\n  onClose={() => setOpen(false)}\n  current={color}\n  onSelect={setColor}\n/>`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs text-zinc-500">Tap the button →</span>
              <ThemeButton color={themeColor} dark={dark} onClick={() => {}} />
            </div>
          </ComponentCard>

          <ComponentCard
            name="EmojiButton + EmojiPicker"
            desc="이모지 선택 버튼 + 카테고리별 바텀시트 피커"
            code={`import { EmojiButton, EmojiPicker } from "@m1kapp/ui";\n\nconst [open, setOpen] = useState(false);\nconst [emoji, setEmoji] = useState("🏠");\n\n<EmojiButton emoji={emoji} onClick={() => setOpen(true)} />\n\n<EmojiPicker\n  open={open}\n  onClose={() => setOpen(false)}\n  current={emoji}\n  onSelect={setEmoji}\n/>`}
          >
            <EmojiPickerDemo />
          </ComponentCard>

          <ComponentCard
            name="fonts + fontFamily"
            desc="Font presets with CDN links (no files bundled)"
            code={`import { fonts, fontFamily } from "@m1kapp/ui";\n\n// index.html:\n<link rel="stylesheet" href={fonts.tossface} />\n<link rel="stylesheet" href={fonts.pretendard} />\n\n// global CSS:\nhtml {\n  font-family: ${fontFamily.default.replace(/"/g, "'")}\n}`}
          >
            <div className="space-y-2">
              {(["tossface", "pretendard", "inter"] as const).map((f) => (
                <div key={f} className="flex items-center justify-between p-2 rounded-lg bg-white dark:bg-zinc-950">
                  <span className="text-sm font-semibold text-zinc-700 dark:text-zinc-300 capitalize">{f}</span>
                  <span className="text-[10px] text-zinc-400 font-mono">fonts.{f}</span>
                </div>
              ))}
            </div>
          </ComponentCard>
        </div>
      </Section>

      <div className="pb-6" />
    </>
  );
}

/* ── Tab: Code ── */
function CodeTab() {
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    navigator.clipboard.writeText(CODE_SNIPPET);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <>
      <Section className="pt-5">
        <SectionHeader>설치</SectionHeader>
        <div
          className="flex items-center justify-between p-3 rounded-xl bg-zinc-50 dark:bg-zinc-900 cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          onClick={() => navigator.clipboard.writeText("npm install @m1kapp/ui")}
        >
          <code className="text-sm font-mono text-zinc-700 dark:text-zinc-300">
            npm install @m1kapp/ui
          </code>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-zinc-400">
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
          </svg>
        </div>
      </Section>

      <Divider />

      <Section>
        <div className="flex items-center justify-between mb-3">
          <SectionHeader>빠른 시작</SectionHeader>
          <button
            onClick={handleCopy}
            className="text-xs text-zinc-400 hover:text-zinc-200 transition-colors"
          >
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>
        <pre className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-900 text-xs text-zinc-600 dark:text-zinc-400 overflow-x-auto leading-relaxed">
          <code>{CODE_SNIPPET}</code>
        </pre>
      </Section>

      <Divider />

      <Section className="pb-6">
        <SectionHeader>링크</SectionHeader>
        <div className="space-y-2">
          {[
            { label: "GitHub Repository", url: "https://github.com/m1kapp/ui" },
            { label: "npm Package", url: "https://www.npmjs.com/package/@m1kapp/ui" },
            { label: "m1k.app", url: "https://m1k.app" },
          ].map((link) => (
            <a
              key={link.label}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-3 rounded-xl bg-zinc-50 dark:bg-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors group"
            >
              <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                {link.label}
              </span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-zinc-300 dark:text-zinc-600 group-hover:text-zinc-500 transition-colors">
                <line x1="7" y1="17" x2="17" y2="7" />
                <polyline points="7 7 17 7 17 17" />
              </svg>
            </a>
          ))}
        </div>
      </Section>
    </>
  );
}

/* ── Main App ── */
export default function App() {
  const [tab, setTab] = useState("home");
  const [themeColor, setThemeColor] = useState<string>(colors.blue);
  const [themeOpen, setThemeOpen] = useState(false);
  const [dark, setDark] = useState(() =>
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
  );

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  return (
    <>
      <Watermark color={themeColor} text="m1k" sponsor={{ name: "@m1kapp/ui", url: "https://github.com/m1kapp/ui" }}>
        <AppShell>
          <AppShellHeader>
            <span className="text-lg font-black text-zinc-900 dark:text-white tracking-tight">
              @m1kapp/ui
            </span>
            <ThemeButton color={themeColor} dark={dark} onClick={() => setThemeOpen(true)} />
          </AppShellHeader>

          <AppShellContent>
            {tab === "home" && <HomeTab themeColor={themeColor} />}
            {tab === "components" && <ComponentsTab themeColor={themeColor} dark={dark} onThemeSelect={setThemeColor} />}
            {tab === "code" && <CodeTab />}
          </AppShellContent>

          <TabBar>
            <Tab
              active={tab === "home"}
              onClick={() => setTab("home")}
              label="홈"
              activeColor={themeColor}
              icon={
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                  <polyline points="9 22 9 12 15 12 15 22" />
                </svg>
              }
            />
            <Tab
              active={tab === "components"}
              onClick={() => setTab("components")}
              label="컴포넌트"
              activeColor={themeColor}
              icon={
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="7" height="7" />
                  <rect x="14" y="3" width="7" height="7" />
                  <rect x="3" y="14" width="7" height="7" />
                  <rect x="14" y="14" width="7" height="7" />
                </svg>
              }
            />
            <Tab
              active={tab === "code"}
              onClick={() => setTab("code")}
              label="코드"
              activeColor={themeColor}
              icon={
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="16 18 22 12 16 6" />
                  <polyline points="8 6 2 12 8 18" />
                </svg>
              }
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
        onDarkToggle={() => setDark((v) => !v)}
      />
    </>
  );
}
