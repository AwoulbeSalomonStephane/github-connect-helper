"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { 
  ArrowLeft, Heart, Share2, MapPin, Star, Users, Bed, Bath, 
  Wifi, Car, Waves, TreePine, ChefHat, Shield, Calendar,
  Check, MessageCircle, Phone, Mail, Clock, Sparkles
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"

const villa = {
  id: "1",
  name: "Villa Paloma Kribi",
  location: "Kribi Beach, Cameroon",
  rating: 4.9,
  reviews: 127,
  price: 150000,
  images: [
    "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200&h=800&fit=crop",
    "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=600&fit=crop",
  ],
  description: "Experience paradise at Villa Paloma, a stunning beachfront property nestled along the pristine shores of Kribi. This luxurious villa offers the perfect blend of modern comfort and natural beauty, with direct beach access and breathtaking ocean views from every room.",
  guests: 10,
  bedrooms: 5,
  bathrooms: 4,
  amenities: [
    { icon: Wifi, label: "High-Speed WiFi" },
    { icon: Car, label: "Free Parking" },
    { icon: Waves, label: "Private Pool" },
    { icon: TreePine, label: "Garden" },
    { icon: ChefHat, label: "Full Kitchen" },
    { icon: Shield, label: "24/7 Security" },
  ],
  host: {
    name: "Marie Ndongo",
    image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=200&h=200&fit=crop",
    verified: true,
    responseRate: 98,
    responseTime: "within 1 hour",
    listings: 5,
    joined: "2020",
  },
  highlights: [
    "Beachfront location with private access",
    "Infinity pool overlooking the ocean",
    "Professional chef available on request",
    "Perfect for family gatherings and events",
  ],
}

const reviews = [
  {
    id: 1,
    user: { name: "Jean-Pierre K.", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop" },
    rating: 5,
    date: "November 2024",
    comment: "Incroyable villa! The views are absolutely stunning and Marie was an amazing host. We had a family reunion here and everyone loved it. Will definitely come back!",
  },
  {
    id: 2,
    user: { name: "Aminata F.", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop" },
    rating: 5,
    date: "October 2024",
    comment: "Perfect for our wedding pre-party! The villa is even more beautiful in person. The pool area was perfect for our photos. Highly recommend!",
  },
]

export default function VillaDetailsPage() {
  const [selectedImage, setSelectedImage] = useState(0)
  const [isLiked, setIsLiked] = useState(false)

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-16">
        {/* Image Gallery */}
        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-2 h-[50vh] md:h-[60vh]">
            <motion.div 
              className="md:col-span-2 md:row-span-2 relative cursor-pointer overflow-hidden"
              whileHover={{ scale: 1.01 }}
            >
              <Image
                src={villa.images[0]}
                alt={villa.name}
                fill
                className="object-cover"
              />
            </motion.div>
            {villa.images.slice(1).map((img, i) => (
              <motion.div 
                key={i}
                className="relative hidden md:block cursor-pointer overflow-hidden"
                whileHover={{ scale: 1.02 }}
              >
                <Image src={img} alt={`${villa.name} ${i + 2}`} fill className="object-cover" />
              </motion.div>
            ))}
          </div>
          
          {/* Overlay Actions */}
          <div className="absolute top-4 left-4 right-4 flex justify-between items-center">
            <Link href="/villas">
              <Button variant="secondary" size="icon" className="rounded-full bg-background/90 backdrop-blur-sm">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <div className="flex gap-2">
              <Button 
                variant="secondary" 
                size="icon" 
                className="rounded-full bg-background/90 backdrop-blur-sm"
                onClick={() => setIsLiked(!isLiked)}
              >
                <Heart className={`h-5 w-5 ${isLiked ? "fill-destructive text-destructive" : ""}`} />
              </Button>
              <Button variant="secondary" size="icon" className="rounded-full bg-background/90 backdrop-blur-sm">
                <Share2 className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Header */}
              <div>
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">{villa.name}</h1>
                    <div className="flex items-center gap-4 text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        <span>{villa.location}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-accent text-accent" />
                        <span className="font-medium text-foreground">{villa.rating}</span>
                        <span>({villa.reviews} reviews)</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-primary" />
                    <span>{villa.guests} guests</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Bed className="h-5 w-5 text-primary" />
                    <span>{villa.bedrooms} bedrooms</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Bath className="h-5 w-5 text-primary" />
                    <span>{villa.bathrooms} bathrooms</span>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Host Info */}
              <Link href="/host/1" className="flex items-center gap-4 hover:opacity-90 transition-opacity">
                <Avatar className="h-14 w-14">
                  <AvatarImage src={villa.host.image} />
                  <AvatarFallback>{villa.host.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold">Hosted by {villa.host.name}</h3>
                    {villa.host.verified && (
                      <Badge variant="secondary" className="bg-primary/10 text-primary">
                        <Shield className="h-3 w-3 mr-1" />
                        Verified
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {villa.host.listings} listings - Hosting since {villa.host.joined}
                  </p>
                </div>
              </Link>

              <Separator />

              {/* Highlights */}
              <div>
                <h2 className="text-xl font-semibold mb-4">Why you&apos;ll love this place</h2>
                <div className="grid gap-3">
                  {villa.highlights.map((highlight, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Sparkles className="h-3 w-3 text-primary" />
                      </div>
                      <span>{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              {/* Description */}
              <div>
                <h2 className="text-xl font-semibold mb-4">About this villa</h2>
                <p className="text-muted-foreground leading-relaxed">{villa.description}</p>
              </div>

              <Separator />

              {/* Amenities */}
              <div>
                <h2 className="text-xl font-semibold mb-4">What this place offers</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {villa.amenities.map((amenity, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50">
                      <amenity.icon className="h-5 w-5 text-primary" />
                      <span>{amenity.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              {/* Reviews */}
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold">
                    Reviews
                    <span className="text-muted-foreground font-normal ml-2">({villa.reviews})</span>
                  </h2>
                  <div className="flex items-center gap-1">
                    <Star className="h-5 w-5 fill-accent text-accent" />
                    <span className="font-semibold">{villa.rating}</span>
                  </div>
                </div>
                
                <div className="space-y-6">
                  {reviews.map((review) => (
                    <div key={review.id} className="p-4 rounded-xl bg-secondary/30">
                      <div className="flex items-start gap-3 mb-3">
                        <Avatar>
                          <AvatarImage src={review.user.image} />
                          <AvatarFallback>{review.user.name[0]}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h4 className="font-medium">{review.user.name}</h4>
                            <span className="text-sm text-muted-foreground">{review.date}</span>
                          </div>
                          <div className="flex items-center gap-1 mt-1">
                            {Array.from({ length: review.rating }).map((_, i) => (
                              <Star key={i} className="h-3 w-3 fill-accent text-accent" />
                            ))}
                          </div>
                        </div>
                      </div>
                      <p className="text-muted-foreground text-sm">{review.comment}</p>
                    </div>
                  ))}
                </div>
                
                <Button variant="outline" className="w-full mt-4">
                  Show all {villa.reviews} reviews
                </Button>
              </div>
            </div>

            {/* Booking Card */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-card border border-border rounded-2xl p-6 card-shadow"
                >
                  <div className="flex items-baseline justify-between mb-6">
                    <div>
                      <span className="text-2xl font-bold">{villa.price.toLocaleString()} FCFA</span>
                      <span className="text-muted-foreground"> / night</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm">
                      <Star className="h-4 w-4 fill-accent text-accent" />
                      <span className="font-medium">{villa.rating}</span>
                    </div>
                  </div>

                  {/* Date Selection */}
                  <div className="border border-border rounded-xl overflow-hidden mb-4">
                    <div className="grid grid-cols-2 divide-x divide-border">
                      <div className="p-3">
                        <label className="text-xs font-medium text-muted-foreground">CHECK-IN</label>
                        <p className="text-sm font-medium">Add date</p>
                      </div>
                      <div className="p-3">
                        <label className="text-xs font-medium text-muted-foreground">CHECK-OUT</label>
                        <p className="text-sm font-medium">Add date</p>
                      </div>
                    </div>
                    <div className="border-t border-border p-3">
                      <label className="text-xs font-medium text-muted-foreground">GUESTS</label>
                      <p className="text-sm font-medium">1 guest</p>
                    </div>
                  </div>

                  <Link href="/booking/villa?villaId=1">
                    <Button className="w-full h-12 text-base font-semibold cameroon-gradient text-primary-foreground mb-4">
                      <Calendar className="h-5 w-5 mr-2" />
                      Reserve now
                    </Button>
                  </Link>

                  <p className="text-center text-sm text-muted-foreground mb-6">
                    You won&apos;t be charged yet
                  </p>

                  {/* Price Breakdown */}
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="underline">{villa.price.toLocaleString()} FCFA x 3 nights</span>
                      <span>{(villa.price * 3).toLocaleString()} FCFA</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="underline">Cleaning fee</span>
                      <span>25,000 FCFA</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="underline">Service fee</span>
                      <span>15,000 FCFA</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-semibold text-base">
                      <span>Total</span>
                      <span>{(villa.price * 3 + 25000 + 15000).toLocaleString()} FCFA</span>
                    </div>
                  </div>
                </motion.div>

                {/* Contact Host */}
                <div className="mt-4 p-4 bg-secondary/50 rounded-xl">
                  <h3 className="font-medium mb-3">Contact Host</h3>
                  <div className="flex gap-2">
                    <Link href="/messages" className="flex-1">
                      <Button variant="outline" size="sm" className="w-full">
                        <MessageCircle className="h-4 w-4 mr-2" />
                        Message
                      </Button>
                    </Link>
                    <Button variant="outline" size="sm" className="flex-1">
                      <Phone className="h-4 w-4 mr-2" />
                      Call
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
