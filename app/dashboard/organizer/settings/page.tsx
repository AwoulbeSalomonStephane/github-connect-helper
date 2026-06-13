'use client'

import { OrganizerDashboardLayout } from '@/components/dashboard/organizer-layout'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function OrganizerSettingsPage() {
  return (
    <OrganizerDashboardLayout activeHref="/dashboard/organizer/settings" title="Settings">
      <Card className="max-w-xl">
        <CardHeader>
          <CardTitle>Organizer profile</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Business name</Label>
            <Input defaultValue="Vibe Events" />
          </div>
          <div className="space-y-2">
            <Label>Email</Label>
            <Input type="email" defaultValue="hello@vibeevents.cm" />
          </div>
          <div className="space-y-2">
            <Label>Payout phone (Mobile Money)</Label>
            <Input placeholder="+237 6XX XXX XXX" />
          </div>
          <Button className="cameroon-gradient text-primary-foreground">Save changes</Button>
        </CardContent>
      </Card>
    </OrganizerDashboardLayout>
  )
}
