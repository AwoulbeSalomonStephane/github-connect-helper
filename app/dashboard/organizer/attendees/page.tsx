'use client'

import { OrganizerDashboardLayout } from '@/components/dashboard/organizer-layout'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'

const attendees = [
  { name: 'Marie Kamga', email: 'marie@email.com', ticket: 'VIP', event: 'Afro Nation' },
  { name: 'Paul N.', email: 'paul@email.com', ticket: 'General', event: 'Pool Party' },
]

export default function OrganizerAttendeesPage() {
  return (
    <OrganizerDashboardLayout activeHref="/dashboard/organizer/attendees" title="Attendees">
      <div className="relative mb-6 max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Search attendees..." className="pl-9" />
      </div>
      <div className="rounded-xl border border-border overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-secondary/50">
            <tr>
              <th className="text-left p-4 font-medium">Guest</th>
              <th className="text-left p-4 font-medium hidden sm:table-cell">Event</th>
              <th className="text-left p-4 font-medium">Ticket</th>
            </tr>
          </thead>
          <tbody>
            {attendees.map((a) => (
              <tr key={a.email} className="border-t border-border">
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="" />
                      <AvatarFallback>{a.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{a.name}</p>
                      <p className="text-muted-foreground text-xs">{a.email}</p>
                    </div>
                  </div>
                </td>
                <td className="p-4 hidden sm:table-cell text-muted-foreground">{a.event}</td>
                <td className="p-4">{a.ticket}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </OrganizerDashboardLayout>
  )
}
