'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import {
  Calendar,
  MapPin,
  Clock,
  Users,
  Heart,
  Share2,
  Bookmark,
  CheckCircle,
  Ticket,
  ChevronLeft,
  ChevronRight,
  Star,
  X,
  Minus,
  Plus,
} from 'lucide-react'
import { Navbar, MobileNav } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'

// Mock event data
const event = {
  id: '1',
  title: 'Sunset Pool Party',
  description: `Get ready for the ultimate pool party experience! Join us for an unforgettable evening of music, dancing, and fun under the stars.

This exclusive event features:
• Top DJs spinning the hottest Afrobeats and international hits
• Unlimited premium cocktails and drinks
• Gourmet food stations
• VIP cabana areas
• Professional photography
• Surprise celebrity appearances

Dress code: Beach chic / Summer vibes
Age restriction: 21+

Don't miss out on the most talked-about event of the season!`,
  organizer: {
    id: '1',
    name: 'Vibe Events',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&auto=format&fit=crop&q=80',
    verified: true,
    followers: 15420,
    totalEvents: 89,
  },
  date: 'December 15, 2025',
  time: '4:00 PM - 11:00 PM',
  location: 'Douala, Cameroon',
  venue: 'Aqua Palace Resort & Spa',
  address: '123 Oceanfront Drive, Bonanjo, Douala',
  images: [
    'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=1200&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1200&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1200&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1519046904884-53103b34b206?w=1200&auto=format&fit=crop&q=80',
  ],
  category: 'Pool Party',
  attendees: 234,
  likes: 456,
  ticketTypes: [
    { id: '1', name: 'Early Bird', price: 15000, available: 0, description: 'Limited early access tickets' },
    { id: '2', name: 'General Admission', price: 20000, available: 45, description: 'Standard entry to the event' },
    { id: '3', name: 'VIP', price: 50000, available: 12, description: 'VIP cabana access, premium drinks, meet & greet' },
    { id: '4', name: 'VVIP Table', price: 150000, available: 3, description: 'Private table for 6, bottle service, exclusive area' },
  ],
  reviews: [
    {
      id: '1',
      user: { name: 'Aminata S.', avatar: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=200' },
      rating: 5,
      comment: 'Amazing event! The vibes were incredible and the DJ was on point. Will definitely come back!',
      date: 'Nov 20, 2025',
    },
    {
      id: '2',
      user: { name: 'Paul N.', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200' },
      rating: 5,
      comment: 'Best pool party in Douala! Great music, great people, great experience.',
      date: 'Nov 18, 2025',
    },
  ],
  relatedEvents: [
    { id: '2', title: 'Beach Festival 2025', date: 'Dec 20', image: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?w=400', price: 25000 },
    { id: '3', title: 'Afrobeats Night', date: 'Dec 18', image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400', price: 10000 },
    { id: '4', title: 'New Year Eve Party', date: 'Dec 31', image: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=400', price: 35000 },
  ],
}

function formatPrice(price: number) {
  return new Intl.NumberFormat('fr-CM', {
    style: 'currency',
    currency: 'XAF',
    minimumFractionDigits: 0,
  }).format(price)
}

function ImageGallery({ images }: { images: string[] }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isFullscreen, setIsFullscreen] = useState(false)

  return (
    <>
      {/* Main Gallery */}
      <div className="relative">
        <div className="relative aspect-[16/9] lg:aspect-[21/9] overflow-hidden rounded-2xl">
          <Image
            src={images[currentIndex]}
            alt="Event"
            fill
            className="object-cover cursor-pointer"
            onClick={() => setIsFullscreen(true)}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
          
          {/* Navigation Arrows */}
          <button
            onClick={() => setCurrentIndex(Math.max(0, currentIndex - 1))}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background transition-colors"
            disabled={currentIndex === 0}
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={() => setCurrentIndex(Math.min(images.length - 1, currentIndex + 1))}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background transition-colors"
            disabled={currentIndex === images.length - 1}
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          {/* Indicators */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={cn(
                  'w-2 h-2 rounded-full transition-all',
                  index === currentIndex ? 'bg-white w-6' : 'bg-white/50'
                )}
              />
            ))}
          </div>
        </div>

        {/* Thumbnails */}
        <div className="flex gap-2 mt-4 overflow-x-auto hide-scrollbar">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={cn(
                'relative w-20 h-20 rounded-lg overflow-hidden shrink-0 border-2 transition-colors',
                index === currentIndex ? 'border-primary' : 'border-transparent'
              )}
            >
              <Image src={image} alt="" fill className="object-cover" />
            </button>
          ))}
        </div>
      </div>

      {/* Fullscreen Modal */}
      {isFullscreen && (
        <div className="fixed inset-0 z-50 bg-black flex items-center justify-center">
          <button
            onClick={() => setIsFullscreen(false)}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
          >
            <X className="h-6 w-6 text-white" />
          </button>
          <button
            onClick={() => setCurrentIndex(Math.max(0, currentIndex - 1))}
            className="absolute left-4 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
          >
            <ChevronLeft className="h-8 w-8 text-white" />
          </button>
          <div className="relative w-full max-w-5xl aspect-video mx-4">
            <Image
              src={images[currentIndex]}
              alt="Event"
              fill
              className="object-contain"
            />
          </div>
          <button
            onClick={() => setCurrentIndex(Math.min(images.length - 1, currentIndex + 1))}
            className="absolute right-4 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
          >
            <ChevronRight className="h-8 w-8 text-white" />
          </button>
        </div>
      )}
    </>
  )
}

function TicketPurchaseModal() {
  const [selectedTickets, setSelectedTickets] = useState<Record<string, number>>({})

  const total = Object.entries(selectedTickets).reduce((sum, [ticketId, qty]) => {
    const ticket = event.ticketTypes.find((t) => t.id === ticketId)
    return sum + (ticket?.price || 0) * qty
  }, 0)

  const totalQty = Object.values(selectedTickets).reduce((a, b) => a + b, 0)
  const primaryEntry = Object.entries(selectedTickets).find(([, qty]) => qty > 0)
  const primaryTicket = primaryEntry
    ? event.ticketTypes.find((t) => t.id === primaryEntry[0])
    : null
  const checkoutHref =
    primaryTicket && totalQty > 0
      ? `/checkout/event?eventId=${event.id}&qty=${totalQty}&ticket=${encodeURIComponent(primaryTicket.name)}&price=${primaryTicket.price}`
      : '#'

  const updateQuantity = (ticketId: string, delta: number) => {
    setSelectedTickets(prev => {
      const current = prev[ticketId] || 0
      const newQty = Math.max(0, Math.min(10, current + delta))
      if (newQty === 0) {
        const { [ticketId]: _, ...rest } = prev
        return rest
      }
      return { ...prev, [ticketId]: newQty }
    })
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="lg" className="w-full gap-2">
          <Ticket className="h-5 w-5" />
          Get Tickets
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Select Tickets</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 mt-4">
          {event.ticketTypes.map((ticket) => (
            <div
              key={ticket.id}
              className={cn(
                'p-4 rounded-xl border transition-colors',
                ticket.available === 0
                  ? 'bg-muted/50 border-border opacity-60'
                  : 'bg-card border-border hover:border-primary/50'
              )}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-semibold">{ticket.name}</h4>
                    {ticket.available === 0 && (
                      <Badge variant="secondary">Sold Out</Badge>
                    )}
                    {ticket.available > 0 && ticket.available < 10 && (
                      <Badge variant="destructive">{ticket.available} left</Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{ticket.description}</p>
                  <p className="font-bold text-lg mt-2">{formatPrice(ticket.price)}</p>
                </div>
                {ticket.available > 0 && (
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => updateQuantity(ticket.id, -1)}
                      disabled={!selectedTickets[ticket.id]}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-8 text-center font-medium">
                      {selectedTickets[ticket.id] || 0}
                    </span>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => updateQuantity(ticket.id, 1)}
                      disabled={(selectedTickets[ticket.id] || 0) >= 10}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {total > 0 && (
          <>
            <Separator className="my-4" />
            <div className="flex items-center justify-between mb-4">
              <span className="text-muted-foreground">Total</span>
              <span className="text-2xl font-bold">{formatPrice(total)}</span>
            </div>
            <Link href={checkoutHref}>
              <Button size="lg" className="w-full" disabled={!primaryTicket}>
                Proceed to Checkout
              </Button>
            </Link>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}

export default function EventDetailsPage() {
  const [isLiked, setIsLiked] = useState(false)
  const [isSaved, setIsSaved] = useState(false)

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-16 pb-20 md:pb-0">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
            <Link href="/events" className="hover:text-foreground">Events</Link>
            <span>/</span>
            <span>{event.category}</span>
            <span>/</span>
            <span className="text-foreground">{event.title}</span>
          </div>

          {/* Image Gallery */}
          <ImageGallery images={event.images} />

          <div className="grid lg:grid-cols-3 gap-8 mt-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Header */}
              <div>
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge>{event.category}</Badge>
                  <Badge variant="outline" className="text-primary border-primary">Featured</Badge>
                </div>
                <h1 className="text-3xl sm:text-4xl font-bold mb-4">{event.title}</h1>
                
                <div className="flex flex-wrap items-center gap-6 text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-primary" />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-primary" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-primary" />
                    <span>{event.venue}, {event.location}</span>
                  </div>
                </div>
              </div>

              {/* Organizer */}
              <div className="flex items-center justify-between p-4 rounded-xl bg-card border border-border">
                <Link href={`/organizer/${event.organizer.id}`} className="flex items-center gap-4">
                  <Avatar className="h-14 w-14 border-2 border-primary/20">
                    <AvatarImage src={event.organizer.avatar} />
                    <AvatarFallback>{event.organizer.name[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">{event.organizer.name}</span>
                      {event.organizer.verified && (
                        <CheckCircle className="h-4 w-4 fill-primary text-primary-foreground" />
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {event.organizer.followers.toLocaleString()} followers • {event.organizer.totalEvents} events
                    </p>
                  </div>
                </Link>
                <Button variant="outline">Follow</Button>
              </div>

              {/* Tabs */}
              <Tabs defaultValue="about">
                <TabsList className="w-full justify-start">
                  <TabsTrigger value="about">About</TabsTrigger>
                  <TabsTrigger value="reviews">Reviews</TabsTrigger>
                  <TabsTrigger value="location">Location</TabsTrigger>
                </TabsList>
                
                <TabsContent value="about" className="mt-6">
                  <div className="prose prose-neutral dark:prose-invert max-w-none">
                    <p className="whitespace-pre-line text-muted-foreground leading-relaxed">
                      {event.description}
                    </p>
                  </div>
                </TabsContent>

                <TabsContent value="reviews" className="mt-6">
                  <div className="space-y-6">
                    {event.reviews.map((review) => (
                      <div key={review.id} className="p-4 rounded-xl bg-card border border-border">
                        <div className="flex items-start gap-4">
                          <Avatar>
                            <AvatarImage src={review.user.avatar} />
                            <AvatarFallback>{review.user.name[0]}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <span className="font-semibold">{review.user.name}</span>
                              <span className="text-sm text-muted-foreground">{review.date}</span>
                            </div>
                            <div className="flex gap-1 my-2">
                              {Array.from({ length: review.rating }).map((_, i) => (
                                <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                              ))}
                            </div>
                            <p className="text-muted-foreground">{review.comment}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="location" className="mt-6">
                  <div className="rounded-xl overflow-hidden border border-border">
                    <div className="aspect-video bg-muted flex items-center justify-center">
                      <div className="text-center">
                        <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                        <p className="font-semibold">{event.venue}</p>
                        <p className="text-sm text-muted-foreground">{event.address}</p>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>

              {/* Related Events */}
              <div>
                <h2 className="text-xl font-bold mb-4">You Might Also Like</h2>
                <div className="grid sm:grid-cols-3 gap-4">
                  {event.relatedEvents.map((relatedEvent) => (
                    <Link key={relatedEvent.id} href={`/events/${relatedEvent.id}`}>
                      <div className="group bg-card rounded-xl overflow-hidden border border-border hover:border-primary/50 transition-colors">
                        <div className="relative aspect-video">
                          <Image
                            src={relatedEvent.image}
                            alt={relatedEvent.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform"
                          />
                        </div>
                        <div className="p-3">
                          <h3 className="font-semibold text-sm line-clamp-1 group-hover:text-primary">
                            {relatedEvent.title}
                          </h3>
                          <div className="flex items-center justify-between mt-1">
                            <span className="text-xs text-muted-foreground">{relatedEvent.date}</span>
                            <span className="text-sm font-bold">{formatPrice(relatedEvent.price)}</span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar - Sticky Ticket Card */}
            <div className="lg:col-span-1">
              <div className="sticky top-20 bg-card rounded-2xl border border-border p-6 space-y-6">
                {/* Price */}
                <div>
                  <p className="text-sm text-muted-foreground">Starting from</p>
                  <p className="text-3xl font-bold">{formatPrice(15000)}</p>
                </div>

                {/* Stats */}
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Users className="h-4 w-4" />
                    <span>{event.attendees} attending</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Heart className="h-4 w-4" />
                    <span>{event.likes} likes</span>
                  </div>
                </div>

                <Separator />

                {/* Actions */}
                <TicketPurchaseModal />

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    className="flex-1 gap-2"
                    onClick={() => setIsLiked(!isLiked)}
                  >
                    <Heart className={cn('h-4 w-4', isLiked && 'fill-red-500 text-red-500')} />
                    {isLiked ? 'Liked' : 'Like'}
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-1 gap-2"
                    onClick={() => setIsSaved(!isSaved)}
                  >
                    <Bookmark className={cn('h-4 w-4', isSaved && 'fill-primary text-primary')} />
                    {isSaved ? 'Saved' : 'Save'}
                  </Button>
                  <Button variant="outline" size="icon">
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>

                {/* Attendees Preview */}
                <div>
                  <p className="text-sm font-medium mb-3">Attendees</p>
                  <div className="flex items-center">
                    <div className="flex -space-x-2">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <Avatar key={i} className="h-8 w-8 border-2 border-background">
                          <AvatarImage src={`https://images.unsplash.com/photo-${1530000000000 + i * 10000000}-placeholder?w=100`} />
                          <AvatarFallback>U</AvatarFallback>
                        </Avatar>
                      ))}
                    </div>
                    <span className="text-sm text-muted-foreground ml-3">
                      +{event.attendees - 5} others
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <MobileNav />
    </div>
  )
}
