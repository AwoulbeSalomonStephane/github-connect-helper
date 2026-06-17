import { Link, useRouterState, useNavigate } from '@tanstack/react-router';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search, Menu, X, Bell, Home, Calendar, Building2, Sparkles, Users, LayoutGrid, User, LogOut,
} from 'lucide-react';
import { ThemePicker } from '@/components/theme/theme-picker';
import { LanguageSwitcher } from '@/components/theme/language-switcher';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel,
  DropdownMenuSeparator, DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { useAuth } from '@/hooks/use-auth';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const { user, signOut, hasRole } = useAuth();
  const navigate = useNavigate();

  const navLinks = [
    { to: '/', label: t('nav.home'), icon: Home },
    { to: '/feed', label: t('nav.feed'), icon: LayoutGrid },
    { to: '/events', label: t('nav.events'), icon: Calendar },
    { to: '/villas', label: t('nav.villas'), icon: Building2 },
    { to: '/experiences', label: t('nav.experiences'), icon: Sparkles },
    { to: '/organizers', label: t('nav.organizers'), icon: Users },
  ] as const;

  const initials = (user?.user_metadata?.name as string | undefined)?.slice(0, 1).toUpperCase()
    || user?.email?.slice(0, 1).toUpperCase() || 'U';

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-border/40 shadow-sm shadow-black/5">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <Link to="/" className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary">
                <span className="text-lg font-bold text-primary-foreground">V</span>
              </div>
              <span className="text-xl font-bold tracking-tight">
                Vibe<span className="text-primary">Cam</span>
              </span>
            </Link>

            <div className="hidden lg:flex items-center gap-0.5">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={cn(
                    'px-3 py-2 text-sm font-medium rounded-lg transition-colors',
                    pathname === link.to
                      ? 'text-primary bg-primary/10'
                      : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="flex items-center gap-1">
              <Link to="/search">
                <Button variant="ghost" size="icon" className="hidden sm:flex" aria-label={t('common.search')}>
                  <Search className="h-5 w-5" />
                </Button>
              </Link>
              <LanguageSwitcher />
              <ThemePicker />
              {user && (
                <Link to="/notifications">
                  <Button variant="ghost" size="icon" className="hidden sm:flex relative" aria-label={t('nav.notifications')}>
                    <Bell className="h-5 w-5" />
                  </Button>
                </Link>
              )}

              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="rounded-full">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={user.user_metadata?.avatar_url} />
                        <AvatarFallback>{initials}</AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel className="truncate">{user.email}</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => navigate({ to: '/settings' })}>
                      <User className="mr-2 h-4 w-4" />{t('nav.profile')}
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate({ to: '/tickets' })}>
                      <Calendar className="mr-2 h-4 w-4" />{t('dashboard.myTickets')}
                    </DropdownMenuItem>
                    {hasRole('organizer') && (
                      <DropdownMenuItem onClick={() => navigate({ to: '/dashboard/organizer' })}>
                        <LayoutGrid className="mr-2 h-4 w-4" />{t('roles.organizer')}
                      </DropdownMenuItem>
                    )}
                    {hasRole('villa_owner') && (
                      <DropdownMenuItem onClick={() => navigate({ to: '/dashboard/villa-owner' })}>
                        <Building2 className="mr-2 h-4 w-4" />{t('roles.villa_owner')}
                      </DropdownMenuItem>
                    )}
                    {hasRole('admin') && (
                      <DropdownMenuItem onClick={() => navigate({ to: '/admin' })}>
                        <Sparkles className="mr-2 h-4 w-4" />{t('roles.admin')}
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => signOut()}>
                      <LogOut className="mr-2 h-4 w-4" />{t('nav.logout')}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <div className="hidden sm:flex items-center gap-2 ml-1">
                  <Link to="/auth"><Button variant="ghost" size="sm">{t('nav.login')}</Button></Link>
                  <Link to="/auth"><Button size="sm">{t('nav.signup')}</Button></Link>
                </div>
              )}

              <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setIsOpen(true)} aria-label={t('nav.menu')}>
                <Menu className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm lg:hidden"
              onClick={() => setIsOpen(false)} />
            <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 z-50 w-3/4 max-w-sm bg-card border-l border-border p-6 lg:hidden overflow-y-auto">
              <div className="flex items-center justify-between mb-8">
                <span className="text-lg font-bold">{t('nav.menu')}</span>
                <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}><X className="h-5 w-5" /></Button>
              </div>
              <div className="flex flex-col gap-2">
                {navLinks.map((link) => (
                  <Link key={link.to} to={link.to} onClick={() => setIsOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 text-base font-medium text-muted-foreground hover:text-foreground hover:bg-secondary rounded-lg">
                    <link.icon className="h-5 w-5" />{link.label}
                  </Link>
                ))}
              </div>
              <div className="mt-8 flex flex-col gap-2">
                {user ? (
                  <Button variant="outline" className="w-full" onClick={() => { signOut(); setIsOpen(false); }}>
                    <LogOut className="mr-2 h-4 w-4" />{t('nav.logout')}
                  </Button>
                ) : (
                  <>
                    <Link to="/auth" onClick={() => setIsOpen(false)}><Button variant="outline" className="w-full">{t('nav.login')}</Button></Link>
                    <Link to="/auth" onClick={() => setIsOpen(false)}><Button className="w-full">{t('nav.signup')}</Button></Link>
                  </>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

export function MobileNav() {
  const { t } = useTranslation();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const { user } = useAuth();

  const links = [
    { to: '/', label: t('nav.home'), icon: Home },
    { to: '/events', label: t('nav.events'), icon: Calendar },
    { to: '/villas', label: t('nav.villas'), icon: Building2 },
    { to: '/feed', label: t('nav.feed'), icon: LayoutGrid },
    { to: user ? '/settings' : '/auth', label: t('nav.profile'), icon: User },
  ] as const;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 glass md:hidden border-t border-border/40 pb-[env(safe-area-inset-bottom)]">
      <div className="flex items-center justify-around py-2">
        {links.map((link) => {
          const active = pathname === link.to;
          return (
            <Link key={link.to} to={link.to}
              className={cn('flex flex-col items-center gap-1 px-2 py-2 transition-colors',
                active ? 'text-primary' : 'text-muted-foreground')}>
              <link.icon className={cn('h-5 w-5', active && 'scale-110')} />
              <span className="text-[10px] font-medium">{link.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
