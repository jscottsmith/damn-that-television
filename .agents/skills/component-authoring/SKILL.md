---
name: component-authoring
description: Conventions for creating and refactoring UI components in this repo, including state styling via data attributes, variant ownership, and composition-first APIs.
user-invocable: true
---

# Component authoring

Use this skill whenever creating or refactoring UI components in this repository.

## Rules

1. Use **data attributes for UI state** (`data-selected`, `data-open`, `data-active`, `data-disabled`, `data-state`) on the interactive element.
2. Style state with Tailwind selectors (`data-[selected=true]:...`, `data-[state=open]:...`) instead of relying on `!important`.
3. Treat `!important` as fallback-only; if needed, document why structural alternatives were not viable.
4. Put shared visual behavior in base primitives and their variant systems (`buttonVariants`, etc.), not in wrapper-only overrides.
5. Keep wrappers thin: behavior defaults, composition, and slots only.
6. Prefer composition-first APIs for icons (`children` with icon nodes) over dedicated icon props unless strict ergonomics demand otherwise.
7. Always **named-import** React APIs (`useState`, `useEffect`, `type ReactNode`, etc.). Do not call them off a `React` namespace (`React.useState`). Prefer `import type` for type-only symbols.

## PR checklist

- [ ] Stateful styles are driven by data attributes.
- [ ] No unnecessary `!important`.
- [ ] Variant responsibilities are in base primitives.
- [ ] Wrapper components stay minimal.
- [ ] Component API supports composition and remains backward-compatible where required.
- [ ] React APIs are named-imported, not accessed via `React.*`.
