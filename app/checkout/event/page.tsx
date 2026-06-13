'use client'

import { Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { CreditCard, Smartphone, ChevronLeft, Shield } from 'lucide-react'
import { SiteShell } from '@/components/layout/site-shell'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Separator } from '@/components/ui/separator'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

function CheckoutContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const eventId = searchParams.get('eventId') || '1'
  const qty = Number(searchParams.get('qty') || '2')
  const ticketName = searchParams.get('ticket') || 'General Admission'
  const unitPrice = Number(searchParams.get('price') || '20000')
  const total = unitPrice * qty
  const fees = Math.round(total * 0.05)

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 py-8">
      <Link href={`/events/${eventId}`}>
        <Button variant="ghost" size="sm" className="mb-6 gap-2">
          <ChevronLeft className="h-4 w-4" />
          Back to event
        </Button>
      </Link>

      <h1 className="text-2xl font-bold mb-8">Checkout</h1>

      <div className="grid lg:grid-cols-5 gap-8">
        <div className="lg:col-span-3 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Contact details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="first">First name</Label>
                  <Input id="first" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="last">Last name</Label>
                  <Input id="last" required />
                </div>
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

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Payment method</CardTitle>
            </CardHeader>
            <CardContent>
              <RadioGroup defaultValue="momo" className="space-y-3">
                <label className="flex items-center gap-3 p-4 rounded-xl border border-border cursor-pointer has-[:checked]:border-primary">
                  <RadioGroupItem value="momo" />
                  <Smartphone className="h-5 w-5 text-primary" />
                  <span className="font-medium">Mobile Money (MTN / Orange)</span>
                </label>
                <label className="flex items-center gap-3 p-4 rounded-xl border border-border cursor-pointer has-[:checked]:border-primary">
                  <RadioGroupItem value="card" />
                  <CreditCard className="h-5 w-5 text-primary" />
                  <span className="font-medium">Credit / Debit Card</span>
                </label>
              </RadioGroup>
            </CardContent>
          </Card>

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Shield className="h-4 w-4 text-primary" />
            Secure payment · Encrypted checkout
          </div>
        </div>

        <div className="lg:col-span-2">
          <Card className="sticky top-24">
            <CardContent className="p-6">
              <div className="flex gap-4 mb-4">
                <div className="relative h-20 w-20 rounded-xl overflow-hidden shrink-0">
                  <Image
                    src="https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=200&auto=format&fit=crop&q=80"
                    alt=""
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="font-semibold">Sunset Pool Party</p>
                  <p className="text-sm text-muted-foreground">Dec 15 · Douala</p>
                </div>
              </div>
              <Separator className="my-4" />
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{ticketName} × {qty}</span>
                  <span>{total.toLocaleString()} XAF</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Service fee</span>
                  <span>{fees.toLocaleString()} XAF</span>
                </div>
              </div>
              <Separator className="my-4" />
              <div className="flex justify-between font-bold text-lg mb-6">
                <span>Total</span>
                <span>{(total + fees).toLocaleString()} XAF</span>
              </div>
              <Button
                className="w-full h-12 cameroon-gradient text-primary-foreground"
                onClick={() => router.push(`/checkout/event/success?eventId=${eventId}&qty=${qty}`)}
              >
                Pay {(total + fees).toLocaleString()} XAF
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default function EventCheckoutPage() {
  return (
    <SiteShell showMobileNav={false}>
      <Suspense fallback={<div className="p-8 text-center text-muted-foreground">Loading checkout...</div>}>
        <CheckoutContent />
      </Suspense>
    </SiteShell>
  )
}
