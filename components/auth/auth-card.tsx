'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState, useTransition } from 'react'
import { motion } from 'framer-motion'
import { Eye, EyeOff, Mail, Lock, User, Phone, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Checkbox } from '@/components/ui/checkbox'
import { createClient, isSupabaseConfigured } from '@/lib/supabase/client'
import { Alert, AlertDescription } from '@/components/ui/alert'

type AuthMode = 'login' | 'signup'

export function AuthCard({ mode }: { mode: AuthMode }) {
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [pending, startTransition] = useTransition()
  const router = useRouter()
  const isLogin = mode === 'login'
  const configured = isSupabaseConfigured()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!configured) return

    const form = e.currentTarget
    const formData = new FormData(form)
    const email = String(formData.get('email'))
    const password = String(formData.get('password'))

    startTransition(async () => {
      setError(null)
      const supabase = createClient()

      if (isLogin) {
        const { error: authError } = await supabase.auth.signInWithPassword({ email, password })
        if (authError) {
          setError(authError.message)
          return
        }
        router.push('/feed')
        router.refresh()
      } else {
        const fullName = String(formData.get('full_name'))
        const phone = String(formData.get('phone'))
        const { error: authError } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { full_name: fullName, phone },
          },
        })
        if (authError) {
          setError(authError.message)
          return
        }
        router.push('/feed')
        router.refresh()
      }
    })
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
      <div className="text-center mb-8">
        <Link href="/" className="inline-flex items-center gap-2 mb-6">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary">
            <span className="text-xl font-bold text-primary-foreground">V</span>
          </div>
          <span className="text-2xl font-bold">
            Vibe<span className="text-primary">Cam</span>
          </span>
        </Link>
        <h1 className="text-2xl font-bold">{isLogin ? 'Welcome back' : 'Join the vibe'}</h1>
        <p className="text-muted-foreground mt-2">
          {isLogin
            ? 'Sign in to book events, villas, and connect with organizers'
            : 'Create your account and discover Cameroon&apos;s best experiences'}
        </p>
      </div>

      {!configured && (
        <Alert className="mb-4 border-primary/30">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription className="text-sm">
            Add Supabase keys to <code className="text-xs">.env.local</code> to enable live auth. See{' '}
            <code className="text-xs">.env.example</code>.
          </AlertDescription>
        </Alert>
      )}

      <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 card-shadow">
        <form className="space-y-4" onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="space-y-2">
              <Label htmlFor="full_name">Full name</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input id="full_name" name="full_name" placeholder="Marie Kamga" className="pl-10" required />
              </div>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input id="email" name="email" type="email" placeholder="you@example.com" className="pl-10" required />
            </div>
          </div>

          {!isLogin && (
            <div className="space-y-2">
              <Label htmlFor="phone">Phone (optional)</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input id="phone" name="phone" placeholder="+237 6XX XXX XXX" className="pl-10" />
              </div>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                className="pl-10 pr-10"
                required
                minLength={6}
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          {error && <p className="text-sm text-destructive">{error}</p>}

          {isLogin ? (
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2">
                <Checkbox id="remember" />
                <span>Remember me</span>
              </label>
              <Link href="/help" className="text-primary hover:underline">
                Forgot password?
              </Link>
            </div>
          ) : (
            <label className="flex items-start gap-2 text-sm">
              <Checkbox id="terms" required className="mt-0.5" />
              <span className="text-muted-foreground">
                I agree to the{' '}
                <Link href="/terms" className="text-primary hover:underline">
                  Terms
                </Link>{' '}
                and{' '}
                <Link href="/privacy" className="text-primary hover:underline">
                  Privacy Policy
                </Link>
              </span>
            </label>
          )}

          <Button
            type="submit"
            disabled={!configured || pending}
            className="w-full h-11 cameroon-gradient text-primary-foreground"
          >
            {pending ? 'Please wait…' : isLogin ? 'Sign in' : 'Create account'}
          </Button>
        </form>

        <div className="relative my-6">
          <Separator />
          <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-card px-2 text-xs text-muted-foreground">
            or continue with
          </span>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Button variant="outline" type="button" className="w-full" disabled>
            Google
          </Button>
          <Button variant="outline" type="button" className="w-full" disabled>
            Apple
          </Button>
        </div>

        <p className="text-center text-sm text-muted-foreground mt-6">
          {isLogin ? (
            <>
              Don&apos;t have an account?{' '}
              <Link href="/signup" className="text-primary font-medium hover:underline">
                Sign up
              </Link>
            </>
          ) : (
            <>
              Already have an account?{' '}
              <Link href="/login" className="text-primary font-medium hover:underline">
                Sign in
              </Link>
            </>
          )}
        </p>
      </div>

      {!isLogin && (
        <p className="text-center text-xs text-muted-foreground mt-6">
          Hosting events or villas?{' '}
          <Link href="/become-organizer" className="text-primary hover:underline">
            Become an organizer
          </Link>{' '}
          or{' '}
          <Link href="/list-villa" className="text-primary hover:underline">
            list your villa
          </Link>
        </p>
      )}
    </motion.div>
  )
}
