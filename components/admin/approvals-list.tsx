'use client'

import { useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { approveApplication, rejectApplication } from '@/lib/actions/applications'
import { toast } from 'sonner'

type Application = {
  id: string
  application_type: string
  business_name: string
  city: string
  phone: string | null
  description: string | null
  property_name: string | null
  price_per_night: number | null
  media_urls: string[] | null
  created_at: string
  profiles: { full_name: string | null; email: string } | null
}

export function ApprovalsList({ applications }: { applications: Application[] }) {
  const router = useRouter()
  const [pending, startTransition] = useTransition()

  const handleApprove = (id: string) => {
    startTransition(async () => {
      const result = await approveApplication(id)
      if (result.error) toast.error(result.error)
      else {
        toast.success('Application approved')
        router.refresh()
      }
    })
  }

  const handleReject = (id: string) => {
    startTransition(async () => {
      const result = await rejectApplication(id, 'Does not meet requirements')
      if (result.error) toast.error(result.error)
      else {
        toast.success('Application rejected')
        router.refresh()
      }
    })
  }

  if (applications.length === 0) {
    return (
      <p className="text-muted-foreground text-center py-12">No pending applications — all caught up!</p>
    )
  }

  return (
    <div className="space-y-4">
      {applications.map((app) => (
        <div key={app.id} className="p-4 rounded-xl border border-border bg-card space-y-3">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <p className="font-semibold">{app.business_name}</p>
                <Badge variant="secondary">{app.application_type.replace('_', ' ')}</Badge>
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                {app.profiles?.full_name ?? app.profiles?.email} · {app.city}
              </p>
              {app.description && <p className="text-sm mt-2">{app.description}</p>}
              {!app.application_type.includes('organizer') && app.property_name && (
                <p className="text-sm text-muted-foreground">
                  {app.property_name}
                  {app.price_per_night ? ` · ${Number(app.price_per_night).toLocaleString()} XAF/night` : ''}
                </p>
              )}
            </div>
            <div className="flex gap-2 shrink-0">
              <Button size="sm" disabled={pending} onClick={() => handleApprove(app.id)}>
                Approve
              </Button>
              <Button size="sm" variant="outline" disabled={pending} onClick={() => handleReject(app.id)}>
                Reject
              </Button>
            </div>
          </div>
          {app.media_urls && app.media_urls.length > 0 && (
            <p className="text-xs text-muted-foreground">{app.media_urls.length} media file(s) attached</p>
          )}
        </div>
      ))}
    </div>
  )
}
