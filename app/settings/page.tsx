import { SiteShell } from '@/components/layout/site-shell'
import { ThemeSelectorPanel } from '@/components/theme/theme-picker'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ProfileMediaUpload } from '@/components/settings/profile-media-upload'
import { Upload, ImageIcon, Film } from 'lucide-react'

export default function SettingsPage() {
  return (
    <SiteShell>
      <div className="mx-auto max-w-2xl px-4 sm:px-6 py-10 space-y-8">
        <h1 className="text-2xl font-bold">Settings</h1>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Appearance</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Choose from 4 light themes (including Cameroon) and 4 dark themes (Violet Night is default).
            </p>
            <ThemeSelectorPanel />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Upload className="h-5 w-5" />
              Media uploads
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Images and videos are stored on <strong>Cloudinary</strong> under the <code className="text-xs">vibecam/</code> folder.
            </p>
            <ul className="text-sm space-y-2 text-muted-foreground">
              <li className="flex items-center gap-2">
                <ImageIcon className="h-4 w-4 text-primary" />
                <code className="text-xs">vibecam/profiles</code> — avatars & cover photos
              </li>
              <li className="flex items-center gap-2">
                <Film className="h-4 w-4 text-primary" />
                <code className="text-xs">vibecam/events</code> — flyers & event videos
              </li>
              <li className="flex items-center gap-2">
                <ImageIcon className="h-4 w-4 text-primary" />
                <code className="text-xs">vibecam/villas</code> — villa galleries & walkthroughs
              </li>
              <li className="flex items-center gap-2">
                <Film className="h-4 w-4 text-primary" />
                <code className="text-xs">vibecam/stories</code> — feed stories
              </li>
              <li className="flex items-center gap-2">
                <Upload className="h-4 w-4 text-primary" />
                <code className="text-xs">vibecam/applications</code> — host application media
              </li>
            </ul>
            <ProfileMediaUpload />
          </CardContent>
        </Card>
      </div>
    </SiteShell>
  )
}
