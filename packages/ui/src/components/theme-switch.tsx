"use client"

import { useTheme } from "@workspace/ui/components/theme-provider"
import {
  ComputerDesktopIcon,
  MoonIcon,
  SunIcon,
} from "@heroicons/react/24/outline"

import { ButtonGroup } from "@workspace/ui/components/button-group"
import { Button } from "@workspace/ui/components/button"
import { useHasMounted } from "@workspace/ui/hooks/use-has-mounted"

function ThemeSwitch() {
  const theme = useTheme()
  const mounted = useHasMounted()

  return (
    <ButtonGroup>
      <Button
        presentation="icon"
        size="sm"
        variant={mounted && theme.theme === "light" ? "primary" : "secondary"}
        onClick={() => theme.setTheme("light")}
      >
        <SunIcon />
      </Button>
      <Button
        presentation="icon"
        size="sm"
        variant={mounted && theme.theme === "system" ? "primary" : "secondary"}
        onClick={() => theme.setTheme("system")}
      >
        <ComputerDesktopIcon />
      </Button>
      <Button
        presentation="icon"
        size="sm"
        variant={mounted && theme.theme === "dark" ? "primary" : "secondary"}
        onClick={() => theme.setTheme("dark")}
      >
        <MoonIcon />
      </Button>
    </ButtonGroup>
  )
}

export { ThemeSwitch }
