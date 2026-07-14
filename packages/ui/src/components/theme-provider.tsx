"use client"

import { ThemeProvider as NextThemesProvider, useTheme } from "next-themes"
import type { ComponentProps, ReactNode } from "react"

type ThemeProviderProps = ComponentProps<typeof NextThemesProvider> & {
  children: ReactNode
}

function ThemeProvider({
  children,
  attribute = "class",
  ...props
}: ThemeProviderProps) {
  return (
    <NextThemesProvider attribute={attribute} {...props}>
      {children}
    </NextThemesProvider>
  )
}

export { ThemeProvider, useTheme }
