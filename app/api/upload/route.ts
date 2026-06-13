import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { getCloudinary, isCloudinaryConfigured, UPLOAD_FOLDERS, type UploadFolder } from '@/lib/cloudinary'

export async function POST(request: Request) {
  if (!isCloudinaryConfigured()) {
    return NextResponse.json(
      {
        error:
          'Cloudinary is not configured. Add CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET to .env.local',
      },
      { status: 503 },
    )
  }

  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Sign in to upload media.' }, { status: 401 })
  }

  const formData = await request.formData()
  const file = formData.get('file') as File | null
  const folderKey = (formData.get('folder') as UploadFolder) || 'applications'

  if (!file) {
    return NextResponse.json({ error: 'No file provided.' }, { status: 400 })
  }

  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)
  const folder = UPLOAD_FOLDERS[folderKey] ?? UPLOAD_FOLDERS.applications
  const resourceType = file.type.startsWith('video/') ? 'video' : 'image'

  try {
    const cloudinary = getCloudinary()
    const result = await new Promise<{
      secure_url: string
      public_id: string
      resource_type: string
    }>((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder: `${folder}/${user.id}`,
          resource_type: resourceType,
        },
        (error, uploadResult) => {
          if (error || !uploadResult) reject(error ?? new Error('Upload failed'))
          else resolve(uploadResult as typeof uploadResult & { secure_url: string; public_id: string })
        },
      )
      stream.end(buffer)
    })

    await supabase.from('media_uploads').insert({
      user_id: user.id,
      url: result.secure_url,
      public_id: result.public_id,
      resource_type: resourceType,
      folder,
    })

    return NextResponse.json({
      url: result.secure_url,
      publicId: result.public_id,
      resourceType,
    })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Upload failed'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
