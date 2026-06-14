

import { motion } from 'framer-motion'
import {
  Waves,
  Music,
  Tent,
  Moon,
  Drama,
  Trophy,
  Presentation,
  MapPin,
  Users,
} from 'lucide-react'
import { Link } from '@/components/compat/link'

const categories = [
  {
    id: 'pool-parties',
    name: 'Pool Parties',
    icon: Waves,
    count: 45,
    color: 'from-blue-500/20 to-cyan-500/20',
    iconColor: 'text-blue-500',
  },
  {
    id: 'concerts',
    name: 'Concerts',
    icon: Music,
    count: 89,
    color: 'from-purple-500/20 to-pink-500/20',
    iconColor: 'text-purple-500',
  },
  {
    id: 'festivals',
    name: 'Festivals',
    icon: Tent,
    count: 23,
    color: 'from-orange-500/20 to-red-500/20',
    iconColor: 'text-orange-500',
  },
  {
    id: 'nightlife',
    name: 'Nightlife',
    icon: Moon,
    count: 156,
    color: 'from-indigo-500/20 to-violet-500/20',
    iconColor: 'text-indigo-500',
  },
  {
    id: 'cultural',
    name: 'Cultural Events',
    icon: Drama,
    count: 67,
    color: 'from-amber-500/20 to-yellow-500/20',
    iconColor: 'text-amber-500',
  },
  {
    id: 'sports',
    name: 'Sports',
    icon: Trophy,
    count: 34,
    color: 'from-green-500/20 to-emerald-500/20',
    iconColor: 'text-green-500',
  },
  {
    id: 'conferences',
    name: 'Conferences',
    icon: Presentation,
    count: 28,
    color: 'from-slate-500/20 to-gray-500/20',
    iconColor: 'text-slate-500',
  },
  {
    id: 'tourism',
    name: 'Tourism',
    icon: MapPin,
    count: 42,
    color: 'from-teal-500/20 to-cyan-500/20',
    iconColor: 'text-teal-500',
  },
  {
    id: 'family',
    name: 'Family Events',
    icon: Users,
    count: 51,
    color: 'from-rose-500/20 to-pink-500/20',
    iconColor: 'text-rose-500',
  },
]

export function CategoriesSection() {
  return (
    <section className="py-16 sm:py-24 bg-secondary/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-sm font-medium text-primary mb-2 block"
          >
            Browse by Category
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl font-bold mb-4"
          >
            Explore Experiences
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground max-w-2xl mx-auto"
          >
            From wild pool parties to cultural festivals, find exactly what you&apos;re looking for
          </motion.p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              viewport={{ once: true }}
            >
              <Link href={`/events?category=${category.id}`}>
                <div className="group relative bg-card rounded-2xl p-6 border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 overflow-hidden">
                  {/* Background Gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-100 transition-opacity`} />
                  
                  <div className="relative">
                    <div className={`w-12 h-12 rounded-xl bg-secondary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform ${category.iconColor}`}>
                      <category.icon className="h-6 w-6" />
                    </div>
                    <h3 className="font-semibold mb-1 group-hover:text-primary transition-colors">
                      {category.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {category.count} events
                    </p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
