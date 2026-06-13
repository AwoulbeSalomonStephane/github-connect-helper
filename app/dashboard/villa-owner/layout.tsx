import { redirect } from 'next/navigation'
import { getCurrentProfile } from '@/lib/actions/applications'

export default async function VillaOwnerDashboardGate({
  children,
}: {
  children: React.ReactNode
}) {
  const profile = await getCurrentProfile()
  if (!profile) redirect('/login?next=/dashboard/villa-owner')
  if (!profile.is_villa_owner && profile.role !== 'admin') {
    redirect('/list-villa')
  }
  return children
}
