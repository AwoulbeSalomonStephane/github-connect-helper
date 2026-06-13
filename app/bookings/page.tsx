import Link from 'next/link'
import Image from 'next/image'
import { Calendar, MapPin } from 'lucide-react'
import { SiteShell } from '@/components/layout/site-shell'
import { Badge } from '@/components/ui/badge'

const bookings = [
  {
    id: '1',
    villa: 'Ocean View Paradise',
    dates: 'Dec 20 – 23, 2025',
    location: 'Kribi',
    status: 'confirmed',
    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=400&auto=format&fit=crop&q=80',
  },
]

export default function BookingsPage() {
  return (
    <SiteShell>
      <div className="mx-auto max-w-2xl px-4 sm:px-6 py-8">
        <h1 className="text-2xl font-bold mb-6">My Bookings</h1>
        <div className="space-y-4">
          {bookings.map((b) => (
            <div
              key={b.id}
              className="flex gap-4 p-4 rounded-2xl border border-border bg-card card-shadow"
            >
              <div className="relative h-24 w-24 rounded-xl overflow-hidden shrink-0">
                <Image src={b.image} alt="" fill className="object-cover" />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <h2 className="font-semibold">{b.villa}</h2>
                  <Badge>{b.status}</Badge>
                </div>
                <p className="text-sm flex items-center gap-1 mt-2 text-muted-foreground">
                  <Calendar className="h-3.5 w-3.5" />
                  {b.dates}
                </p>
                <p className="text-sm flex items-center gap-1 text-muted-foreground">
                  <MapPin className="h-3.5 w-3.5" />
                  {b.location}
                </p>
                <Link href={`/villas/${b.id}`} className="text-sm text-primary mt-2 inline-block hover:underline">
                  View villa
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </SiteShell>
  )
}
