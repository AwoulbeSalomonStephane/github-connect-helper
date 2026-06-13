'use client'

import Link from 'next/link'
import { useState } from 'react'
import {
  LayoutDashboard,
  Building2,
  Calendar,
  MessageCircle,
  DollarSign,
  Settings,
  X,
} from 'lucide-react'

const items = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard/villa-owner' },
  { icon: Building2, label: 'Properties', href: '/dashboard/villa-owner/properties' },
  { icon: Calendar, label: 'Bookings', href: '/dashboard/villa-owner/bookings' },
  { icon: MessageCircle, label: 'Messages', href: '/messages' },
  { icon: DollarSign, label: 'Earnings', href: '/dashboard/villa-owner/earnings' },
  { icon: Settings, label: 'Settings', href: '/dashboard/villa-owner/settings' },
]

export function VillaOwnerLayout({
  children,
  activeHref,
  title,
}: {
  children: React.ReactNode
  activeHref: string
  title: string
}) {
  const [open, setOpen] = useState(false)

  return (
    <div className="min-h-screen bg-background">
      {open && <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setOpen(false)} />}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-card border-r z-50 lg:translate-x-0 transition-transform ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-4 border-b flex justify-between">
          <Link href="/" className="font-bold">
            VibeCam Host
          </Link>
          <button type="button" className="lg:hidden" onClick={() => setOpen(false)}>
            <X className="h-5 w-5" />
          </button>
        </div>
        <nav className="p-4 space-y-1">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm ${
                activeHref === item.href
                  ? 'bg-primary/10 text-primary font-medium'
                  : 'text-muted-foreground hover:bg-secondary'
              }`}
            >
              <item.icon className="h-5 w-5" />
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>
      <div className="lg:pl-64">
        <header className="h-16 border-b flex items-center px-4 lg:px-8">
          <button type="button" className="lg:hidden mr-4" onClick={() => setOpen(true)}>
            Menu
          </button>
          <h1 className="font-semibold">{title}</h1>
        </header>
        <main className="p-4 lg:p-8">{children}</main>
      </div>
    </div>
  )
}
