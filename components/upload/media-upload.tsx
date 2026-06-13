'use client'

import { useCallback, useState } from 'react'
import Image from 'next/image'
import { Upload, X, Loader2, Film, ImageIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import type { UploadFolder } from '@/lib/cloudinary'

type MediaUploadProps = {
  folder?: UploadFolder
  accept?: string
  multiple?: boolean
  maxFiles?: number
  value?: string[]
  onChange?: (urls: string[]) => void
  label?: string
  hint?: string
}

export function MediaUpload({
  folder = 'applications',
  accept = 'image/*,video/*',
  multiple = true,
  maxFiles = 6,
  value = [],
  onChange,
  label = 'Upload photos or videos',
  hint = 'Images & videos go to Cloudinary (vibecam folder)',
}: MediaUploadProps) {
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const uploadFiles = useCallback(
    async (files: FileList | null) => {
      if (!files?.length) return
      setError(null)
      setUploading(true)

      const next = [...value]
      try {
        for (const file of Array.from(files).slice(0, maxFiles - next.length)) {
          const body = new FormData()
          body.append('file', file)
          body.append('folder', folder)

          const res = await fetch('/api/upload', { method: 'POST', body })
          const data = await res.json()

          if (!res.ok) {
            throw new Error(data.error ?? 'Upload failed')
          }
          next.push(data.url)
        }
        onChange?.(next)
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Upload failed')
      } finally {
        setUploading(false)
      }
    },
    [folder, maxFiles, onChange, value],
  )

  const remove = (url: string) => {
    onChange?.(value.filter((u) => u !== url))
  }

  return (
    <div className="space-y-3">
      <p className="text-sm font-medium">{label}</p>
      {hint && <p className="text-xs text-muted-foreground">{hint}</p>}

      <label
        className={cn(
          'flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-border p-6 cursor-pointer hover:border-primary/40 transition-colors',
          uploading && 'opacity-60 pointer-events-none',
        )}
      >
        <input
          type="file"
          className="sr-only"
          accept={accept}
          multiple={multiple}
          onChange={(e) => uploadFiles(e.target.files)}
        />
        {uploading ? (
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        ) : (
          <Upload className="h-8 w-8 text-muted-foreground" />
        )}
        <span className="text-sm text-muted-foreground">
          {uploading ? 'Uploading…' : 'Tap to upload images or videos'}
        </span>
      </label>

      {error && <p className="text-sm text-destructive">{error}</p>}

      {value.length > 0 && (
        <div className="grid grid-cols-3 gap-2">
          {value.map((url) => (
            <div key={url} className="relative aspect-square rounded-lg overflow-hidden border border-border group">
              {url.includes('/video/') || url.endsWith('.mp4') ? (
                <div className="flex h-full items-center justify-center bg-secondary">
                  <Film className="h-8 w-8 text-muted-foreground" />
                </div>
              ) : (
                <Image src={url} alt="" fill className="object-cover" unoptimized />
              )}
              <button
                type="button"
                onClick={() => remove(url)}
                className="absolute top-1 right-1 p-1 rounded-full bg-background/80 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          ))}
        </div>
      )}

      {value.length === 0 && (
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <ImageIcon className="h-3.5 w-3.5" />
          Used in applications, events, villas, stories & profiles
        </div>
      )}
    </div>
  )
}
