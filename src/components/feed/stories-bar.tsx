import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const stories = [
  { id: 'create', type: 'create' as const, user: { name: 'Your Story', avatar: '' } },
  {
    id: '1', type: 'story' as const, hasNewStory: true,
    user: { name: 'Vibe Events', avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&auto=format&fit=crop&q=80' },
    previewImage: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800&auto=format&fit=crop&q=80',
    caption: 'Pool party this weekend! Get your tickets now',
  },
  {
    id: '2', type: 'story' as const, hasNewStory: true,
    user: { name: 'Beach Club', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&auto=format&fit=crop&q=80' },
    previewImage: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?w=800&auto=format&fit=crop&q=80',
    caption: 'Sunset vibes at the beach',
  },
  {
    id: '3', type: 'story' as const, hasNewStory: true,
    user: { name: 'Club 237', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80' },
    previewImage: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&auto=format&fit=crop&q=80',
    caption: 'Afrobeats night - tonight!',
  },
  {
    id: '4', type: 'story' as const, hasNewStory: false,
    user: { name: 'Kribi Resort', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&auto=format&fit=crop&q=80' },
    previewImage: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&auto=format&fit=crop&q=80',
    caption: 'New villa now available to book',
  },
  {
    id: '5', type: 'story' as const, hasNewStory: true,
    user: { name: 'DJ Maestro', avatar: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=200&auto=format&fit=crop&q=80' },
    previewImage: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&auto=format&fit=crop&q=80',
    caption: 'Last night was insane 🔥',
  },
];

function StoryViewer({ storyId, onClose }: { storyId: string; onClose: () => void }) {
  const story = stories.find((s) => s.id === storyId && s.type === 'story');
  if (!story || story.type !== 'story') return null;

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black flex items-center justify-center"
    >
      <button onClick={onClose} className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20">
        <X className="h-6 w-6 text-white" />
      </button>
      <button onClick={onClose} className="absolute left-4 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20">
        <ChevronLeft className="h-6 w-6 text-white" />
      </button>
      <button onClick={onClose} className="absolute right-4 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20">
        <ChevronRight className="h-6 w-6 text-white" />
      </button>
      <div className="relative w-full max-w-md aspect-[9/16] mx-4">
        <img src={story.previewImage} alt={story.user.name} className="absolute inset-0 w-full h-full object-cover rounded-2xl" />
        <div className="absolute top-4 left-4 right-4 flex gap-1">
          <div className="flex-1 h-1 bg-white/30 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }} animate={{ width: '100%' }}
              transition={{ duration: 5, ease: 'linear' }}
              className="h-full bg-white" onAnimationComplete={onClose}
            />
          </div>
        </div>
        <div className="absolute top-8 left-4 flex items-center gap-3">
          <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-white">
            <img src={story.user.avatar} alt={story.user.name} className="w-full h-full object-cover" />
          </div>
          <p className="text-white font-semibold text-sm">{story.user.name}</p>
        </div>
        <div className="absolute bottom-4 left-4 right-4">
          <p className="text-white text-sm bg-black/30 backdrop-blur-sm rounded-lg p-3">{story.caption}</p>
        </div>
      </div>
    </motion.div>
  );
}

export function StoriesBar() {
  const [selected, setSelected] = useState<string | null>(null);
  return (
    <>
      <div className="bg-card border-b border-border">
        <div className="mx-auto max-w-2xl px-4 py-4">
          <div className="flex gap-4 overflow-x-auto hide-scrollbar pb-2">
            {stories.map((story) => (
              <button
                key={story.id}
                onClick={() => story.type === 'story' && setSelected(story.id)}
                className="flex flex-col items-center gap-2 flex-shrink-0"
              >
                <div className={cn(
                  'relative w-16 h-16 rounded-full p-[2px]',
                  story.type === 'story' && story.hasNewStory
                    ? 'bg-gradient-to-br from-primary to-accent'
                    : 'bg-border'
                )}>
                  {story.type === 'create' ? (
                    <div className="w-full h-full rounded-full bg-secondary flex items-center justify-center">
                      <Plus className="h-6 w-6 text-muted-foreground" />
                    </div>
                  ) : (
                    <div className="relative w-full h-full rounded-full overflow-hidden bg-background p-[2px]">
                      <img src={story.user.avatar} alt={story.user.name} className="w-full h-full object-cover rounded-full" />
                    </div>
                  )}
                </div>
                <span className="text-xs text-muted-foreground truncate w-16 text-center">{story.user.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
      <AnimatePresence>
        {selected && <StoryViewer storyId={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </>
  );
}
