'use client'

import Link from 'next/link'
import { VillaOwnerLayout } from '@/components/dashboard/villa-owner-layout'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Plus } from 'lucide-react'

const properties = [
  { id: '1', name: 'Ocean View Paradise', city: 'Kribi', status: 'listed', bookings: 12 },
]

export default function VillaPropertiesPage() {
  return (
    <VillaOwnerLayout activeHref="/dashboard/villa-owner/properties" title="My villas">
      <Link href="/list-villa">
        <Button className="mb-6 gap-2 cameroon-gradient text-primary-foreground">
          <Plus className="h-4 w-4" />
          Add villa
        </Button>
      </Link>
      {properties.map((p) => (
        <Card key={p.id} className="mb-4">
          <CardContent className="p-4 flex justify-between items-center">
            <div>
              <p className="font-semibold">{p.name}</p>
              <p className="text-sm text-muted-foreground">
                {p.city} · {p.bookings} bookings
              </p>
            </div>
            <Link href={`/villas/${p.id}`}>
              <Button variant="outline" size="sm">
                View
              </Button>
            </Link>
          </CardContent>
        </Card>
      ))}
    </VillaOwnerLayout>
  )
}
