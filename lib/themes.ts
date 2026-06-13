export const LIGHT_THEMES = [
  {
    id: 'light-cameroon',
    label: 'Cameroon',
    description: 'Warm green & gold — your current favorite',
    swatch: ['#2d8a5e', '#f5e6c8'],
  },
  {
    id: 'light-sand',
    label: 'Sand',
    description: 'Soft beige & amber accents',
    swatch: ['#c4a574', '#faf6f0'],
  },
  {
    id: 'light-ocean',
    label: 'Ocean',
    description: 'Coastal blue & crisp white',
    swatch: ['#2563eb', '#f0f7ff'],
  },
  {
    id: 'light-linen',
    label: 'Linen',
    description: 'Minimal neutral & slate',
    swatch: ['#64748b', '#fafafa'],
  },
] as const

export const DARK_THEMES = [
  {
    id: 'dark-violet',
    label: 'Violet Night',
    description: 'Purple accents on charcoal — default dark',
    swatch: ['#a855f7', '#141414'],
  },
  {
    id: 'dark-obsidian',
    label: 'Obsidian',
    description: 'Deep black with amethyst glow',
    swatch: ['#9333ea', '#0a0a0a'],
  },
  {
    id: 'dark-midnight',
    label: 'Midnight',
    description: 'Blue-violet nightlife mood',
    swatch: ['#6366f1', '#0f172a'],
  },
  {
    id: 'dark-charcoal',
    label: 'Charcoal',
    description: 'Cool grey with soft violet',
    swatch: ['#8b5cf6', '#1c1c1e'],
  },
] as const

export const ALL_THEMES = [...LIGHT_THEMES, ...DARK_THEMES] as const
export type ThemeId = (typeof ALL_THEMES)[number]['id']
export const THEME_IDS: ThemeId[] = ALL_THEMES.map((t) => t.id)
export const DEFAULT_THEME: ThemeId = 'dark-violet'

export function isDarkTheme(theme: string) {
  return theme.startsWith('dark-')
}
