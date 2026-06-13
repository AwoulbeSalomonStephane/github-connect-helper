'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { MapPin, Star, Clock, Users, Heart, Share2, Calendar } from 'lucide-react'
import { SiteShell } from '@/components/layout/site-shell'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

const experience = {
  id: '1',
  title: 'Kribi Beach Sunset Tour',
  location: 'Kribi',
  duration: '4 hours',
  groupSize: 'Up to 12 guests',
  price: 25000,
  rating: 4.9,
  reviews: 124,
  category: 'Beach & Nature',
  image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&auto=format&fit=crop&q=80',
  description:
    'Watch the sun set over the Atlantic with a guided beach walk, local snacks, and photo stops along Kribi\'s most scenic coastline.',
  includes: ['Local guide', 'Snacks & drinks', 'Transport from meeting point', 'Photos'],
}

export default function ExperienceDetailPage() {
  const [liked, setLiked] = useState(false)

  return (
    <SiteShell>
      <div className="relative h-[40vh] min-h-[280px]">
        <Image src={experience.image} alt={experience.title} fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        <Badge className="absolute top-20 left-4">{experience.category}</Badge>
      </div>
      <div className="mx-auto max-w-4xl px-4 sm:px-6 -mt-8 relative pb-12">
        <h1 className="text-3xl font-bold">{experience.title}</h1>
        <div className="flex flex-wrap gap-4 mt-3 text-sm text-muted-foreground">
          <span className="flex items-center gap-1">
            <MapPin className="h-4 w-4" />
            {experience.location}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            {experience.duration}
          </span>
          <span className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            {experience.groupSize}
          </span>
          <span className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-accent text-accent" />
            {experience.rating} ({experience.reviews})
          </span>
        </div>

        <div className="flex gap-2 mt-6">
          <Button variant="ghost" size="icon" onClick={() => setLiked(!liked)}>
            <Heart className={`h-5 w-5 ${liked ? 'fill-destructive text-destructive' : ''}`} />
          </Button>
          <Button variant="ghost" size="icon">
            <Share2 className="h-5 w-5" />
          </Button>
        </div>

        <p className="mt-6 text-muted-foreground leading-relaxed">{experience.description}</p>

        <h2 className="font-semibold mt-8 mb-3">What&apos;s included</h2>
        <ul className="space-y-2">
          {experience.includes.map((item) => (
            <li key={item} className="text-sm text-muted-foreground flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              {item}
            </li>
          ))}
        </ul>

        <div className="sticky bottom-20 md:bottom-6 mt-10 p-4 rounded-2xl border border-border bg-card/95 backdrop-blur-xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <p className="text-2xl font-bold">{experience.price.toLocaleString()} XAF</p>
            <p className="text-sm text-muted-foreground">per person</p>
          </div>
          <Link href={`/checkout/event?eventId=exp-${experience.id}&qty=1&ticket=Experience&price=${experience.price}`}>
            <Button size="lg" className="gap-2 cameroon-gradient text-primary-foreground w-full sm:w-auto">
              <Calendar className="h-5 w-5" />
              Book experience
            </Button>
          </Link>
        </div>
      </div>
    </SiteShell>
  )
}
