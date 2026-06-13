'use client'

import { VillaOwnerLayout } from '@/components/dashboard/villa-owner-layout'
import { Badge } from '@/components/ui/badge'

export default function VillaOwnerBookingsPage() {
  return (
    <VillaOwnerLayout activeHref="/dashboard/villa-owner/bookings" title="Booking requests">
      <div className="p-4 rounded-xl border border-border">
        <div className="flex justify-between items-start">
          <div>
            <p className="font-medium">Marie Kamga</p>
            <p className="text-sm text-muted-foreground">Ocean View · Dec 20–23</p>
          </div>
          <Badge>pending</Badge>
        </div>
      </div>
    </VillaOwnerLayout>
  )
}
