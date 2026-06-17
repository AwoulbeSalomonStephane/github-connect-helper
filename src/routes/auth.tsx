import { createFileRoute, useNavigate, Link } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/use-auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LanguageSwitcher } from '@/components/theme/language-switcher';

export const Route = createFileRoute('/auth')({
  component: AuthPage,
  head: () => ({ meta: [{ title: 'Sign in — VibeCam' }] }),
});

function AuthPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [tab, setTab] = useState<'signin' | 'signup'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [busy, setBusy] = useState(false);

  useEffect(() => { if (user) navigate({ to: '/' }); }, [user, navigate]);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setBusy(false);
    if (error) { toast.error(error.message); return; }
    toast.success(t('auth.signedIn'));
    navigate({ to: '/' });
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 8) { toast.error(t('auth.passwordTooShort')); return; }
    setBusy(true);
    const { error } = await supabase.auth.signUp({
      email, password,
      options: {
        emailRedirectTo: `${window.location.origin}/`,
        data: { name: displayName },
      },
    });
    setBusy(false);
    if (error) { toast.error(error.message); return; }
    toast.success(t('auth.signUpSuccess'));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-primary/5 p-4">
      <div className="absolute top-4 right-4"><LanguageSwitcher /></div>
      <div className="w-full max-w-md">
        <Link to="/" className="flex items-center justify-center gap-2 mb-8">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary">
            <span className="text-lg font-bold text-primary-foreground">V</span>
          </div>
          <span className="text-2xl font-bold tracking-tight">
            Vibe<span className="text-primary">Cam</span>
          </span>
        </Link>

        <div className="bg-card border border-border rounded-2xl shadow-xl p-6">
          <h1 className="text-2xl font-bold mb-1 text-center">
            {tab === 'signin' ? t('auth.welcomeBack') : t('auth.welcome')}
          </h1>
          <p className="text-sm text-muted-foreground text-center mb-6">
            {tab === 'signin' ? t('auth.signInToContinue') : t('auth.createAccount')}
          </p>

          <Tabs value={tab} onValueChange={(v) => setTab(v as 'signin' | 'signup')}>
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="signin">{t('nav.login')}</TabsTrigger>
              <TabsTrigger value="signup">{t('nav.signup')}</TabsTrigger>
            </TabsList>

            <TabsContent value="signin">
              <form onSubmit={handleSignIn} className="space-y-4">
                <div>
                  <Label htmlFor="email">{t('auth.email')}</Label>
                  <Input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" />
                </div>
                <div>
                  <Label htmlFor="password">{t('auth.password')}</Label>
                  <Input id="password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="current-password" />
                </div>
                <Button type="submit" className="w-full" disabled={busy}>
                  {busy && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  {busy ? t('auth.signingIn') : t('nav.login')}
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="signup">
              <form onSubmit={handleSignUp} className="space-y-4">
                <div>
                  <Label htmlFor="name">{t('auth.displayName')}</Label>
                  <Input id="name" required value={displayName} onChange={(e) => setDisplayName(e.target.value)} autoComplete="name" />
                </div>
                <div>
                  <Label htmlFor="email2">{t('auth.email')}</Label>
                  <Input id="email2" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" />
                </div>
                <div>
                  <Label htmlFor="password2">{t('auth.password')}</Label>
                  <Input id="password2" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="new-password" minLength={8} />
                </div>
                <Button type="submit" className="w-full" disabled={busy}>
                  {busy && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  {busy ? t('auth.signingUp') : t('nav.signup')}
                </Button>
              </form>
            </TabsContent>
          </Tabs>

          <p className="text-xs text-muted-foreground text-center mt-6">
            {t('footer.madeIn')}
          </p>
        </div>
      </div>
    </div>
  );
}
