'use client'

import { LegalPage } from '@/components/layout/legal-page'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

export default function ContactPage() {
  return (
    <LegalPage title="Contact us" description="We typically respond within 24 hours">
      <form className="space-y-4 not-prose" onSubmit={(e) => e.preventDefault()}>
        <div className="space-y-2">
          <Label>Name</Label>
          <Input required />
        </div>
        <div className="space-y-2">
          <Label>Email</Label>
          <Input type="email" required />
        </div>
        <div className="space-y-2">
          <Label>Message</Label>
          <Textarea rows={5} required />
        </div>
        <Button type="submit" className="cameroon-gradient text-primary-foreground">
          Send message
        </Button>
      </form>
      <p className="mt-8">Douala & Yaoundé · support@vibecam.cm · +237 XXX XXX XXX</p>
    </LegalPage>
  )
}
