import Link from 'next/link'
import { Navbar, MobileNav } from '@/components/layout/navbar'
import { Button } from '@/components/ui/button'
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/components/ui/empty'
import { Home } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="flex items-center justify-center min-h-[60vh] px-4">
        <Empty>
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <Home />
            </EmptyMedia>
            <EmptyTitle>Page not found</EmptyTitle>
            <EmptyDescription>
              This page doesn&apos;t exist or may have moved.
            </EmptyDescription>
          </EmptyHeader>
          <Link href="/">
            <Button className="cameroon-gradient text-primary-foreground">Back to home</Button>
          </Link>
        </Empty>
      </div>
      <MobileNav />
    </div>
  )
}
