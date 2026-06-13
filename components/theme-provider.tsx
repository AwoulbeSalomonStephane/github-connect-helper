'use client'

import * as React from 'react'
import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { DEFAULT_THEME, THEME_IDS } from '@/lib/themes'

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme={DEFAULT_THEME}
      themes={[...THEME_IDS]}
      enableSystem={false}
      storageKey="vibecam-theme"
      disableTransitionOnChange
    >
      {children}
    </NextThemesProvider>
  )
}
