'use client'

import { AdminDashboardLayout } from '@/components/dashboard/admin-layout'
import { Badge } from '@/components/ui/badge'

export default function AdminVillasPage() {
  return (
    <AdminDashboardLayout activeHref="/admin/villas" title="Villas">
      <div className="p-4 rounded-xl border border-border">
        <p className="font-medium">Ocean View Paradise</p>
        <p className="text-sm text-muted-foreground">Kribi · Jean-Pierre M.</p>
        <Badge className="mt-2">approved</Badge>
      </div>
    </AdminDashboardLayout>
  )
}
