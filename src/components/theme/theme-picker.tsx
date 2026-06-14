

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { Palette, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { LIGHT_THEMES, DARK_THEMES, type ThemeId, DEFAULT_THEME } from '@/lib/themes'
import { cn } from '@/lib/utils'

function ThemeGrid({
  themes,
  active,
  onSelect,
}: {
  themes: typeof LIGHT_THEMES | typeof DARK_THEMES
  active: string
  onSelect: (id: ThemeId) => void
}) {
  return (
    <div className="grid grid-cols-2 gap-2">
      {themes.map((theme) => (
        <button
          key={theme.id}
          type="button"
          onClick={() => onSelect(theme.id)}
          className={cn(
            'relative flex flex-col items-start gap-2 rounded-xl border p-3 text-left transition-colors hover:border-primary/50',
            active === theme.id ? 'border-primary bg-primary/5' : 'border-border',
          )}
        >
          <div className="flex gap-1 w-full">
            <span
              className="h-6 flex-1 rounded-md border border-border/50"
              style={{ background: theme.swatch[1] }}
            />
            <span
              className="h-6 w-6 rounded-md border border-border/50 shrink-0"
              style={{ background: theme.swatch[0] }}
            />
          </div>
          <div>
            <p className="text-sm font-medium">{theme.label}</p>
            <p className="text-[10px] text-muted-foreground line-clamp-2">{theme.description}</p>
          </div>
          {active === theme.id && (
            <Check className="absolute top-2 right-2 h-4 w-4 text-primary" />
          )}
        </button>
      ))}
    </div>
  )
}

export function ThemeSelectorPanel() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  if (!mounted) return null

  return (
    <div className="space-y-4">
      <div>
        <p className="text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wide">Light</p>
        <ThemeGrid themes={LIGHT_THEMES} active={theme ?? DEFAULT_THEME} onSelect={setTheme} />
      </div>
      <div>
        <p className="text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wide">Dark</p>
        <ThemeGrid themes={DARK_THEMES} active={theme ?? DEFAULT_THEME} onSelect={setTheme} />
      </div>
    </div>
  )
}

export function ThemePicker() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" aria-label="Theme">
        <Palette className="h-5 w-5" />
      </Button>
    )
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="Choose theme">
          <Palette className="h-5 w-5" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-4" align="end">
        <p className="font-semibold mb-1">Appearance</p>
        <p className="text-xs text-muted-foreground mb-4">Pick from 4 light & 4 dark themes</p>
        <p className="text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wide">Light</p>
        <ThemeGrid
          themes={LIGHT_THEMES}
          active={theme ?? 'dark-violet'}
          onSelect={(id) => setTheme(id)}
        />
        <p className="text-xs font-medium text-muted-foreground mb-2 mt-4 uppercase tracking-wide">Dark</p>
        <ThemeGrid
          themes={DARK_THEMES}
          active={theme ?? 'dark-violet'}
          onSelect={(id) => setTheme(id)}
        />
      </PopoverContent>
    </Popover>
  )
}
