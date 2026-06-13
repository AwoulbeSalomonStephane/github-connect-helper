'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  BadgeCheck,
  Star,
  Building2,
  MessageCircle,
  Share2,
  MapPin,
} from 'lucide-react'
import { SiteShell } from '@/components/layout/site-shell'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

const host = {
  id: '1',
  name: 'Jean-Pierre M.',
  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&auto=format&fit=crop&q=80',
  cover: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1600&auto=format&fit=crop&q=80',
  bio: 'Luxury villa host on the Kribi coast. 5 years hosting premium stays for locals and diaspora.',
  location: 'Kribi, Cameroon',
  verified: true,
  villasCount: 4,
  rating: 4.9,
  reviews: 48,
  responseRate: '98%',
  stats: { bookings: 320, revenue: '48M+ FCFA', guests: 890 },
}

const villas = [
  {
    id: '1',
    name: 'Ocean View Paradise',
    price: 150000,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=600&auto=format&fit=crop&q=80',
  },
  {
    id: '2',
    name: 'Beachfront Villa',
    price: 200000,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&auto=format&fit=crop&q=80',
  },
]

export default function HostProfilePage() {
  const [following, setFollowing] = useState(false)

  return (
    <SiteShell>
      <div className="relative h-48 sm:h-64">
        <Image src={host.cover} alt="" fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
      </div>
      <div className="mx-auto max-w-4xl px-4 sm:px-6 -mt-16 relative z-10 pb-12">
        <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-end">
          <Avatar className="h-28 w-28 border-4 border-background">
            <AvatarImage src={host.avatar} />
            <AvatarFallback>{host.name[0]}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold">{host.name}</h1>
              {host.verified && <BadgeCheck className="h-6 w-6 text-primary" />}
            </div>
            <p className="text-muted-foreground flex items-center gap-1 mt-1">
              <MapPin className="h-4 w-4" />
              {host.location}
            </p>
            <div className="flex items-center gap-4 mt-2 text-sm">
              <span className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-accent text-accent" />
                {host.rating} ({host.reviews} reviews)
              </span>
              <span className="text-muted-foreground">{host.villasCount} villas</span>
            </div>
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <Button
              variant={following ? 'outline' : 'default'}
              className={!following ? 'cameroon-gradient text-primary-foreground' : ''}
              onClick={() => setFollowing(!following)}
            >
              {following ? 'Following' : 'Follow'}
            </Button>
            <Link href="/messages">
              <Button variant="outline" className="gap-2">
                <MessageCircle className="h-4 w-4" />
                Message
              </Button>
            </Link>
            <Button variant="ghost" size="icon">
              <Share2 className="h-5 w-5" />
            </Button>
          </div>
        </div>

        <p className="mt-6 text-muted-foreground">{host.bio}</p>

        <div className="grid grid-cols-3 gap-4 mt-8">
          {Object.entries(host.stats).map(([key, value]) => (
            <div key={key} className="text-center p-4 rounded-xl bg-card border border-border">
              <p className="text-xl font-bold">{value}</p>
              <p className="text-xs text-muted-foreground capitalize">{key}</p>
            </div>
          ))}
        </div>

        <Tabs defaultValue="villas" className="mt-10">
          <TabsList>
            <TabsTrigger value="villas">Villas</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
            <TabsTrigger value="gallery">Gallery</TabsTrigger>
          </TabsList>
          <TabsContent value="villas" className="mt-6 grid sm:grid-cols-2 gap-4">
            {villas.map((v, i) => (
              <motion.div key={v.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                <Link href={`/villas/${v.id}`} className="block group">
                  <div className="relative aspect-[4/3] rounded-xl overflow-hidden mb-2">
                    <Image src={v.image} alt={v.name} fill className="object-cover group-hover:scale-105 transition-transform" />
                  </div>
                  <h3 className="font-semibold group-hover:text-primary">{v.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {v.price.toLocaleString()} XAF/night · {v.rating} ★
                  </p>
                </Link>
              </motion.div>
            ))}
          </TabsContent>
          <TabsContent value="reviews" className="mt-6 text-muted-foreground">
            Guest reviews appear here when connected to your backend.
          </TabsContent>
          <TabsContent value="gallery" className="mt-6 grid grid-cols-3 gap-2">
            {villas.map((v) => (
              <div key={v.id} className="relative aspect-square rounded-lg overflow-hidden">
                <Image src={v.image} alt="" fill className="object-cover" />
              </div>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </SiteShell>
  )
}
