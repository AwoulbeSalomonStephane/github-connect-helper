import Link from 'next/link'
import { Navbar, MobileNav } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'

export function LegalPage({
  title,
  description,
  children,
}: {
  title: string
  description?: string
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-16 pb-20 md:pb-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-12">
          <Link href="/">
            <Button variant="ghost" size="sm" className="mb-6 gap-2 -ml-2">
              <ArrowLeft className="h-4 w-4" />
              Back to home
            </Button>
          </Link>
          <h1 className="text-3xl sm:text-4xl font-bold mb-3">{title}</h1>
          {description && (
            <p className="text-muted-foreground mb-8">{description}</p>
          )}
          <div className="prose prose-neutral dark:prose-invert max-w-none space-y-4 text-muted-foreground">
            {children}
          </div>
        </div>
      </main>
      <Footer />
      <MobileNav />
    </div>
  )
}
