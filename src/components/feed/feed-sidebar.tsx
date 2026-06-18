import { useState } from 'react';
import { Link } from '@tanstack/react-router';
import { motion } from 'framer-motion';
import { CheckCircle, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const suggestedAccounts = [
  { id: '1', name: 'Vibe Events', username: '@vibeevents', avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&auto=format&fit=crop&q=80', verified: true, followers: 15420, isFollowing: false },
  { id: '2', name: 'Beach Club Kribi', username: '@beachclubkribi', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&auto=format&fit=crop&q=80', verified: true, followers: 12100, isFollowing: false },
  { id: '3', name: 'Culture Cameroon', username: '@culturecmr', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80', verified: true, followers: 8930, isFollowing: true },
  { id: '4', name: 'DJ Maestro', username: '@djmaestro', avatar: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=200&auto=format&fit=crop&q=80', verified: false, followers: 5670, isFollowing: false },
];

const trendingTopics = [
  { tag: '#PoolPartyCMR', posts: '2.5K' },
  { tag: '#DoualaNightlife', posts: '1.8K' },
  { tag: '#KribiWeekend', posts: '1.2K' },
  { tag: '#CameroonTourism', posts: '956' },
  { tag: '#AfrobeatsNight', posts: '789' },
];

function formatNumber(num: number) {
  return num >= 1000 ? (num / 1000).toFixed(1) + 'K' : num.toString();
}

export function FeedSidebar() {
  const [following, setFollowing] = useState<Record<string, boolean>>(
    suggestedAccounts.reduce((acc, a) => ({ ...acc, [a.id]: a.isFollowing }), {})
  );

  return (
    <aside className="hidden lg:block w-80 shrink-0">
      <div className="sticky top-20 space-y-6">
        <div className="bg-card rounded-2xl border border-border p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Suggested for You</h3>
            <Link to="/search" className="text-sm text-primary hover:underline">See All</Link>
          </div>
          <div className="space-y-4">
            {suggestedAccounts.map((account, index) => (
              <motion.div
                key={account.id}
                initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="flex items-center gap-3"
              >
                <Avatar className="h-10 w-10">
                  <AvatarImage src={account.avatar} alt={account.name} />
                  <AvatarFallback>{account.name[0]}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1">
                    <span className="font-medium text-sm truncate">{account.name}</span>
                    {account.verified && <CheckCircle className="h-3.5 w-3.5 fill-primary text-primary-foreground shrink-0" />}
                  </div>
                  <p className="text-xs text-muted-foreground truncate">{formatNumber(account.followers)} followers</p>
                </div>
                <Button
                  variant={following[account.id] ? 'outline' : 'default'}
                  size="sm"
                  onClick={() => setFollowing((p) => ({ ...p, [account.id]: !p[account.id] }))}
                  className="shrink-0"
                >
                  {following[account.id] ? 'Following' : 'Follow'}
                </Button>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="bg-card rounded-2xl border border-border p-4">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="h-5 w-5 text-primary" />
            <h3 className="font-semibold">Trending Topics</h3>
          </div>
          <div className="space-y-3">
            {trendingTopics.map((topic, index) => (
              <motion.div
                key={topic.tag}
                initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <Link
                  to="/search"
                  className="block hover:bg-secondary rounded-lg p-2 -mx-2 transition-colors"
                >
                  <p className="font-medium text-sm text-primary">{topic.tag}</p>
                  <p className="text-xs text-muted-foreground">{topic.posts} posts</p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="text-xs text-muted-foreground space-y-2 px-2">
          <div className="flex flex-wrap gap-x-2 gap-y-1">
            <Link to="/about" className="hover:underline">About</Link>
            <Link to="/help" className="hover:underline">Help</Link>
            <Link to="/privacy" className="hover:underline">Privacy</Link>
            <Link to="/terms" className="hover:underline">Terms</Link>
          </div>
          <p>&copy; 2025 VibeCam</p>
        </div>
      </div>
    </aside>
  );
}
