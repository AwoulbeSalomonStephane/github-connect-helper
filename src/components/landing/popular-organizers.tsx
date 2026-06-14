

import { Link } from '@/components/compat/link'
import Image from '@/components/compat/next-image'
import { motion } from 'framer-motion'
import { CheckCircle, Users, Calendar, Star, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

const popularOrganizers = [
  {
    id: '1',
    name: 'Vibe Events',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&auto=format&fit=crop&q=80',
    coverImage: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&auto=format&fit=crop&q=80',
    verified: true,
    followers: 15420,
    totalEvents: 89,
    rating: 4.9,
    category: 'Nightlife & Parties',
    bio: 'Creating unforgettable nightlife experiences across Cameroon',
  },
  {
    id: '2',
    name: 'Culture Cameroon',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
    coverImage: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=800&auto=format&fit=crop&q=80',
    verified: true,
    followers: 8930,
    totalEvents: 45,
    rating: 4.8,
    category: 'Cultural Events',
    bio: 'Celebrating African heritage through music, art, and dance',
  },
  {
    id: '3',
    name: 'Beach Club Kribi',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&auto=format&fit=crop&q=80',
    coverImage: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?w=800&auto=format&fit=crop&q=80',
    verified: true,
    followers: 12100,
    totalEvents: 67,
    rating: 4.9,
    category: 'Beach Events',
    bio: 'Premium beach experiences on the coast of Cameroon',
  },
  {
    id: '4',
    name: 'Sports Arena',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&auto=format&fit=crop&q=80',
    coverImage: 'https://images.unsplash.com/photo-1461896836934- voices-against-injustice?w=800&auto=format&fit=crop&q=80',
    verified: false,
    followers: 5670,
    totalEvents: 32,
    rating: 4.7,
    category: 'Sports Events',
    bio: 'Bringing world-class sports events to local communities',
  },
]

function formatNumber(num: number) {
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K'
  }
  return num.toString()
}

export function OrganizerCard({ organizer, index }: { organizer: typeof popularOrganizers[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="group"
    >
      <Link href={`/organizer/${organizer.id}`}>
        <div className="relative bg-card rounded-2xl overflow-hidden border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:shadow-primary/5">
          {/* Cover Image */}
          <div className="relative h-24 overflow-hidden">
            <Image
              src={organizer.coverImage}
              alt={organizer.name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
          </div>

          {/* Avatar */}
          <div className="relative -mt-10 px-4">
            <div className="relative">
              <div className="w-20 h-20 rounded-full border-4 border-card overflow-hidden">
                <Image
                  src={organizer.avatar}
                  alt={organizer.name}
                  width={80}
                  height={80}
                  className="object-cover"
                />
              </div>
              {organizer.verified && (
                <div className="absolute bottom-0 right-0 bg-primary rounded-full p-1">
                  <CheckCircle className="h-4 w-4 text-primary-foreground" />
                </div>
              )}
            </div>
          </div>

          {/* Content */}
          <div className="p-4 pt-2">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
                {organizer.name}
              </h3>
            </div>
            
            <Badge variant="secondary" className="mb-2 text-xs">
              {organizer.category}
            </Badge>
            
            <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
              {organizer.bio}
            </p>

            <div className="flex items-center justify-between pt-3 border-t border-border">
              <div className="flex items-center gap-4 text-sm">
                <span className="flex items-center gap-1 text-muted-foreground">
                  <Users className="h-4 w-4" />
                  {formatNumber(organizer.followers)}
                </span>
                <span className="flex items-center gap-1 text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  {organizer.totalEvents}
                </span>
                <span className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-primary text-primary" />
                  {organizer.rating}
                </span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

export function PopularOrganizersSection() {
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
              Top Creators
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl sm:text-4xl font-bold"
            >
              Popular Organizers
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-muted-foreground mt-2"
            >
              Follow the best event creators and never miss their next event
            </motion.p>
          </div>
          <Link href="/organizers">
            <Button variant="outline" className="gap-2">
              View All Organizers
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>

        {/* Organizers Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {popularOrganizers.map((organizer, index) => (
            <OrganizerCard key={organizer.id} organizer={organizer} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
