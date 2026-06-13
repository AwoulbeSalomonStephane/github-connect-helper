'use client'

import { motion } from 'framer-motion'
import { Calendar, Building2, Users, MapPin } from 'lucide-react'

const stats = [
  { label: 'Events Listed', value: '2,400+', icon: Calendar, description: 'Parties, concerts & festivals' },
  { label: 'Luxury Villas', value: '850+', icon: Building2, description: 'From Kribi to Douala' },
  { label: 'Active Users', value: '120K+', icon: Users, description: 'Cameroonians vibing daily' },
  { label: 'Cities Covered', value: '12', icon: MapPin, description: 'Coast to highlands' },
]

export function StatisticsSection() {
  return (
    <section className="py-16 sm:py-20 border-y border-border/60 bg-secondary/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-sm font-medium text-primary mb-2 block">By the numbers</span>
          <h2 className="text-3xl sm:text-4xl font-bold">Cameroon&apos;s vibe economy</h2>
          <p className="text-muted-foreground mt-2 max-w-xl mx-auto">
            Join thousands discovering events, villas, and experiences across the nation.
          </p>
        </motion.div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className="text-center p-6 rounded-2xl bg-card border border-border card-shadow"
            >
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary mb-4">
                <stat.icon className="h-6 w-6" />
              </div>
              <p className="text-3xl sm:text-4xl font-bold text-gradient">{stat.value}</p>
              <p className="font-semibold mt-2">{stat.label}</p>
              <p className="text-sm text-muted-foreground mt-1">{stat.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
