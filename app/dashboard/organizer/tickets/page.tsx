'use client'

import { OrganizerDashboardLayout } from '@/components/dashboard/organizer-layout'
import { Card, CardContent } from '@/components/ui/card'

const sales = [
  { event: 'Afro Nation Douala', sold: 2340, revenue: '35,100,000 FCFA' },
  { event: 'White Pool Party', sold: 180, revenue: '1,800,000 FCFA' },
]

export default function OrganizerTicketsPage() {
  return (
    <OrganizerDashboardLayout activeHref="/dashboard/organizer/tickets" title="Ticket sales">
      <div className="space-y-4">
        {sales.map((s) => (
          <Card key={s.event}>
            <CardContent className="p-4 flex justify-between items-center">
              <div>
                <p className="font-semibold">{s.event}</p>
                <p className="text-sm text-muted-foreground">{s.sold} tickets sold</p>
              </div>
              <p className="font-bold text-primary">{s.revenue}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </OrganizerDashboardLayout>
  )
}
