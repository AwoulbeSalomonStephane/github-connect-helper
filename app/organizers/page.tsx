import { Navbar, MobileNav } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { PopularOrganizersSection } from '@/components/landing/popular-organizers'

export default function OrganizersPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-16 pb-20 md:pb-0">
        <PopularOrganizersSection />
      </main>
      <Footer />
      <MobileNav />
    </div>
  )
}
