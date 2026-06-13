'use client'

import { SiteShell } from '@/components/layout/site-shell'
import { HostApplicationForm } from '@/components/applications/host-application-form'
import { Card, CardContent } from '@/components/ui/card'
import { Calendar, BarChart3, Ticket, Users } from 'lucide-react'

const benefits = [
  { icon: Ticket, title: 'Sell tickets', desc: 'Multiple ticket types, QR check-in, real-time sales' },
  { icon: BarChart3, title: 'Analytics', desc: 'Revenue, views, and attendee insights' },
  { icon: Users, title: 'Grow audience', desc: 'Followers, feed posts, and event promotions' },
  { icon: Calendar, title: 'Manage events', desc: 'Create, edit, and promote from one dashboard' },
]

export default function BecomeOrganizerPage() {
  return (
    <SiteShell>
      <div className="mx-auto max-w-4xl px-4 sm:px-6 py-12">
        <div className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold mb-3">Become an organizer</h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Apply to host events across Cameroon. Once approved, you&apos;ll access the organizer dashboard.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-4 mb-10">
          {benefits.map((b) => (
            <Card key={b.title}>
              <CardContent className="p-5 flex gap-4">
                <b.icon className="h-8 w-8 text-primary shrink-0" />
                <div>
                  <h3 className="font-semibold">{b.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{b.desc}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="max-w-xl mx-auto">
          <CardContent className="p-6">
            <HostApplicationForm type="organizer" />
          </CardContent>
        </Card>
      </div>
    </SiteShell>
  )
}
