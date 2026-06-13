'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Search, TrendingUp, Calendar, Building2, Sparkles, Users, MapPin } from 'lucide-react'
import { SiteShell } from '@/components/layout/site-shell'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/components/ui/empty'

const trending = ['Pool party Douala', 'Kribi villa', 'Afrobeats', 'New Year Eve', 'Limbe beach']

const mockResults = {
  events: [
    { id: '1', title: 'Sunset Pool Party', location: 'Douala', price: '20,000 XAF', image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=400&auto=format&fit=crop&q=80' },
    { id: '2', title: 'Afrobeats Night', location: 'Yaoundé', price: '10,000 XAF', image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&auto=format&fit=crop&q=80' },
  ],
  villas: [
    { id: '1', title: 'Ocean View Paradise', location: 'Kribi', price: '150,000 XAF/night', image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=400&auto=format&fit=crop&q=80' },
  ],
  organizers: [
    { id: '1', title: 'Vibe Events', location: 'Douala', subtitle: 'Nightlife & Parties', image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&auto=format&fit=crop&q=80' },
  ],
  experiences: [
    { id: '1', title: 'Kribi Beach Sunset Tour', location: 'Kribi', price: '25,000 XAF', image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&auto=format&fit=crop&q=80' },
  ],
}

export default function SearchPage() {
  const [query, setQuery] = useState('')
  const hasQuery = query.trim().length > 0

  return (
    <SiteShell>
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl sm:text-3xl font-bold mb-6">Search</h1>
        <div className="relative mb-8">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Events, villas, organizers, cities..."
            className="pl-12 h-12 text-base rounded-xl"
            autoFocus
          />
        </div>

        {!hasQuery && (
          <div className="mb-8">
            <p className="text-sm font-medium text-muted-foreground mb-3 flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Trending searches
            </p>
            <div className="flex flex-wrap gap-2">
              {trending.map((term) => (
                <button
                  key={term}
                  type="button"
                  onClick={() => setQuery(term)}
                  className="px-4 py-2 rounded-full bg-secondary text-sm hover:bg-secondary/80 transition-colors"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        )}

        <Tabs defaultValue="all">
          <TabsList className="mb-6 flex-wrap h-auto gap-1">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="events">Events</TabsTrigger>
            <TabsTrigger value="villas">Villas</TabsTrigger>
            <TabsTrigger value="experiences">Experiences</TabsTrigger>
            <TabsTrigger value="organizers">Organizers</TabsTrigger>
          </TabsList>

          {(['all', 'events', 'villas', 'experiences', 'organizers'] as const).map((tab) => (
            <TabsContent key={tab} value={tab} className="space-y-4">
              {hasQuery ? (
                <>
                  {(tab === 'all' || tab === 'events') && (
                    <ResultSection
                      title="Events"
                      icon={Calendar}
                      items={mockResults.events}
                      hrefPrefix="/events"
                    />
                  )}
                  {(tab === 'all' || tab === 'villas') && (
                    <ResultSection
                      title="Villas"
                      icon={Building2}
                      items={mockResults.villas}
                      hrefPrefix="/villas"
                    />
                  )}
                  {(tab === 'all' || tab === 'experiences') && (
                    <ResultSection
                      title="Experiences"
                      icon={Sparkles}
                      items={mockResults.experiences}
                      hrefPrefix="/experiences"
                    />
                  )}
                  {(tab === 'all' || tab === 'organizers') && (
                    <ResultSection
                      title="Organizers"
                      icon={Users}
                      items={mockResults.organizers}
                      hrefPrefix="/organizer"
                    />
                  )}
                </>
              ) : (
                <Empty>
                  <EmptyHeader>
                    <EmptyMedia variant="icon">
                      <Search />
                    </EmptyMedia>
                    <EmptyTitle>Start searching</EmptyTitle>
                    <EmptyDescription>
                      Find events, villas, experiences, and organizers across Cameroon.
                    </EmptyDescription>
                  </EmptyHeader>
                </Empty>
              )}
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </SiteShell>
  )
}

function ResultSection({
  title,
  icon: Icon,
  items,
  hrefPrefix,
}: {
  title: string
  icon: React.ComponentType<{ className?: string }>
  items: { id: string; title: string; location: string; price?: string; subtitle?: string; image: string }[]
  hrefPrefix: string
}) {
  return (
    <div>
      <h2 className="flex items-center gap-2 font-semibold mb-3">
        <Icon className="h-5 w-5 text-primary" />
        {title}
      </h2>
      <div className="space-y-2">
        {items.map((item) => (
          <Link
            key={item.id}
            href={`${hrefPrefix}/${item.id}`}
            className="flex gap-4 p-3 rounded-xl border border-border hover:border-primary/40 hover:bg-secondary/30 transition-colors"
          >
            <div className="relative h-16 w-16 rounded-lg overflow-hidden shrink-0">
              <Image src={item.image} alt="" fill className="object-cover" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium truncate">{item.title}</p>
              <p className="text-sm text-muted-foreground flex items-center gap-1">
                <MapPin className="h-3 w-3" />
                {item.location}
              </p>
              {item.price && (
                <Badge variant="secondary" className="mt-1">
                  {item.price}
                </Badge>
              )}
              {item.subtitle && (
                <p className="text-xs text-muted-foreground mt-1">{item.subtitle}</p>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
