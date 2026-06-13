'use client'

import { useState } from 'react'
import { Send } from 'lucide-react'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

const mockComments = [
  { id: '1', user: 'Aminata S.', avatar: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=200', text: 'This looks amazing! 🔥', time: '2h' },
  { id: '2', user: 'Paul N.', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200', text: 'See you there!', time: '5h' },
]

export function CommentsSheet({
  open,
  onOpenChange,
  postTitle,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  postTitle?: string
}) {
  const [comments, setComments] = useState(mockComments)
  const [text, setText] = useState('')

  const submit = () => {
    if (!text.trim()) return
    setComments([
      { id: String(Date.now()), user: 'You', avatar: '', text: text.trim(), time: 'now' },
      ...comments,
    ])
    setText('')
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="h-[70vh] rounded-t-2xl">
        <SheetHeader>
          <SheetTitle>Comments {postTitle ? `· ${postTitle}` : ''}</SheetTitle>
        </SheetHeader>
        <div className="flex-1 overflow-y-auto py-4 space-y-4 max-h-[calc(70vh-8rem)]">
          {comments.map((c) => (
            <div key={c.id} className="flex gap-3">
              <Avatar className="h-8 w-8">
                {c.avatar ? <AvatarImage src={c.avatar} /> : null}
                <AvatarFallback>{c.user[0]}</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm">
                  <span className="font-semibold">{c.user}</span>{' '}
                  <span className="text-muted-foreground">{c.text}</span>
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">{c.time}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="flex gap-2 pt-4 border-t border-border">
          <Input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Add a comment..."
            onKeyDown={(e) => e.key === 'Enter' && submit()}
          />
          <Button size="icon" onClick={submit} className="shrink-0">
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  )
}
