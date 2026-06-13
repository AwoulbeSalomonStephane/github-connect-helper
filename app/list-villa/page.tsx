'use client'

import { SiteShell } from '@/components/layout/site-shell'
import { HostApplicationForm } from '@/components/applications/host-application-form'
import { Card, CardContent } from '@/components/ui/card'
import { Building2, Calendar, DollarSign } from 'lucide-react'

export default function ListVillaPage() {
  return (
    <SiteShell>
      <div className="mx-auto max-w-4xl px-4 sm:px-6 py-12">
        <div className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold mb-3">List your villa</h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Apply to become a villa owner. Upload photos and videos — we review every application.
          </p>
        </div>

        <div className="grid sm:grid-cols-3 gap-4 mb-10 text-center">
          {[
            { icon: Building2, label: 'Showcase your property' },
            { icon: Calendar, label: 'Manage availability' },
            { icon: DollarSign, label: 'Get paid securely' },
          ].map((item) => (
            <Card key={item.label}>
              <CardContent className="p-6">
                <item.icon className="h-8 w-8 text-primary mx-auto mb-2" />
                <p className="text-sm font-medium">{item.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="max-w-xl mx-auto">
          <CardContent className="p-6">
            <HostApplicationForm type="villa_owner" />
          </CardContent>
        </Card>
      </div>
    </SiteShell>
  )
}
