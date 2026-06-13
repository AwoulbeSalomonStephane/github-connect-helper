import { redirect } from 'next/navigation'
import { AdminDashboardLayout } from '@/components/dashboard/admin-layout'
import { ApprovalsList } from '@/components/admin/approvals-list'
import { getPendingApplications, getCurrentProfile } from '@/lib/actions/applications'
import { Alert, AlertDescription } from '@/components/ui/alert'

export default async function AdminApprovalsPage() {
  const profile = await getCurrentProfile()

  if (!profile || profile.role !== 'admin') {
    redirect('/login?next=/admin/approvals')
  }

  const { data, error } = await getPendingApplications()

  return (
    <AdminDashboardLayout activeHref="/admin/approvals" title="Host applications">
      {error && (
        <Alert className="mb-4">
          <AlertDescription>
            Could not load applications. Run the Supabase migration and ensure you are admin.
          </AlertDescription>
        </Alert>
      )}
      <ApprovalsList applications={data ?? []} />
    </AdminDashboardLayout>
  )
}
