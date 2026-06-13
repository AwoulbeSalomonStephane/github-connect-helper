import Link from 'next/link'
import Image from 'next/image'
import { QrCode, Calendar, MapPin } from 'lucide-react'
import { SiteShell } from '@/components/layout/site-shell'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

const tickets = [
  {
    id: '1',
    event: 'Sunset Pool Party',
    date: 'Dec 15, 2025',
    location: 'Douala',
    type: 'General Admission',
    status: 'valid',
    image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=400&auto=format&fit=crop&q=80',
  },
  {
    id: '2',
    event: 'Afrobeats Night',
    date: 'Dec 18, 2025',
    location: 'Yaoundé',
    type: 'VIP',
    status: 'valid',
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&auto=format&fit=crop&q=80',
  },
]

export default function TicketsPage() {
  return (
    <SiteShell>
      <div className="mx-auto max-w-2xl px-4 sm:px-6 py-8">
        <h1 className="text-2xl font-bold mb-6">My Tickets</h1>
        <div className="space-y-4">
          {tickets.map((ticket) => (
            <Link
              key={ticket.id}
              href={`/tickets/${ticket.id}`}
              className="flex gap-4 p-4 rounded-2xl border border-border bg-card hover:border-primary/40 transition-colors card-shadow"
            >
              <div className="relative h-24 w-24 rounded-xl overflow-hidden shrink-0">
                <Image src={ticket.image} alt="" fill className="object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <h2 className="font-semibold">{ticket.event}</h2>
                  <Badge variant="secondary" className="capitalize">{ticket.status}</Badge>
                </div>
                <p className="text-sm text-muted-foreground mt-1">{ticket.type}</p>
                <p className="text-sm flex items-center gap-1 mt-2 text-muted-foreground">
                  <Calendar className="h-3.5 w-3.5" />
                  {ticket.date}
                </p>
                <p className="text-sm flex items-center gap-1 text-muted-foreground">
                  <MapPin className="h-3.5 w-3.5" />
                  {ticket.location}
                </p>
              </div>
              <QrCode className="h-8 w-8 text-primary shrink-0 self-center" />
            </Link>
          ))}
        </div>
      </div>
    </SiteShell>
  )
}
