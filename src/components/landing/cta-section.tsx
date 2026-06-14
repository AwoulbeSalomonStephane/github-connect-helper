

import { motion } from 'framer-motion'
import { ArrowRight, Sparkles, Building2, Calendar } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Link } from '@/components/compat/link'

export function CTASection() {
  return (
    <section className="py-16 sm:py-24 bg-secondary/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* For Event Organizers */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="relative bg-card rounded-3xl p-8 sm:p-10 border border-border overflow-hidden group"
          >
            {/* Background Decoration */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-primary/20 transition-colors" />
            
            <div className="relative">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                <Calendar className="h-7 w-7 text-primary" />
              </div>
              
              <h3 className="text-2xl sm:text-3xl font-bold mb-4">
                Are You an Event Organizer?
              </h3>
              
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Join hundreds of successful organizers on VibeCam. Reach thousands of potential 
                attendees, manage ticket sales, and grow your brand with our powerful tools.
              </p>
              
              <ul className="space-y-3 mb-8">
                {[
                  'Free to list your events',
                  'Powerful analytics dashboard',
                  'Easy ticket management',
                  'Direct payments to your account',
                ].map((feature) => (
                  <li key={feature} className="flex items-center gap-3 text-sm">
                    <Sparkles className="h-4 w-4 text-primary" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              
              <Link href="/become-organizer">
                <Button size="lg" className="gap-2">
                  Start Hosting Events
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* For Villa Owners */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="relative bg-card rounded-3xl p-8 sm:p-10 border border-border overflow-hidden group"
          >
            {/* Background Decoration */}
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 group-hover:bg-accent/20 transition-colors" />
            
            <div className="relative">
              <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center mb-6">
                <Building2 className="h-7 w-7 text-accent" />
              </div>
              
              <h3 className="text-2xl sm:text-3xl font-bold mb-4">
                Own a Villa or Property?
              </h3>
              
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Turn your property into a profitable venture. List your villa on VibeCam and 
                connect with travelers seeking premium accommodations in Cameroon.
              </p>
              
              <ul className="space-y-3 mb-8">
                {[
                  'No upfront fees',
                  'Professional photography support',
                  'Booking management tools',
                  'Secure payment processing',
                ].map((feature) => (
                  <li key={feature} className="flex items-center gap-3 text-sm">
                    <Sparkles className="h-4 w-4 text-accent" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              
              <Link href="/list-villa">
                <Button size="lg" variant="outline" className="gap-2">
                  List Your Property
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
