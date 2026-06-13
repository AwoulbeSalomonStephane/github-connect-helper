import { AuthCard } from '@/components/auth/auth-card'

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-gradient-to-br from-background via-background to-secondary/40">
      <AuthCard mode="login" />
    </div>
  )
}
