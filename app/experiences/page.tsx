'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { MapPin, Star, ArrowRight, Sparkles } from 'lucide-react'
import { Navbar, MobileNav } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

const experiences = [
  {
    id: '1',
    title: 'Kribi Beach Sunset Tour',
    location: 'Kribi',
    price: 25000,
    currency: 'XAF',
    rating: 4.9,
    reviews: 124,
    category: 'Beach & Nature',
    image:
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop&q=80',
  },
  {
    id: '2',
    title: 'Douala Food & Culture Walk',
    location: 'Douala',
    price: 18000,
    currency: 'XAF',
    rating: 4.8,
    reviews: 89,
    category: 'Food & Culture',
    image:
      'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&auto=format&fit=crop&q=80',
  },
  {
    id: '3',
    title: 'Mount Cameroon Hiking Day',
    location: 'Buea',
    price: 45000,
    currency: 'XAF',
    rating: 4.9,
    reviews: 67,
    category: 'Adventure',
    image:
      'https://images.unsplash.com/photo-1464822759023-fed622a2d3ea?w=800&auto=format&fit=crop&q=80',
  },
  {
    id: '4',
    title: 'Limbe Wildlife & Botanic Garden',
    location: 'Limbe',
    price: 22000,
    currency: 'XAF',
    rating: 4.7,
    reviews: 156,
    category: 'Wildlife',
    image:
      'https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=800&auto=format&fit=crop&q=80',
  },
  {
    id: '5',
    title: 'Yaoundé Art & Music Night',
    location: 'Yaoundé',
    price: 35000,
    currency: 'XAF',
    rating: 4.8,
    reviews: 92,
    category: 'Nightlife',
    image:
      'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&auto=format&fit=crop&q=80',
  },
  {
    id: '6',
    title: 'Bamenda Highlands Village Tour',
    location: 'Bamenda',
    price: 30000,
    currency: 'XAF',
    rating: 4.9,
    reviews: 43,
    category: 'Cultural',
    image:
      'https://images.unsplash.com/photo-1528183429752-a97d0bf99b5a?w=800&auto=format&fit=crop&q=80',
  },
]

export default function ExperiencesPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-16 pb-20 md:pb-0">
        <section className="py-12 sm:py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-10">
              <span className="text-sm font-medium text-primary mb-2 flex items-center gap-2">
                <Sparkles className="h-4 w-4" />
                Local Adventures
              </span>
              <h1 className="text-3xl sm:text-4xl font-bold mb-2">Experiences</h1>
              <p className="text-muted-foreground max-w-2xl">
                Discover guided tours, cultural walks, adventure trips, and unique activities across Cameroon.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {experiences.map((experience, index) => (
                <motion.article
                  key={experience.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="group"
                >
                  <Link href={`/experiences/${experience.id}`}>
                    <div className="relative bg-card rounded-2xl overflow-hidden border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:shadow-primary/5">
                      <div className="relative aspect-[4/3] overflow-hidden">
                        <Image
                          src={experience.image}
                          alt={experience.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <Badge className="absolute top-3 left-3">{experience.category}</Badge>
                      </div>
                      <div className="p-4">
                        <h2 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                          {experience.title}
                        </h2>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                          <MapPin className="h-4 w-4 shrink-0" />
                          {experience.location}
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="font-semibold">
                            {experience.price.toLocaleString()} {experience.currency}
                          </span>
                          <span className="flex items-center gap-1 text-sm">
                            <Star className="h-4 w-4 fill-primary text-primary" />
                            {experience.rating} ({experience.reviews})
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </div>

            <div className="mt-12 text-center">
              <p className="text-muted-foreground mb-4">
                Looking for parties, concerts, and festivals?
              </p>
              <Link href="/events">
                <Button className="gap-2">
                  Browse Events
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <MobileNav />
    </div>
  )
}
