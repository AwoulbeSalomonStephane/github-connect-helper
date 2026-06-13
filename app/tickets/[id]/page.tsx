'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ChevronLeft, Download, Share2, QrCode } from 'lucide-react'
import { SiteShell } from '@/components/layout/site-shell'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

export default function TicketDetailPage() {
  return (
    <SiteShell showMobileNav={false}>
      <div className="mx-auto max-w-md px-4 py-8">
        <Link href="/tickets">
          <Button variant="ghost" size="sm" className="mb-6 gap-2">
            <ChevronLeft className="h-4 w-4" />
            All tickets
          </Button>
        </Link>

        <div className="rounded-2xl overflow-hidden border border-border bg-card card-shadow">
          <div className="relative h-40">
            <Image
              src="https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800&auto=format&fit=crop&q=80"
              alt=""
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
            <Badge className="absolute top-4 right-4">Valid</Badge>
          </div>
          <div className="p-6 text-center">
            <h1 className="text-xl font-bold">Sunset Pool Party</h1>
            <p className="text-muted-foreground text-sm mt-1">General Admission · Dec 15, 2025</p>
            <p className="text-sm text-muted-foreground">Aqua Palace Resort, Douala</p>

            <div className="my-8 flex justify-center">
              <div className="h-48 w-48 rounded-xl bg-secondary flex items-center justify-center">
                <QrCode className="h-32 w-32" />
              </div>
            </div>
            <p className="font-mono text-sm text-muted-foreground">VIBECAM-TKT-2025-8842</p>

            <div className="flex gap-2 mt-8">
              <Button variant="outline" className="flex-1 gap-2">
                <Download className="h-4 w-4" />
                PDF
              </Button>
              <Button variant="outline" className="flex-1 gap-2">
                <Share2 className="h-4 w-4" />
                Share
              </Button>
            </div>
          </div>
        </div>
      </div>
    </SiteShell>
  )
}
