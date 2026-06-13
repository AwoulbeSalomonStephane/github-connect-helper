'use client'

import Link from 'next/link'
import { useState } from 'react'
import {
  LayoutDashboard,
  Calendar,
  Ticket,
  Users,
  BarChart3,
  Settings,
  Plus,
  X,
  LogOut,
} from 'lucide-react'
import { Button } from '@/components/ui/button'

const sidebarItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard/organizer' },
  { icon: Calendar, label: 'Events', href: '/dashboard/organizer/events' },
  { icon: Ticket, label: 'Tickets', href: '/dashboard/organizer/tickets' },
  { icon: Users, label: 'Attendees', href: '/dashboard/organizer/attendees' },
  { icon: BarChart3, label: 'Analytics', href: '/dashboard/organizer/analytics' },
  { icon: Settings, label: 'Settings', href: '/dashboard/organizer/settings' },
]

export function OrganizerDashboardLayout({
  children,
  activeHref,
  title,
}: {
  children: React.ReactNode
  activeHref: string
  title: string
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-background">
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-card border-r border-border z-50 transform transition-transform lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full p-4">
          <div className="flex items-center justify-between mb-8">
            <Link href="/" className="flex items-center gap-2 font-bold text-lg">
              <div className="h-8 w-8 rounded-lg cameroon-gradient flex items-center justify-center text-primary-foreground text-sm">
                V
              </div>
              VibeCam
            </Link>
            <button type="button" className="lg:hidden" onClick={() => setSidebarOpen(false)}>
              <X className="h-5 w-5" />
            </button>
          </div>
          <nav className="flex-1 space-y-1">
            {sidebarItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
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
          <Link href="/">
            <Button variant="ghost" className="w-full justify-start gap-2 text-muted-foreground">
              <LogOut className="h-4 w-4" />
              Exit dashboard
            </Button>
          </Link>
        </div>
      </aside>
      <div className="lg:pl-64">
        <header className="h-16 border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-30 flex items-center justify-between px-4 lg:px-8">
          <div className="flex items-center gap-4">
            <button type="button" className="lg:hidden" onClick={() => setSidebarOpen(true)}>
              <span className="sr-only">Menu</span>
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <h1 className="font-semibold text-lg">{title}</h1>
          </div>
          <Link href="/dashboard/organizer/events/new">
            <Button size="sm" className="gap-2 cameroon-gradient text-primary-foreground">
              <Plus className="h-4 w-4" />
              Create event
            </Button>
          </Link>
        </header>
        <main className="p-4 lg:p-8">{children}</main>
      </div>
    </div>
  )
}
