import { HeroSection } from '@/components/landing/hero-section';
import { TrendingEventsSection } from '@/components/landing/trending-events';
import { FeaturedVillasSection } from '@/components/landing/featured-villas';
import { PopularOrganizersSection } from '@/components/landing/popular-organizers';
import { CategoriesSection } from '@/components/landing/categories-section';
import { TestimonialsSection } from '@/components/landing/testimonials-section';
import { StatisticsSection } from '@/components/landing/statistics-section';
import { CTASection } from '@/components/landing/cta-section';
import { DownloadAppSection } from '@/components/landing/download-app-section';
import { Navbar, MobileNav } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';

export function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-16 pb-20 md:pb-0">
        <HeroSection />
        <TrendingEventsSection />
        <CategoriesSection />
        <FeaturedVillasSection />
        <PopularOrganizersSection />
        <StatisticsSection />
        <TestimonialsSection />
        <CTASection />
        <DownloadAppSection />
      </main>
      <Footer />
      <MobileNav />
    </div>
  );
}
