import { Navbar, MobileNav } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'

export function SiteShell({
  children,
  showFooter = true,
  showMobileNav = true,
}: {
  children: React.ReactNode
  showFooter?: boolean
  showMobileNav?: boolean
}) {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-16 pb-20 md:pb-0">{children}</main>
      {showFooter && <Footer />}
      {showMobileNav && <MobileNav />}
    </div>
  )
}
