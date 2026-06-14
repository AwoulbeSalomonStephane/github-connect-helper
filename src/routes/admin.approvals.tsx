import { createFileRoute } from '@tanstack/react-router';
import { Navbar, MobileNav } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';

export const Route = createFileRoute('/admin/approvals')({
  component: Page,
  head: () => ({ meta: [{ title: 'Approvals — VibeCam' }] }),
});

function Page() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-20 md:pb-12 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Approvals</h1>
        <p className="text-muted-foreground text-lg">This page is being rebuilt. Check back soon.</p>
      </main>
      <Footer />
      <MobileNav />
    </div>
  );
}
