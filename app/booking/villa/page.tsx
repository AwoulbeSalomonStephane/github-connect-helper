'use client'

import { Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { ChevronLeft, Calendar, Users, Shield } from 'lucide-react'
import { SiteShell } from '@/components/layout/site-shell'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

function BookingContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const villaId = searchParams.get('villaId') || '1'
  const nights = 3
  const nightly = 150000
  const cleaning = 25000
  const service = 15000
  const total = nightly * nights + cleaning + service

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 py-8">
      <Link href={`/villas/${villaId}`}>
        <Button variant="ghost" size="sm" className="mb-6 gap-2">
          <ChevronLeft className="h-4 w-4" />
          Back to villa
        </Button>
      </Link>

      <h1 className="text-2xl font-bold mb-2">Confirm your booking</h1>
      <p className="text-muted-foreground mb-8">Step 2 of 3 — Review and pay</p>

      <div className="grid lg:grid-cols-5 gap-8">
        <div className="lg:col-span-3 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Trip details
              </CardTitle>
            </CardHeader>
            <CardContent className="grid sm:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground">Check-in</p>
                <p className="font-medium">Dec 20, 2025</p>
              </div>
              <div>
                <p className="text-muted-foreground">Check-out</p>
                <p className="font-medium">Dec 23, 2025</p>
              </div>
              <div className="sm:col-span-2 flex items-center gap-2">
                <Users className="h-4 w-4 text-muted-foreground" />
                <span>4 guests</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Guest information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full name</Label>
                <Input id="name" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" placeholder="+237" required />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2">
          <Card className="sticky top-24">
            <CardContent className="p-6">
              <div className="flex gap-4 mb-4">
                <div className="relative h-20 w-20 rounded-xl overflow-hidden shrink-0">
                  <Image
                    src="https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=200&auto=format&fit=crop&q=80"
                    alt=""
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="font-semibold">Ocean View Paradise</p>
                  <p className="text-sm text-muted-foreground">Kribi</p>
                </div>
              </div>
              <Separator className="my-4" />
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{nightly.toLocaleString()} XAF × {nights} nights</span>
                  <span>{(nightly * nights).toLocaleString()} XAF</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Cleaning fee</span>
                  <span>{cleaning.toLocaleString()} XAF</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Service fee</span>
                  <span>{service.toLocaleString()} XAF</span>
                </div>
              </div>
              <Separator className="my-4" />
              <div className="flex justify-between font-bold text-lg mb-6">
                <span>Total</span>
                <span>{total.toLocaleString()} XAF</span>
              </div>
              <Button
                className="w-full h-12 cameroon-gradient text-primary-foreground"
                onClick={() => router.push(`/booking/villa/success?villaId=${villaId}`)}
              >
                Confirm & pay
              </Button>
              <p className="text-xs text-center text-muted-foreground mt-3 flex items-center justify-center gap-1">
                <Shield className="h-3 w-3" />
                You won&apos;t be charged until confirmed
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default function VillaBookingPage() {
  return (
    <SiteShell showMobileNav={false}>
      <Suspense fallback={<div className="p-8 text-center text-muted-foreground">Loading...</div>}>
        <BookingContent />
      </Suspense>
    </SiteShell>
  )
}
