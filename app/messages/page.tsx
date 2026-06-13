'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Search, Send, Paperclip, MoreVertical } from 'lucide-react'
import { SiteShell } from '@/components/layout/site-shell'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { cn } from '@/lib/utils'

const conversations = [
  { id: '1', name: 'Vibe Events', avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200', lastMessage: 'See you at the pool party!', time: '2m', unread: 2 },
  { id: '2', name: 'Jean-Pierre M.', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200', lastMessage: 'Your booking is confirmed', time: '1h', unread: 0 },
  { id: '3', name: 'Marie Kamga', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200', lastMessage: 'Thanks for the recommendation', time: 'Yesterday', unread: 0 },
]

const messages = [
  { id: '1', from: 'them', text: 'Hey! Are you coming to Sunset Pool Party?', time: '10:30 AM' },
  { id: '2', from: 'me', text: 'Yes! Just got my tickets 🎉', time: '10:32 AM' },
  { id: '3', from: 'them', text: 'See you at the pool party!', time: '10:35 AM' },
]

export default function MessagesPage() {
  const [activeId, setActiveId] = useState('1')
  const active = conversations.find((c) => c.id === activeId)

  return (
    <SiteShell showMobileNav={false}>
      <div className="mx-auto max-w-6xl px-4 sm:px-6 h-[calc(100vh-4rem)] md:h-[calc(100vh-4rem)]">
        <div className="flex h-full border border-border rounded-2xl overflow-hidden bg-card mt-4 md:mt-6">
          {/* Conversation list */}
          <div className={cn('w-full md:w-80 border-r border-border flex flex-col', activeId && 'hidden md:flex')}>
            <div className="p-4 border-b border-border">
              <h1 className="font-bold text-lg mb-3">Messages</h1>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search messages" className="pl-9 h-9" />
              </div>
            </div>
            <div className="flex-1 overflow-y-auto">
              {conversations.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setActiveId(c.id)}
                  className={cn(
                    'w-full flex gap-3 p-4 text-left hover:bg-secondary/50 transition-colors',
                    activeId === c.id && 'bg-secondary/70'
                  )}
                >
                  <Avatar>
                    <AvatarImage src={c.avatar} />
                    <AvatarFallback>{c.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between">
                      <span className="font-medium truncate">{c.name}</span>
                      <span className="text-xs text-muted-foreground">{c.time}</span>
                    </div>
                    <p className="text-sm text-muted-foreground truncate">{c.lastMessage}</p>
                  </div>
                  {c.unread > 0 && (
                    <span className="h-5 min-w-5 px-1 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
                      {c.unread}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Chat panel */}
          <div className={cn('flex-1 flex flex-col', !activeId && 'hidden md:flex')}>
            {active ? (
              <>
                <div className="flex items-center justify-between p-4 border-b border-border">
                  <div className="flex items-center gap-3">
                    <button type="button" className="md:hidden text-sm text-primary" onClick={() => setActiveId('')}>
                      ← Back
                    </button>
                    <Avatar>
                      <AvatarImage src={active.avatar} />
                      <AvatarFallback>{active.name[0]}</AvatarFallback>
                    </Avatar>
                    <span className="font-semibold">{active.name}</span>
                  </div>
                  <Button variant="ghost" size="icon">
                    <MoreVertical className="h-5 w-5" />
                  </Button>
                </div>
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {messages.map((m) => (
                    <div
                      key={m.id}
                      className={cn('flex', m.from === 'me' ? 'justify-end' : 'justify-start')}
                    >
                      <div
                        className={cn(
                          'max-w-[80%] rounded-2xl px-4 py-2 text-sm',
                          m.from === 'me'
                            ? 'bg-primary text-primary-foreground rounded-br-md'
                            : 'bg-secondary rounded-bl-md'
                        )}
                      >
                        {m.text}
                        <p className={cn('text-xs mt-1', m.from === 'me' ? 'text-primary-foreground/70' : 'text-muted-foreground')}>
                          {m.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-4 border-t border-border flex gap-2">
                  <Button variant="ghost" size="icon">
                    <Paperclip className="h-5 w-5" />
                  </Button>
                  <Input placeholder="Type a message..." className="flex-1" />
                  <Button size="icon" className="cameroon-gradient text-primary-foreground">
                    <Send className="h-5 w-5" />
                  </Button>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center text-muted-foreground">
                Select a conversation
              </div>
            )}
          </div>
        </div>
      </div>
    </SiteShell>
  )
}
