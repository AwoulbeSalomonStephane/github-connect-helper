'use client'

import { MediaUpload } from '@/components/upload/media-upload'

export function ProfileMediaUpload() {
  return <MediaUpload folder="profiles" label="Test profile upload" maxFiles={1} />
}
