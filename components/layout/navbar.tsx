'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Search,
  Menu,
  X,
  Bell,
  Home,
  Calendar,
  Building2,
  Sparkles,
  Users,
  LayoutGrid,
  User,
} from 'lucide-react'
import { ThemePicker } from '@/components/theme/theme-picker'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const navLinks = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/feed', label: 'Feed', icon: LayoutGrid },
  { href: '/events', label: 'Events', icon: Calendar },
  { href: '/villas', label: 'Villas', icon: Building2 },
  { href: '/experiences', label: 'Experiences', icon: Sparkles },
  { href: '/organizers', label: 'Organizers', icon: Users },
]

const mobileNavLinks = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/feed', label: 'Feed', icon: LayoutGrid },
  { href: '/events', label: 'Events', icon: Calendar },
  { href: '/villas', label: 'Villas', icon: Building2 },
  { href: '/profile/marie_kamga', label: 'Profile', icon: User },
]

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-border/40 shadow-sm shadow-black/5">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary">
                <span className="text-lg font-bold text-primary-foreground">V</span>
              </div>
              <span className="text-xl font-bold tracking-tight">
                Vibe<span className="text-primary">Cam</span>
              </span>
            </Link>

            <div className="hidden lg:flex items-center gap-0.5">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'px-3 py-2 text-sm font-medium rounded-lg transition-colors',
                    pathname === link.href
                      ? 'text-primary bg-primary/10'
                      : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <Link href="/search">
                <Button variant="ghost" size="icon" className="hidden sm:flex" aria-label="Search">
                  <Search className="h-5 w-5" />
                </Button>
              </Link>
              <ThemePicker />
              <Link href="/notifications">
                <Button variant="ghost" size="icon" className="hidden sm:flex relative" aria-label="Notifications">
                  <Bell className="h-5 w-5" />
                  <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-primary" />
                </Button>
              </Link>
              <div className="hidden sm:flex items-center gap-2">
                <Link href="/login">
                  <Button variant="ghost" size="sm">
                    Login
                  </Button>
                </Link>
                <Link href="/signup">
                  <Button size="sm">Sign Up</Button>
                </Link>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden"
                onClick={() => setIsOpen(true)}
                aria-label="Open menu"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm lg:hidden"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 z-50 w-3/4 max-w-sm bg-card border-l border-border p-6 lg:hidden"
            >
              <div className="flex items-center justify-between mb-8">
                <span className="text-lg font-bold">Menu</span>
                <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} aria-label="Close menu">
                  <X className="h-5 w-5" />
                </Button>
              </div>
              <div className="flex flex-col gap-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 text-base font-medium text-muted-foreground hover:text-foreground hover:bg-secondary rounded-lg transition-colors"
                  >
                    <link.icon className="h-5 w-5" />
                    {link.label}
                  </Link>
                ))}
                <Link
                  href="/search"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 text-base font-medium text-muted-foreground hover:text-foreground hover:bg-secondary rounded-lg"
                >
                  <Search className="h-5 w-5" />
                  Search
                </Link>
                <Link
                  href="/notifications"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 text-base font-medium text-muted-foreground hover:text-foreground hover:bg-secondary rounded-lg"
                >
                  <Bell className="h-5 w-5" />
                  Notifications
                </Link>
                <Link
                  href="/settings"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 text-base font-medium text-muted-foreground hover:text-foreground hover:bg-secondary rounded-lg"
                >
                  Settings & themes
                </Link>
              </div>
              <div className="mt-8 flex flex-col gap-2">
                <Link href="/login" onClick={() => setIsOpen(false)}>
                  <Button variant="outline" className="w-full">
                    Login
                  </Button>
                </Link>
                <Link href="/signup" onClick={() => setIsOpen(false)}>
                  <Button className="w-full">Sign Up</Button>
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

export function MobileNav() {
  const pathname = usePathname()

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 glass md:hidden border-t border-border/40 shadow-[0_-4px_24px_-4px_rgba(0,0,0,0.12)] pb-[env(safe-area-inset-bottom)]">
      <div className="flex items-center justify-around py-2">
        {mobileNavLinks.map((link) => {
          const active = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href))
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'flex flex-col items-center gap-1 px-2 py-2 transition-colors',
                active ? 'text-primary' : 'text-muted-foreground'
              )}
            >
              <link.icon className={cn('h-5 w-5', active && 'scale-110')} />
              <span className="text-[10px] font-medium">{link.label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
