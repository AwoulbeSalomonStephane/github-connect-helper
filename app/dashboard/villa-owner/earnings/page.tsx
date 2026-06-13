'use client'

import { VillaOwnerLayout } from '@/components/dashboard/villa-owner-layout'
import { Card, CardContent } from '@/components/ui/card'

export default function VillaOwnerEarningsPage() {
  return (
    <VillaOwnerLayout activeHref="/dashboard/villa-owner/earnings" title="Earnings">
      <Card>
        <CardContent className="p-6">
          <p className="text-sm text-muted-foreground">This month</p>
          <p className="text-3xl font-bold mt-1">1,240,000 FCFA</p>
        </CardContent>
      </Card>
    </VillaOwnerLayout>
  )
}
