'use client'

import Link from 'next/link'
import { useState } from 'react'
import {
  LayoutDashboard,
  Users,
  Calendar,
  Building2,
  CheckCircle,
  Flag,
  BarChart3,
  Settings,
  X,
} from 'lucide-react'

const items = [
  { icon: LayoutDashboard, label: 'Overview', href: '/admin' },
  { icon: Users, label: 'Users', href: '/admin/users' },
  { icon: Calendar, label: 'Events', href: '/admin/events' },
  { icon: Building2, label: 'Villas', href: '/admin/villas' },
  { icon: CheckCircle, label: 'Approvals', href: '/admin/approvals' },
  { icon: Flag, label: 'Reports', href: '/admin/reports' },
  { icon: BarChart3, label: 'Analytics', href: '/admin/analytics' },
  { icon: Settings, label: 'Settings', href: '/admin/settings' },
]

export function AdminDashboardLayout({
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
        <div className="p-4 flex justify-between items-center border-b border-border">
          <Link href="/" className="font-bold">
            VibeCam Admin
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
        <header className="h-16 border-b flex items-center px-4 lg:px-8 gap-4">
          <button type="button" className="lg:hidden" onClick={() => setOpen(true)}>
            Menu
          </button>
          <h1 className="font-semibold">{title}</h1>
        </header>
        <main className="p-4 lg:p-8">{children}</main>
      </div>
    </div>
  )
}
