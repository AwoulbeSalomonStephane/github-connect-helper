'use client'

import Link from 'next/link'
import { OrganizerDashboardLayout } from '@/components/dashboard/organizer-layout'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { MoreHorizontal, Pencil, Eye } from 'lucide-react'

const events = [
  { id: 1, name: 'Afro Nation Douala', date: 'Dec 21', status: 'upcoming', tickets: 2340, revenue: '35,100,000' },
  { id: 2, name: 'White Pool Party', date: 'Dec 25', status: 'upcoming', tickets: 180, revenue: '1,800,000' },
  { id: 3, name: 'NYE Countdown', date: 'Dec 31', status: 'draft', tickets: 0, revenue: '0' },
]

export default function OrganizerEventsPage() {
  return (
    <OrganizerDashboardLayout activeHref="/dashboard/organizer/events" title="Events">
      <div className="space-y-4">
        {events.map((event) => (
          <Card key={event.id}>
            <CardContent className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold">{event.name}</h3>
                  <Badge variant={event.status === 'draft' ? 'secondary' : 'default'}>{event.status}</Badge>
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  {event.date} · {event.tickets} tickets · {event.revenue} FCFA
                </p>
              </div>
              <div className="flex gap-2">
                <Link href={`/events/${event.id}`}>
                  <Button variant="outline" size="sm" className="gap-1">
                    <Eye className="h-4 w-4" />
                    View
                  </Button>
                </Link>
                <Button variant="outline" size="sm" className="gap-1">
                  <Pencil className="h-4 w-4" />
                  Edit
                </Button>
                <Button variant="ghost" size="icon">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </OrganizerDashboardLayout>
  )
}
