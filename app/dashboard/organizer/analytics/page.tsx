'use client'

import { OrganizerDashboardLayout } from '@/components/dashboard/organizer-layout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { DollarSign, Eye, Ticket, Star } from 'lucide-react'

const metrics = [
  { label: 'Revenue', value: '2.45M FCFA', icon: DollarSign, change: '+12%' },
  { label: 'Views', value: '45.2K', icon: Eye, change: '+23%' },
  { label: 'Tickets', value: '1,234', icon: Ticket, change: '+8%' },
  { label: 'Rating', value: '4.8', icon: Star, change: '—' },
]

export default function OrganizerAnalyticsPage() {
  return (
    <OrganizerDashboardLayout activeHref="/dashboard/organizer/analytics" title="Analytics">
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {metrics.map((m) => (
          <Card key={m.label}>
            <CardContent className="p-4">
              <div className="flex justify-between items-start">
                <m.icon className="h-5 w-5 text-primary" />
                <span className="text-xs text-primary">{m.change}</span>
              </div>
              <p className="text-2xl font-bold mt-2">{m.value}</p>
              <p className="text-sm text-muted-foreground">{m.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Revenue over time</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 rounded-lg bg-secondary/30 flex items-center justify-center text-muted-foreground text-sm">
            Chart placeholder — connect analytics API
          </div>
        </CardContent>
      </Card>
    </OrganizerDashboardLayout>
  )
}
