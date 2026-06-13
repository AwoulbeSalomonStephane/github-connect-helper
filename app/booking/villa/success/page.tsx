import Link from 'next/link'
import { CheckCircle } from 'lucide-react'
import { SiteShell } from '@/components/layout/site-shell'
import { Button } from '@/components/ui/button'

export default function VillaBookingSuccessPage() {
  return (
    <SiteShell>
      <div className="mx-auto max-w-lg px-4 py-16 text-center">
        <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 text-primary mb-6">
          <CheckCircle className="h-12 w-12" />
        </div>
        <h1 className="text-3xl font-bold mb-2">Booking confirmed!</h1>
        <p className="text-muted-foreground mb-8">
          Ocean View Paradise · Dec 20–23, 2025 · Kribi
        </p>
        <p className="text-sm text-muted-foreground mb-8">
          Confirmation sent to your email. The host will reach out before check-in.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/bookings">
            <Button className="cameroon-gradient text-primary-foreground">View bookings</Button>
          </Link>
          <Link href="/villas">
            <Button variant="outline">Explore more villas</Button>
          </Link>
        </div>
      </div>
    </SiteShell>
  )
}
