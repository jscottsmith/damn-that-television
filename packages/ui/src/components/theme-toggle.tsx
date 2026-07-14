"use client"

import { useTheme } from "@workspace/ui/components/theme-provider"
import {
  ComputerDesktopIcon,
  MoonIcon,
  SunIcon,
} from "@heroicons/react/24/outline"

import { Button } from "@workspace/ui/components/button"
import { useHasMounted } from "@workspace/ui/hooks/use-has-mounted"

const THEMES = ["light", "system", "dark"] as const

type ThemeName = (typeof THEMES)[number]

const THEME_ICONS = {
  light: SunIcon,
  system: ComputerDesktopIcon,
  dark: MoonIcon,
} as const

function nextTheme(current: string | undefined): ThemeName {
  const index = THEMES.indexOf(current as ThemeName)
  return THEMES[index === -1 ? 0 : (index + 1) % THEMES.length]
}

function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const mounted = useHasMounted()
  const activeTheme: ThemeName =
    mounted && theme && THEMES.includes(theme as ThemeName)
      ? (theme as ThemeName)
      : "system"
  const Icon = THEME_ICONS[activeTheme]

  return (
    <Button
      presentation="icon"
      size="sm"
      variant="secondary"
      aria-label={`Theme: ${activeTheme}. Click to switch.`}
      onClick={() => setTheme(nextTheme(theme))}
    >
      <Icon />
    </Button>
  )
}

export { ThemeToggle }
