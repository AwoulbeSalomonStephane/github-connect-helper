import Link from 'next/link'
import { LegalPage } from '@/components/layout/legal-page'

export default function HelpPage() {
  return (
    <LegalPage title="Help Center" description="Get support for bookings, tickets, and your account">
      <h2 className="text-lg font-semibold text-foreground">Tickets & events</h2>
      <p>Your QR ticket is available under My Tickets after purchase. Contact the organizer through Messages for event-specific questions.</p>
      <h2 className="text-lg font-semibold text-foreground pt-4">Villa bookings</h2>
      <p>View bookings in My Bookings. Cancellation policies vary by host.</p>
      <h2 className="text-lg font-semibold text-foreground pt-4">Still need help?</h2>
      <p>
        <Link href="/contact" className="text-primary hover:underline">
          Contact support
        </Link>
      </p>
    </LegalPage>
  )
}
