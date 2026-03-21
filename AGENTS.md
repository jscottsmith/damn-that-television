# Agent / contributor notes

## Component-specific CSS

- **Start with Tailwind** for layout, spacing, typography, colors, and responsive behavior. Reach for utilities first.
- Use a **CSS Module** (`[component-name].module.css` colocated with the component) only when Tailwind is awkward or insufficient—e.g. shared custom properties scoped to a subtree, `calc()`/`env()` stacks that are clearer in CSS, animations, or other cases that need tighter control.
- **Do not** duplicate Tailwind utilities inside modules (e.g. `position`, `display`, spacing, typography). If Tailwind can express it, put it on `className` and reserve the module for what Tailwind cannot do cleanly.
- **Do not** put component-specific rules in `styles/globals.css`. Keep globals for app-wide concerns only (shared `:root` tokens, `html`/`body`, resets, imports).
- In modules, scope custom properties on a **layout wrapper class** (e.g. `.layout { --my-var: … }`) so descendants use `var(--my-var)` without polluting `:root`.
- When both apply, compose: `className={clsx(styles.scrollPad, 'relative z-10')}`.
