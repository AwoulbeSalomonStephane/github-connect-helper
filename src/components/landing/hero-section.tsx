

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, MapPin, Calendar, Users } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const cities = [
  'Douala',
  'Yaoundé',
  'Kribi',
  'Limbe',
  'Buea',
  'Bamenda',
  'Bafoussam',
]

const categories = [
  'All Categories',
  'Events',
  'Villas',
  'Experiences',
  'Nightlife',
]

export function HeroSection() {
  const [searchType, setSearchType] = useState<'events' | 'villas'>('events')

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-secondary/20" />
      
      {/* Decorative Elements */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              The Premier Experience Platform in Cameroon
            </span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight mb-6"
          >
            <span className="block">Discover Amazing</span>
            <span className="block text-gradient">Events & Experiences</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-12"
          >
            From exclusive pool parties to luxury villas, immerse yourself in the vibrant culture 
            and nightlife of Cameroon. Your next unforgettable experience awaits.
          </motion.p>
        </div>

        {/* Search Box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="max-w-4xl mx-auto"
        >
          {/* Search Type Toggle */}
          <div className="flex justify-center mb-4">
            <div className="inline-flex p-1 rounded-full bg-secondary">
              <button
                onClick={() => setSearchType('events')}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                  searchType === 'events'
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Events
              </button>
              <button
                onClick={() => setSearchType('villas')}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                  searchType === 'villas'
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Villas
              </button>
            </div>
          </div>

          {/* Search Form */}
          <div className="bg-card border border-border rounded-2xl p-2 shadow-lg">
            <div className="flex flex-col md:flex-row gap-2">
              {/* Search Input */}
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder={searchType === 'events' ? 'Search events, artists, venues...' : 'Search villas, amenities...'}
                  className="pl-12 h-12 border-0 bg-transparent focus-visible:ring-0"
                />
              </div>

              {/* Location Select */}
              <div className="md:w-48">
                <Select>
                  <SelectTrigger className="h-12 border-0 bg-secondary/50">
                    <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                    <SelectValue placeholder="Location" />
                  </SelectTrigger>
                  <SelectContent>
                    {cities.map((city) => (
                      <SelectItem key={city} value={city.toLowerCase()}>
                        {city}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Date/Guests */}
              {searchType === 'events' ? (
                <div className="md:w-48">
                  <Select>
                    <SelectTrigger className="h-12 border-0 bg-secondary/50">
                      <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                      <SelectValue placeholder="When" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="today">Today</SelectItem>
                      <SelectItem value="tomorrow">Tomorrow</SelectItem>
                      <SelectItem value="weekend">This Weekend</SelectItem>
                      <SelectItem value="week">This Week</SelectItem>
                      <SelectItem value="month">This Month</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              ) : (
                <div className="md:w-48">
                  <Select>
                    <SelectTrigger className="h-12 border-0 bg-secondary/50">
                      <Users className="h-4 w-4 mr-2 text-muted-foreground" />
                      <SelectValue placeholder="Guests" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1-2">1-2 guests</SelectItem>
                      <SelectItem value="3-4">3-4 guests</SelectItem>
                      <SelectItem value="5-8">5-8 guests</SelectItem>
                      <SelectItem value="9+">9+ guests</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}

              {/* Search Button */}
              <Button size="lg" className="h-12 px-8 cameroon-gradient text-primary-foreground">
                <Search className="h-4 w-4 mr-2" />
                Search
              </Button>
            </div>
          </div>

          {/* Quick Filters */}
          <div className="flex flex-wrap justify-center gap-2 mt-6">
            <span className="text-sm text-muted-foreground">Popular:</span>
            {['Pool Parties', 'Concerts', 'Nightclubs', 'Beach Villas', 'Cultural Events'].map((tag) => (
              <button
                key={tag}
                className="px-3 py-1 rounded-full bg-secondary text-sm text-muted-foreground hover:text-foreground hover:bg-secondary/80 transition-colors"
              >
                {tag}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-wrap justify-center gap-8 sm:gap-16 mt-16"
        >
          {[
            { value: '500+', label: 'Events Monthly' },
            { value: '200+', label: 'Luxury Villas' },
            { value: '50K+', label: 'Happy Users' },
            { value: '100+', label: 'Organizers' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-3xl sm:text-4xl font-bold text-gradient">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
