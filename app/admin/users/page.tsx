'use client'

import Link from 'next/link'
import { AdminDashboardLayout } from '@/components/dashboard/admin-layout'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Search } from 'lucide-react'

const users = [
  { id: '1', name: 'Marie Kamga', email: 'marie@email.com', role: 'user', status: 'active' },
  { id: '2', name: 'Vibe Events', email: 'events@vibe.cm', role: 'organizer', status: 'active' },
  { id: '3', name: 'Jean-Pierre M.', email: 'jp@villa.cm', role: 'host', status: 'active' },
]

export default function AdminUsersPage() {
  return (
    <AdminDashboardLayout activeHref="/admin/users" title="Users">
      <div className="relative mb-6 max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Search users..." className="pl-9" />
      </div>
      <div className="rounded-xl border border-border overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-secondary/50">
            <tr>
              <th className="text-left p-4 font-medium">Name</th>
              <th className="text-left p-4 font-medium hidden md:table-cell">Email</th>
              <th className="text-left p-4 font-medium">Role</th>
              <th className="text-left p-4 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id} className="border-t border-border">
                <td className="p-4 font-medium">{u.name}</td>
                <td className="p-4 hidden md:table-cell text-muted-foreground">{u.email}</td>
                <td className="p-4 capitalize">{u.role}</td>
                <td className="p-4">
                  <Badge variant="secondary">{u.status}</Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Link href="/admin" className="inline-block mt-4 text-sm text-primary hover:underline">
        ← Back to admin
      </Link>
    </AdminDashboardLayout>
  )
}
