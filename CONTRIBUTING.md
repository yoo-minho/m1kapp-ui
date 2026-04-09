# Contributing to @m1kapp/ui

Thanks for your interest in contributing! Here's how to get started.

## Development Setup

```bash
git clone https://github.com/yoo-minho/m1kapp-ui.git
cd m1k-ui
npm install
npm run dev
```

## Project Structure

```
src/
  components/
    app-shell.tsx     # AppShell, AppShellHeader, AppShellContent
    tab-bar.tsx       # TabBar, Tab
    section.tsx       # Section, SectionHeader
    divider.tsx       # Divider
    stat-chip.tsx     # StatChip
    empty-state.tsx   # EmptyState
    watermark.tsx     # Watermark
  index.ts            # Public exports
```

## Guidelines

### Code Style
- TypeScript strict mode
- Functional components only
- All props should have JSDoc comments
- Export types alongside components

### Component Design Principles
1. **Props over context** — No internal state management. Pass everything as props.
2. **Tailwind only** — No CSS-in-JS, no CSS modules. Tailwind classes only.
3. **Composable** — Components should work together but also standalone.
4. **className pass-through** — Every component accepts `className` for customization.

### Adding a New Component
1. Create `src/components/your-component.tsx`
2. Export from `src/index.ts`
3. Add to README.md component table
4. Write JSDoc for the component and all props

### Commit Messages
```
feat: add Accordion component
fix: TabBar border radius on dark mode
docs: add Watermark examples
```

## Pull Requests

1. Fork the repo
2. Create a feature branch (`git checkout -b feat/my-feature`)
3. Make your changes
4. Run `npm run lint` to check types
5. Commit with a clear message
6. Open a PR with description of what and why

## Issues

- **Bug reports**: Include browser, OS, and minimal reproduction
- **Feature requests**: Describe the use case, not just the solution
- **Questions**: Use GitHub Discussions

## License

By contributing, you agree that your contributions will be licensed under the MIT License.
