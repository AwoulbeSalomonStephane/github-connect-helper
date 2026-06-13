'use client'

import Link from 'next/link'
import { useState } from 'react'
import {
  Heart,
  MessageCircle,
  Ticket,
  Calendar,
  UserPlus,
  Building2,
  Bell,
} from 'lucide-react'
import { SiteShell } from '@/components/layout/site-shell'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { cn } from '@/lib/utils'

const notifications = [
  { id: '1', type: 'like', user: 'Aminata S.', avatar: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=200', message: 'liked your post', time: '2m ago', read: false, href: '/feed' },
  { id: '2', type: 'follow', user: 'Paul N.', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200', message: 'started following you', time: '15m ago', read: false, href: '/profile/paul_n' },
  { id: '3', type: 'ticket', user: 'VibeCam', avatar: '', message: 'Ticket confirmed for Sunset Pool Party', time: '1h ago', read: true, href: '/tickets/1' },
  { id: '4', type: 'booking', user: 'Jean-Pierre M.', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200', message: 'approved your villa booking request', time: '3h ago', read: true, href: '/bookings' },
  { id: '5', type: 'comment', user: 'Marie K.', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200', message: 'commented: "Can&apos;t wait! 🔥"', time: '5h ago', read: true, href: '/feed' },
  { id: '6', type: 'event', user: 'Vibe Events', avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200', message: 'Afro Nation starts in 24 hours', time: '1d ago', read: true, href: '/events/1' },
]

const iconMap = {
  like: Heart,
  follow: UserPlus,
  ticket: Ticket,
  booking: Building2,
  comment: MessageCircle,
  event: Calendar,
}

export default function NotificationsPage() {
  const [items, setItems] = useState(notifications)

  const markAllRead = () => setItems((prev) => prev.map((n) => ({ ...n, read: true })))

  return (
    <SiteShell>
      <div className="mx-auto max-w-2xl px-4 sm:px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Bell className="h-6 w-6 text-primary" />
            Notifications
          </h1>
          <button
            type="button"
            onClick={markAllRead}
            className="text-sm text-primary hover:underline"
          >
            Mark all read
          </button>
        </div>

        <Tabs defaultValue="all">
          <TabsList className="mb-4">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="unread">Unread</TabsTrigger>
          </TabsList>
          <TabsContent value="all" className="space-y-1">
            {items.map((n) => (
              <NotificationItem key={n.id} item={n} />
            ))}
          </TabsContent>
          <TabsContent value="unread" className="space-y-1">
            {items.filter((n) => !n.read).map((n) => (
              <NotificationItem key={n.id} item={n} />
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </SiteShell>
  )
}

function NotificationItem({
  item,
}: {
  item: (typeof notifications)[0]
}) {
  const Icon = iconMap[item.type as keyof typeof iconMap] ?? Bell

  return (
    <Link
      href={item.href}
      className={cn(
        'flex gap-3 p-4 rounded-xl transition-colors hover:bg-secondary/50',
        !item.read && 'bg-primary/5 border border-primary/20'
      )}
    >
      <div className="relative shrink-0">
        {item.avatar ? (
          <Avatar className="h-11 w-11">
            <AvatarImage src={item.avatar} />
            <AvatarFallback>{item.user[0]}</AvatarFallback>
          </Avatar>
        ) : (
          <div className="h-11 w-11 rounded-full bg-primary flex items-center justify-center">
            <Icon className="h-5 w-5 text-primary-foreground" />
          </div>
        )}
        <span className="absolute -bottom-1 -right-1 h-5 w-5 rounded-full bg-card border border-border flex items-center justify-center">
          <Icon className="h-3 w-3 text-primary" />
        </span>
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm">
          <span className="font-semibold">{item.user}</span>{' '}
          <span className="text-muted-foreground">{item.message}</span>
        </p>
        <p className="text-xs text-muted-foreground mt-1">{item.time}</p>
      </div>
      {!item.read && <span className="h-2 w-2 rounded-full bg-primary shrink-0 mt-2" />}
    </Link>
  )
}
