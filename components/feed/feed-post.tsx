'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Heart,
  MessageCircle,
  Share2,
  Bookmark,
  MoreHorizontal,
  MapPin,
  Calendar,
  Ticket,
  Play,
  Volume2,
  VolumeX,
  CheckCircle,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils'
import { CommentsSheet } from '@/components/feed/comments-sheet'

export interface FeedPost {
  id: string
  type: 'event' | 'villa' | 'announcement' | 'video' | 'image'
  author: {
    id: string
    name: string
    avatar: string
    verified: boolean
    type: 'organizer' | 'villa_owner' | 'user'
  }
  content: {
    text: string
    media?: {
      type: 'image' | 'video'
      url: string
      aspectRatio?: string
    }[]
    event?: {
      id: string
      title: string
      date: string
      location: string
      price: number
      ticketsLeft: number
    }
    villa?: {
      id: string
      name: string
      location: string
      pricePerNight: number
      rating: number
    }
  }
  engagement: {
    likes: number
    comments: number
    shares: number
    saves: number
  }
  timestamp: string
  isLiked: boolean
  isSaved: boolean
}

const feedPosts: FeedPost[] = [
  {
    id: '1',
    type: 'event',
    author: {
      id: '1',
      name: 'Vibe Events',
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&auto=format&fit=crop&q=80',
      verified: true,
      type: 'organizer',
    },
    content: {
      text: 'The biggest pool party of the year is happening! Join us for an unforgettable evening with top DJs, unlimited drinks, and amazing vibes. Limited tickets available!',
      media: [
        {
          type: 'image',
          url: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800&auto=format&fit=crop&q=80',
        },
      ],
      event: {
        id: '1',
        title: 'Sunset Pool Party',
        date: 'Dec 15, 2025 • 4:00 PM',
        location: 'Aqua Palace, Douala',
        price: 15000,
        ticketsLeft: 45,
      },
    },
    engagement: {
      likes: 456,
      comments: 89,
      shares: 34,
      saves: 123,
    },
    timestamp: '2 hours ago',
    isLiked: false,
    isSaved: false,
  },
  {
    id: '2',
    type: 'villa',
    author: {
      id: '2',
      name: 'Kribi Luxury Villas',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&auto=format&fit=crop&q=80',
      verified: true,
      type: 'villa_owner',
    },
    content: {
      text: 'New listing alert! Experience ocean views like never before at our newest beachfront property. Perfect for weekend getaways and special celebrations.',
      media: [
        {
          type: 'image',
          url: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&auto=format&fit=crop&q=80',
        },
      ],
      villa: {
        id: '1',
        name: 'Ocean View Paradise',
        location: 'Kribi Beach',
        pricePerNight: 150000,
        rating: 4.9,
      },
    },
    engagement: {
      likes: 234,
      comments: 45,
      shares: 23,
      saves: 89,
    },
    timestamp: '4 hours ago',
    isLiked: true,
    isSaved: true,
  },
  {
    id: '3',
    type: 'video',
    author: {
      id: '3',
      name: 'DJ Maestro',
      avatar: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=200&auto=format&fit=crop&q=80',
      verified: false,
      type: 'user',
    },
    content: {
      text: 'Last night was absolutely insane! Thank you Douala for the energy. See you at the next one! 🔥',
      media: [
        {
          type: 'video',
          url: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&auto=format&fit=crop&q=80',
        },
      ],
    },
    engagement: {
      likes: 1234,
      comments: 234,
      shares: 89,
      saves: 45,
    },
    timestamp: '6 hours ago',
    isLiked: false,
    isSaved: false,
  },
  {
    id: '4',
    type: 'announcement',
    author: {
      id: '4',
      name: 'VibeCam Official',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
      verified: true,
      type: 'organizer',
    },
    content: {
      text: 'Exciting news! We have just launched our new mobile app. Download now and get exclusive access to early bird tickets and villa deals. Link in bio!',
      media: [
        {
          type: 'image',
          url: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&auto=format&fit=crop&q=80',
        },
      ],
    },
    engagement: {
      likes: 567,
      comments: 123,
      shares: 234,
      saves: 67,
    },
    timestamp: '8 hours ago',
    isLiked: false,
    isSaved: false,
  },
]

function formatNumber(num: number): string {
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K'
  }
  return num.toString()
}

function formatPrice(price: number): string {
  return new Intl.NumberFormat('fr-CM', {
    style: 'currency',
    currency: 'XAF',
    minimumFractionDigits: 0,
  }).format(price)
}

export function FeedPostCard({ post, index }: { post: FeedPost; index: number }) {
  const [isLiked, setIsLiked] = useState(post.isLiked)
  const [isSaved, setIsSaved] = useState(post.isSaved)
  const [likes, setLikes] = useState(post.engagement.likes)
  const [isMuted, setIsMuted] = useState(true)
  const [commentsOpen, setCommentsOpen] = useState(false)

  const handleLike = () => {
    setIsLiked(!isLiked)
    setLikes(isLiked ? likes - 1 : likes + 1)
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="bg-card border-b border-border"
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4">
        <Link href={`/profile/${post.author.id}`} className="flex items-center gap-3">
          <Avatar className="h-10 w-10 border-2 border-primary/20">
            <AvatarImage src={post.author.avatar} alt={post.author.name} />
            <AvatarFallback>{post.author.name[0]}</AvatarFallback>
          </Avatar>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-semibold text-sm">{post.author.name}</span>
              {post.author.verified && (
                <CheckCircle className="h-4 w-4 fill-primary text-primary-foreground" />
              )}
            </div>
            <span className="text-xs text-muted-foreground">{post.timestamp}</span>
          </div>
        </Link>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreHorizontal className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Report</DropdownMenuItem>
            <DropdownMenuItem>Copy Link</DropdownMenuItem>
            <DropdownMenuItem>Unfollow</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Content */}
      <div className="px-4 pb-3">
        <p className="text-sm leading-relaxed whitespace-pre-line">{post.content.text}</p>
      </div>

      {/* Media */}
      {post.content.media && post.content.media.length > 0 && (
        <div className="relative aspect-square">
          <Image
            src={post.content.media[0].url}
            alt="Post media"
            fill
            className="object-cover"
          />
          {post.content.media[0].type === 'video' && (
            <>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center">
                  <Play className="h-8 w-8 text-primary ml-1" />
                </div>
              </div>
              <button
                onClick={() => setIsMuted(!isMuted)}
                className="absolute bottom-4 right-4 p-2 rounded-full bg-background/80 backdrop-blur-sm"
              >
                {isMuted ? (
                  <VolumeX className="h-5 w-5" />
                ) : (
                  <Volume2 className="h-5 w-5" />
                )}
              </button>
            </>
          )}
        </div>
      )}

      {/* Event/Villa Card */}
      {post.content.event && (
        <Link href={`/events/${post.content.event.id}`}>
          <div className="mx-4 mt-3 p-4 rounded-xl bg-secondary/50 border border-border hover:border-primary/50 transition-colors">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <Badge className="mb-2">{post.type === 'event' ? 'Event' : 'Villa'}</Badge>
                <h3 className="font-semibold mb-1">{post.content.event.title}</h3>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                  <Calendar className="h-4 w-4" />
                  <span>{post.content.event.date}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>{post.content.event.location}</span>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-lg">{formatPrice(post.content.event.price)}</p>
                <p className="text-xs text-muted-foreground flex items-center gap-1 justify-end">
                  <Ticket className="h-3 w-3" />
                  {post.content.event.ticketsLeft} left
                </p>
              </div>
            </div>
          </div>
        </Link>
      )}

      {post.content.villa && (
        <Link href={`/villas/${post.content.villa.id}`}>
          <div className="mx-4 mt-3 p-4 rounded-xl bg-secondary/50 border border-border hover:border-primary/50 transition-colors">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <Badge variant="secondary" className="mb-2">Villa</Badge>
                <h3 className="font-semibold mb-1">{post.content.villa.name}</h3>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>{post.content.villa.location}</span>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-lg">{formatPrice(post.content.villa.pricePerNight)}</p>
                <p className="text-xs text-muted-foreground">per night</p>
              </div>
            </div>
          </div>
        </Link>
      )}

      {/* Actions */}
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-4">
          <button
            onClick={handleLike}
            className="flex items-center gap-2 text-sm hover:text-primary transition-colors"
          >
            <Heart
              className={cn(
                'h-6 w-6 transition-all',
                isLiked && 'fill-red-500 text-red-500 scale-110'
              )}
            />
            <span>{formatNumber(likes)}</span>
          </button>
          <button
            type="button"
            onClick={() => setCommentsOpen(true)}
            className="flex items-center gap-2 text-sm hover:text-primary transition-colors"
          >
            <MessageCircle className="h-6 w-6" />
            <span>{formatNumber(post.engagement.comments)}</span>
          </button>
          <button className="flex items-center gap-2 text-sm hover:text-primary transition-colors">
            <Share2 className="h-6 w-6" />
            <span>{formatNumber(post.engagement.shares)}</span>
          </button>
        </div>
        <button
          onClick={() => setIsSaved(!isSaved)}
          className="hover:text-primary transition-colors"
        >
          <Bookmark
            className={cn(
              'h-6 w-6 transition-all',
              isSaved && 'fill-primary text-primary'
            )}
          />
        </button>
      </div>

      <CommentsSheet
        open={commentsOpen}
        onOpenChange={setCommentsOpen}
        postTitle={post.content.event?.title || post.content.villa?.name}
      />
    </motion.article>
  )
}

export function FeedList() {
  return (
    <div className="divide-y divide-border">
      {feedPosts.map((post, index) => (
        <FeedPostCard key={post.id} post={post} index={index} />
      ))}
    </div>
  )
}
