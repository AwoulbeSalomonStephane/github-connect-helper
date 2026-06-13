import { redirect } from 'next/navigation'
import { getCurrentProfile } from '@/lib/actions/applications'

export default async function OrganizerDashboardGate({
  children,
}: {
  children: React.ReactNode
}) {
  const profile = await getCurrentProfile()
  if (!profile) redirect('/login?next=/dashboard/organizer')
  if (!profile.is_organizer && profile.role !== 'admin') {
    redirect('/become-organizer')
  }
  return children
}
