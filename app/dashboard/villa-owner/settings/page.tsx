'use client'

import { VillaOwnerLayout } from '@/components/dashboard/villa-owner-layout'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function VillaOwnerSettingsPage() {
  return (
    <VillaOwnerLayout activeHref="/dashboard/villa-owner/settings" title="Settings">
      <div className="max-w-md space-y-4">
        <div className="space-y-2">
          <Label>Display name</Label>
          <Input defaultValue="Jean-Pierre M." />
        </div>
        <div className="space-y-2">
          <Label>Payout Mobile Money</Label>
          <Input placeholder="+237" />
        </div>
        <Button className="cameroon-gradient text-primary-foreground">Save</Button>
      </div>
    </VillaOwnerLayout>
  )
}
