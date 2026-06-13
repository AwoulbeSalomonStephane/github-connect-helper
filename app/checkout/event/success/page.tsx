'use client'

import { Suspense } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { CheckCircle, Download, QrCode, Share2 } from 'lucide-react'
import { SiteShell } from '@/components/layout/site-shell'
import { Button } from '@/components/ui/button'

function SuccessContent() {
  const searchParams = useSearchParams()
  const qty = searchParams.get('qty') || '1'

  return (
    <div className="mx-auto max-w-lg px-4 py-16 text-center">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="mb-8"
      >
        <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 text-primary mb-6">
          <CheckCircle className="h-12 w-12" />
        </div>
        <h1 className="text-3xl font-bold mb-2">You&apos;re in!</h1>
        <p className="text-muted-foreground">
          {qty} ticket{Number(qty) > 1 ? 's' : ''} confirmed for Sunset Pool Party
        </p>
      </motion.div>

      <div className="bg-card border border-border rounded-2xl p-8 mb-8 card-shadow">
        <div className="inline-flex h-40 w-40 items-center justify-center rounded-xl bg-secondary mb-4">
          <QrCode className="h-24 w-24 text-foreground" />
        </div>
        <p className="text-sm text-muted-foreground">Show this QR code at the entrance</p>
        <p className="font-mono text-xs mt-2 text-muted-foreground">VIBECAM-TKT-2025-8842</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Link href="/tickets">
          <Button className="gap-2 w-full sm:w-auto cameroon-gradient text-primary-foreground">
            <QrCode className="h-4 w-4" />
            View my tickets
          </Button>
        </Link>
        <Button variant="outline" className="gap-2">
          <Download className="h-4 w-4" />
          Download PDF
        </Button>
        <Button variant="ghost" className="gap-2">
          <Share2 className="h-4 w-4" />
          Share
        </Button>
      </div>

      <Link href="/events" className="inline-block mt-8 text-sm text-primary hover:underline">
        Discover more events
      </Link>
    </div>
  )
}

export default function CheckoutSuccessPage() {
  return (
    <SiteShell>
      <Suspense fallback={<div className="p-8 text-center">Loading...</div>}>
        <SuccessContent />
      </Suspense>
    </SiteShell>
  )
}
