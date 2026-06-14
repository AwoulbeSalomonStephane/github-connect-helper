

import Link from '@tanstack/react-router'
import Image from '@/components/compat/next-image'
import { motion } from 'framer-motion'
import { Star, MapPin, Users, Heart, ArrowRight, Bed, Bath, Wifi, Car } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

const featuredVillas = [
  {
    id: '1',
    name: 'Ocean View Paradise',
    owner: 'Jean-Pierre M.',
    location: 'Kribi',
    pricePerNight: 150000,
    currency: 'XAF',
    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&auto=format&fit=crop&q=80',
    images: 12,
    rating: 4.9,
    reviews: 48,
    bedrooms: 4,
    bathrooms: 3,
    guests: 8,
    amenities: ['Pool', 'WiFi', 'Parking', 'Beach Access'],
    featured: true,
  },
  {
    id: '2',
    name: 'Luxury Hillside Retreat',
    owner: 'Marie C.',
    location: 'Limbe',
    pricePerNight: 120000,
    currency: 'XAF',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&auto=format&fit=crop&q=80',
    images: 15,
    rating: 4.8,
    reviews: 32,
    bedrooms: 3,
    bathrooms: 2,
    guests: 6,
    amenities: ['Pool', 'WiFi', 'Garden', 'BBQ'],
    featured: false,
  },
  {
    id: '3',
    name: 'Modern City Penthouse',
    owner: 'Emmanuel A.',
    location: 'Douala',
    pricePerNight: 200000,
    currency: 'XAF',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&auto=format&fit=crop&q=80',
    images: 20,
    rating: 5.0,
    reviews: 67,
    bedrooms: 5,
    bathrooms: 4,
    guests: 10,
    amenities: ['Pool', 'WiFi', 'Gym', 'Concierge'],
    featured: true,
  },
  {
    id: '4',
    name: 'Tropical Garden Estate',
    owner: 'Fatou N.',
    location: 'Yaoundé',
    pricePerNight: 95000,
    currency: 'XAF',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&auto=format&fit=crop&q=80',
    images: 10,
    rating: 4.7,
    reviews: 23,
    bedrooms: 3,
    bathrooms: 2,
    guests: 6,
    amenities: ['Pool', 'WiFi', 'Garden', 'Parking'],
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

export function VillaCard({ villa, index }: { villa: typeof featuredVillas[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="group"
    >
      <Link href={`/villas/${villa.id}`}>
        <div className="relative bg-card rounded-2xl overflow-hidden border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:shadow-primary/5">
          {/* Image */}
          <div className="relative aspect-[4/3] overflow-hidden">
            <Image
              src={villa.image}
              alt={villa.name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            
            {/* Badges */}
            <div className="absolute top-3 left-3 flex gap-2">
              {villa.featured && (
                <Badge className="bg-primary text-primary-foreground">
                  Featured
                </Badge>
              )}
              <Badge variant="secondary" className="bg-background/90 backdrop-blur-sm">
                {villa.images} photos
              </Badge>
            </div>

            {/* Like Button */}
            <button className="absolute top-3 right-3 p-2 rounded-full bg-background/90 backdrop-blur-sm hover:bg-primary hover:text-primary-foreground transition-colors">
              <Heart className="h-4 w-4" />
            </button>

            {/* Price Badge */}
            <div className="absolute bottom-3 left-3">
              <div className="bg-background/90 backdrop-blur-sm rounded-lg px-3 py-1.5">
                <span className="text-lg font-bold">{formatPrice(villa.pricePerNight, villa.currency)}</span>
                <span className="text-sm text-muted-foreground"> /night</span>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-primary text-primary" />
                <span className="font-semibold">{villa.rating}</span>
                <span className="text-sm text-muted-foreground">({villa.reviews} reviews)</span>
              </div>
            </div>
            
            <h3 className="font-semibold text-lg mb-1 group-hover:text-primary transition-colors line-clamp-1">
              {villa.name}
            </h3>
            
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
              <MapPin className="h-4 w-4" />
              <span>{villa.location}</span>
            </div>

            {/* Amenities */}
            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
              <span className="flex items-center gap-1">
                <Bed className="h-4 w-4" />
                {villa.bedrooms}
              </span>
              <span className="flex items-center gap-1">
                <Bath className="h-4 w-4" />
                {villa.bathrooms}
              </span>
              <span className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                {villa.guests}
              </span>
            </div>

            <div className="flex flex-wrap gap-1.5 pt-3 border-t border-border">
              {villa.amenities.slice(0, 3).map((amenity) => (
                <Badge key={amenity} variant="secondary" className="text-xs">
                  {amenity}
                </Badge>
              ))}
              {villa.amenities.length > 3 && (
                <Badge variant="secondary" className="text-xs">
                  +{villa.amenities.length - 3}
                </Badge>
              )}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

export function FeaturedVillasSection() {
  return (
    <section className="py-16 sm:py-24 bg-secondary/30">
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
              Premium Stays
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl sm:text-4xl font-bold"
            >
              Featured Villas
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-muted-foreground mt-2"
            >
              Handpicked luxury properties for your perfect getaway
            </motion.p>
          </div>
          <Link href="/villas">
            <Button variant="outline" className="gap-2">
              View All Villas
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>

        {/* Villas Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredVillas.map((villa, index) => (
            <VillaCard key={villa.id} villa={villa} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
