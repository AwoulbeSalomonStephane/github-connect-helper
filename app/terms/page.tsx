import { LegalPage } from '@/components/layout/legal-page'

export default function TermsPage() {
  return (
    <LegalPage title="Terms of Service" description="Last updated: June 2025">
      <p>By using VibeCam, you agree to these terms. This is a demo application; connect your legal team before production launch.</p>
      <h2 className="text-lg font-semibold text-foreground pt-4">Bookings & tickets</h2>
      <p>All purchases are subject to organizer and host policies. Refunds depend on the event or villa cancellation rules.</p>
      <h2 className="text-lg font-semibold text-foreground pt-4">User conduct</h2>
      <p>Users must not post illegal content, harass others, or commit fraud. We may suspend accounts that violate community guidelines.</p>
    </LegalPage>
  )
}
