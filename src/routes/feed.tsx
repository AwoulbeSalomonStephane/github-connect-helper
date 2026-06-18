import { createFileRoute } from '@tanstack/react-router';
import { Navbar, MobileNav } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { StoriesBar } from '@/components/feed/stories-bar';
import { FeedList } from '@/components/feed/feed-post';
import { FeedSidebar } from '@/components/feed/feed-sidebar';

export const Route = createFileRoute('/feed')({
  component: Page,
  head: () => ({
    meta: [
      { title: 'Feed — VibeCam' },
      { name: 'description', content: 'Discover the latest events, villas, and stories from organizers and creators across Cameroon.' },
    ],
  }),
});

function Page() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-16 pb-20 md:pb-12">
        <div className="mx-auto max-w-6xl px-0 sm:px-6 lg:px-8 flex gap-8">
          <div className="flex-1 min-w-0 max-w-2xl mx-auto w-full">
            <StoriesBar />
            <FeedList />
          </div>
          <FeedSidebar />
        </div>
      </main>
      <Footer />
      <MobileNav />
    </div>
  );
}
