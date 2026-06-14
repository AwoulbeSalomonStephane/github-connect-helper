

import { motion } from 'framer-motion'
import { Apple, PlayCircle, Star, Download, Smartphone } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Image from '@/components/compat/next-image'

export function DownloadAppSection() {
  return (
    <section className="py-16 sm:py-24 bg-background overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative bg-gradient-to-br from-primary/10 via-background to-accent/10 rounded-3xl p-8 sm:p-12 lg:p-16 border border-border">
          {/* Background Decorations */}
          <div className="absolute top-0 left-1/4 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-accent/10 rounded-full blur-3xl" />
          
          <div className="relative grid lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                <Smartphone className="h-4 w-4" />
                Coming Soon
              </span>
              
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
                Get the VibeCam App
              </h2>
              
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Experience Cameroon&apos;s premier event and villa platform on the go. 
                Book tickets, reserve stays, and discover experiences — all from your pocket.
              </p>
              
              {/* App Features */}
              <div className="grid sm:grid-cols-2 gap-4 mb-8">
                {[
                  { icon: Star, text: 'Exclusive app-only deals' },
                  { icon: Download, text: 'Offline ticket access' },
                  { icon: Smartphone, text: 'Real-time notifications' },
                  { icon: PlayCircle, text: 'Live event updates' },
                ].map((feature) => (
                  <div key={feature.text} className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center">
                      <feature.icon className="h-5 w-5 text-primary" />
                    </div>
                    <span className="text-sm">{feature.text}</span>
                  </div>
                ))}
              </div>
              
              {/* Download Buttons */}
              <div className="flex flex-wrap gap-4">
                <Button size="lg" className="gap-2 h-14 px-6">
                  <Apple className="h-6 w-6" />
                  <div className="text-left">
                    <p className="text-xs opacity-80">Download on the</p>
                    <p className="font-semibold">App Store</p>
                  </div>
                </Button>
                <Button size="lg" variant="outline" className="gap-2 h-14 px-6">
                  <PlayCircle className="h-6 w-6" />
                  <div className="text-left">
                    <p className="text-xs opacity-80">Get it on</p>
                    <p className="font-semibold">Google Play</p>
                  </div>
                </Button>
              </div>
              
              {/* Rating */}
              <div className="flex items-center gap-4 mt-8 pt-8 border-t border-border">
                <div className="flex gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground">
                  <span className="font-semibold text-foreground">4.9</span> rating • 10K+ downloads
                </p>
              </div>
            </motion.div>
            
            {/* Phone Mockup */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="relative hidden lg:block"
            >
              <div className="relative mx-auto w-72">
                {/* Phone Frame */}
                <div className="relative bg-card rounded-[3rem] p-3 border-4 border-secondary shadow-2xl">
                  <div className="absolute top-8 left-1/2 -translate-x-1/2 w-24 h-6 bg-secondary rounded-full" />
                  <div className="relative rounded-[2.5rem] overflow-hidden aspect-[9/19] bg-background">
                    <Image
                      src="https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=400&auto=format&fit=crop&q=80"
                      alt="VibeCam App"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
                    <div className="absolute bottom-0 inset-x-0 p-6">
                      <div className="bg-card/90 backdrop-blur-sm rounded-2xl p-4 border border-border">
                        <p className="text-sm font-semibold mb-1">Sunset Pool Party</p>
                        <p className="text-xs text-muted-foreground">Dec 15 • Douala</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Floating Elements */}
                <div className="absolute -top-4 -right-4 bg-card rounded-xl p-3 border border-border shadow-lg">
                  <p className="text-2xl font-bold text-gradient">500+</p>
                  <p className="text-xs text-muted-foreground">Events</p>
                </div>
                
                <div className="absolute -bottom-4 -left-4 bg-card rounded-xl p-3 border border-border shadow-lg">
                  <p className="text-2xl font-bold text-gradient">200+</p>
                  <p className="text-xs text-muted-foreground">Villas</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
