'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { MediaUpload } from '@/components/upload/media-upload'
import { submitHostApplication, type ApplicationType } from '@/lib/actions/applications'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { CheckCircle, AlertCircle } from 'lucide-react'

export function HostApplicationForm({ type }: { type: ApplicationType }) {
  const router = useRouter()
  const [pending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [mediaUrls, setMediaUrls] = useState<string[]>([])
  const [logoUrl, setLogoUrl] = useState<string[]>([])

  const isOrganizer = type === 'organizer'

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)

    startTransition(async () => {
      setError(null)
      const result = await submitHostApplication({
        application_type: type,
        business_name: String(fd.get('business_name')),
        city: String(fd.get('city')),
        phone: String(fd.get('phone') || ''),
        description: String(fd.get('description') || ''),
        property_name: isOrganizer ? undefined : String(fd.get('property_name') || ''),
        price_per_night: isOrganizer ? undefined : Number(fd.get('price_per_night') || 0) || undefined,
        payout_phone: isOrganizer ? undefined : String(fd.get('payout_phone') || ''),
        logo_url: logoUrl[0],
        media_urls: mediaUrls,
      })

      if (result.error) {
        if (result.error.includes('signed in')) {
          router.push(`/login?next=${isOrganizer ? '/become-organizer' : '/list-villa'}`)
          return
        }
        setError(result.error)
        return
      }

      setSuccess(true)
    })
  }

  if (success) {
    return (
      <Alert className="border-primary/30 bg-primary/5">
        <CheckCircle className="h-4 w-4 text-primary" />
        <AlertDescription>
          Application submitted! Our team will review it within 24–48 hours. You&apos;ll get access to your dashboard once approved.
          <Link href="/feed" className="block mt-2 text-primary hover:underline text-sm">
            Back to feed
          </Link>
        </AlertDescription>
      </Alert>
    )
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="space-y-2">
        <Label>{isOrganizer ? 'Business / brand name' : 'Your name or business'}</Label>
        <Input name="business_name" required placeholder={isOrganizer ? 'Vibe Events' : 'Jean-Pierre M.'} />
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>City</Label>
          <Input name="city" required placeholder="Douala" />
        </div>
        <div className="space-y-2">
          <Label>Phone</Label>
          <Input name="phone" placeholder="+237 6XX XXX XXX" />
        </div>
      </div>

      {!isOrganizer && (
        <>
          <div className="space-y-2">
            <Label>Property name</Label>
            <Input name="property_name" placeholder="Ocean View Paradise" />
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Price per night (XAF)</Label>
              <Input name="price_per_night" type="number" placeholder="150000" />
            </div>
            <div className="space-y-2">
              <Label>Payout phone (Mobile Money)</Label>
              <Input name="payout_phone" placeholder="+237" />
            </div>
          </div>
        </>
      )}

      <div className="space-y-2">
        <Label>{isOrganizer ? 'What events do you host?' : 'Describe your villa'}</Label>
        <Textarea name="description" rows={3} placeholder={isOrganizer ? 'Nightlife, concerts…' : 'Beachfront, pool, 4 bedrooms…'} />
      </div>

      <MediaUpload
        folder="applications"
        label={isOrganizer ? 'Logo & promo media' : 'Villa photos & videos'}
        value={logoUrl}
        onChange={setLogoUrl}
        maxFiles={1}
        hint="Logo or cover image"
      />

      <MediaUpload
        folder={isOrganizer ? 'events' : 'villas'}
        label={isOrganizer ? 'Past event flyers / videos' : 'Property gallery'}
        value={mediaUrls}
        onChange={setMediaUrls}
        maxFiles={6}
      />

      <Button type="submit" disabled={pending} className="w-full cameroon-gradient text-primary-foreground">
        {pending ? 'Submitting…' : 'Submit application'}
      </Button>

      <p className="text-xs text-center text-muted-foreground">
        You must be signed in. Applications are reviewed by the VibeCam team.
      </p>
    </form>
  )
}
