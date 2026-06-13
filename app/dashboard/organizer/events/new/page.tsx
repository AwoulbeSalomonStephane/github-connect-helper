'use client'

import { OrganizerDashboardLayout } from '@/components/dashboard/organizer-layout'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { MediaUpload } from '@/components/upload/media-upload'

export default function CreateEventPage() {
  return (
    <OrganizerDashboardLayout activeHref="/dashboard/organizer/events" title="Create event">
      <form className="max-w-2xl space-y-6" onSubmit={(e) => e.preventDefault()}>
        <Card>
          <CardHeader>
            <CardTitle>Event details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input id="title" placeholder="Sunset Pool Party" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="desc">Description</Label>
              <Textarea id="desc" rows={4} placeholder="Describe your event..." required />
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Category</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pool">Pool Party</SelectItem>
                    <SelectItem value="concert">Concert</SelectItem>
                    <SelectItem value="nightlife">Nightlife</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input id="location" placeholder="Douala, Cameroon" />
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="date">Date</Label>
                <Input id="date" type="date" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="time">Time</Label>
                <Input id="time" type="time" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Media</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <MediaUpload folder="events" label="Flyer & promo images" maxFiles={3} />
            <MediaUpload folder="events" label="Event videos" accept="video/*" maxFiles={2} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Tickets</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Ticket type</Label>
                <Input placeholder="General Admission" />
              </div>
              <div className="space-y-2">
                <Label>Price (XAF)</Label>
                <Input type="number" placeholder="20000" />
              </div>
            </div>
            <Button type="button" variant="outline" size="sm">
              + Add ticket type
            </Button>
          </CardContent>
        </Card>

        <div className="flex gap-3">
          <Button type="submit" className="cameroon-gradient text-primary-foreground">
            Publish event
          </Button>
          <Button type="button" variant="outline">
            Save draft
          </Button>
        </div>
      </form>
    </OrganizerDashboardLayout>
  )
}
