

import Link from '@tanstack/react-router'
import Image from '@/components/compat/next-image'
import { motion } from 'framer-motion'
import { Calendar, MapPin, Users, Heart, ArrowRight, Ticket } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

const trendingEvents = [
  {
    id: '1',
    title: 'Sunset Pool Party',
    organizer: 'Vibe Events',
    date: 'Dec 15, 2025',
    time: '4:00 PM',
    location: 'Douala',
    venue: 'Aqua Palace',
    price: 15000,
    currency: 'XAF',
    image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800&auto=format&fit=crop&q=80',
    attendees: 234,
    likes: 456,
    category: 'Pool Party',
    featured: true,
  },
  {
    id: '2',
    title: 'Afrobeats Night',
    organizer: 'Club 237',
    date: 'Dec 18, 2025',
    time: '10:00 PM',
    location: 'Yaoundé',
    venue: 'Club Prestige',
    price: 10000,
    currency: 'XAF',
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&auto=format&fit=crop&q=80',
    attendees: 512,
    likes: 789,
    category: 'Nightlife',
    featured: false,
  },
  {
    id: '3',
    title: 'Beach Festival 2025',
    organizer: 'Kribi Events',
    date: 'Dec 20-22, 2025',
    time: 'All Day',
    location: 'Kribi',
    venue: 'Kribi Beach',
    price: 25000,
    currency: 'XAF',
    image: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?w=800&auto=format&fit=crop&q=80',
    attendees: 1200,
    likes: 1543,
    category: 'Festival',
    featured: true,
  },
  {
    id: '4',
    title: 'Jazz & Wine Evening',
    organizer: 'Culture Hub',
    date: 'Dec 16, 2025',
    time: '7:00 PM',
    location: 'Douala',
    venue: 'Le Meridien',
    price: 20000,
    currency: 'XAF',
    image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&auto=format&fit=crop&q=80',
    attendees: 89,
    likes: 234,
    category: 'Concert',
    featured: false,
  },
]

function formatPrice(price: number, currency: string) {
  return new Intl.NumberFormat('fr-CM', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
  }).format(price)
}

export function EventCard({ event, index }: { event: typeof trendingEvents[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="group"
    >
      <Link href={`/events/${event.id}`}>
        <div className="relative bg-card rounded-2xl overflow-hidden border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:shadow-primary/5">
          {/* Image */}
          <div className="relative aspect-[4/3] overflow-hidden">
            <Image
              src={event.image}
              alt={event.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            
            {/* Badges */}
            <div className="absolute top-3 left-3 flex gap-2">
              <Badge variant="secondary" className="bg-background/90 backdrop-blur-sm">
                {event.category}
              </Badge>
              {event.featured && (
                <Badge className="bg-primary text-primary-foreground">
                  Featured
                </Badge>
              )}
            </div>

            {/* Like Button */}
            <button className="absolute top-3 right-3 p-2 rounded-full bg-background/90 backdrop-blur-sm hover:bg-primary hover:text-primary-foreground transition-colors">
              <Heart className="h-4 w-4" />
            </button>

            {/* Price Badge */}
            <div className="absolute bottom-3 right-3">
              <Badge variant="secondary" className="bg-primary text-primary-foreground text-sm font-semibold px-3 py-1">
                {formatPrice(event.price, event.currency)}
              </Badge>
            </div>
          </div>

          {/* Content */}
          <div className="p-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
              <Calendar className="h-4 w-4 text-primary" />
              <span>{event.date} • {event.time}</span>
            </div>
            
            <h3 className="font-semibold text-lg mb-1 group-hover:text-primary transition-colors line-clamp-1">
              {event.title}
            </h3>
            
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
              <MapPin className="h-4 w-4" />
              <span>{event.venue}, {event.location}</span>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-border">
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  {event.attendees}
                </span>
                <span className="flex items-center gap-1">
                  <Heart className="h-4 w-4" />
                  {event.likes}
                </span>
              </div>
              <span className="text-sm font-medium text-primary">
                by {event.organizer}
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

export function TrendingEventsSection() {
  return (
    <section className="py-16 sm:py-24 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
          <div>
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-sm font-medium text-primary mb-2 block"
            >
              What&apos;s Hot
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl sm:text-4xl font-bold"
            >
              Trending Events
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-muted-foreground mt-2"
            >
              Don&apos;t miss out on the most popular events happening now
            </motion.p>
          </div>
          <Link href="/events">
            <Button variant="outline" className="gap-2">
              View All Events
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {trendingEvents.map((event, index) => (
            <EventCard key={event.id} event={event} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
