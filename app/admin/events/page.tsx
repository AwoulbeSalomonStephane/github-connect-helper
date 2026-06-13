'use client'

import { AdminDashboardLayout } from '@/components/dashboard/admin-layout'
import { Badge } from '@/components/ui/badge'

const events = [
  { name: 'Sunset Pool Party', organizer: 'Vibe Events', status: 'approved' },
  { name: 'NYE Countdown', organizer: 'Culture CM', status: 'pending' },
]

export default function AdminEventsPage() {
  return (
    <AdminDashboardLayout activeHref="/admin/events" title="Events moderation">
      <div className="space-y-3">
        {events.map((e) => (
          <div key={e.name} className="flex justify-between items-center p-4 rounded-xl border border-border">
            <div>
              <p className="font-medium">{e.name}</p>
              <p className="text-sm text-muted-foreground">{e.organizer}</p>
            </div>
            <Badge>{e.status}</Badge>
          </div>
        ))}
      </div>
    </AdminDashboardLayout>
  )
}
