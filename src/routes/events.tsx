import { createFileRoute, Link } from '@tanstack/react-router';
import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useQuery } from '@tanstack/react-query';
import { Calendar, MapPin, Search, Filter, Ticket } from 'lucide-react';
import { format } from 'date-fns';
import { Navbar, MobileNav } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { supabase } from '@/integrations/supabase/client';

export const Route = createFileRoute('/events')({
  component: EventsPage,
  head: () => ({ meta: [
    { title: 'Events — VibeCam' },
    { name: 'description', content: 'Discover upcoming events, parties and nightlife across Cameroon.' },
  ] }),
});

const CITY_KEYS = ['yaounde', 'douala', 'bafoussam', 'limbe', 'kribi', 'buea', 'bamenda', 'garoua'] as const;
const CATEGORIES = ['Party', 'Concert', 'Festival', 'Club', 'Pool Party', 'Networking', 'Cultural'];

function formatXaf(v: number) {
  return new Intl.NumberFormat('fr-CM', { style: 'currency', currency: 'XAF', maximumFractionDigits: 0 }).format(v);
}

function EventsPage() {
  const { t } = useTranslation();
  const [search, setSearch] = useState('');
  const [city, setCity] = useState<string>('all');
  const [category, setCategory] = useState<string>('all');

  const { data: events = [], isLoading } = useQuery({
    queryKey: ['events', city, category],
    queryFn: async () => {
      let q = supabase.from('events').select('*, ticket_types(price_xaf, quantity, sold)')
        .eq('status', 'approved').order('starts_at', { ascending: true });
      if (city !== 'all') q = q.eq('city', city);
      if (category !== 'all') q = q.eq('category', category);
      const { data, error } = await q;
      if (error) throw error;
      return data ?? [];
    },
  });

  const filtered = useMemo(() => {
    if (!search.trim()) return events;
    const s = search.toLowerCase();
    return events.filter((e: any) =>
      e.title?.toLowerCase().includes(s) || e.description?.toLowerCase().includes(s) || e.venue?.toLowerCase().includes(s));
  }, [events, search]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-24 md:pb-12 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-2">{t('events.title')}</h1>
          <p className="text-muted-foreground text-lg">{t('events.upcoming')}</p>
        </div>

        <div className="flex flex-col md:flex-row gap-3 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder={t('hero.searchPlaceholder')} value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
          </div>
          <Select value={city} onValueChange={setCity}>
            <SelectTrigger className="md:w-48"><Filter className="mr-2 h-4 w-4" /><SelectValue placeholder={t('events.city')} /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t('common.all')}</SelectItem>
              {CITY_KEYS.map((c) => <SelectItem key={c} value={t(`cities.${c}`)}>{t(`cities.${c}`)}</SelectItem>)}
            </SelectContent>
          </Select>
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className="md:w-48"><SelectValue placeholder={t('events.category')} /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t('common.all')}</SelectItem>
              {CATEGORIES.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>

        {isLoading ? (
          <div className="text-center py-20 text-muted-foreground">{t('common.loading')}</div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 text-muted-foreground">{t('events.empty')}</div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((event: any) => {
              const minPrice = (event.ticket_types as any[])?.reduce((m, tt) => Math.min(m, tt.price_xaf), Infinity);
              const totalLeft = (event.ticket_types as any[])?.reduce((s, tt) => s + (tt.quantity - tt.sold), 0) ?? 0;
              return (
                <Link key={event.id} to="/events/$id" params={{ id: event.id }}
                  className="group bg-card border border-border rounded-2xl overflow-hidden hover:border-primary/50 hover:shadow-lg transition-all">
                  <div className="aspect-[4/3] bg-secondary overflow-hidden">
                    {event.cover_image ? (
                      <img src={event.cover_image} alt={event.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center"><Calendar className="h-12 w-12 text-muted-foreground" /></div>
                    )}
                  </div>
                  <div className="p-5">
                    <div className="flex items-center gap-2 mb-2">
                      {event.category && <Badge variant="secondary">{event.category}</Badge>}
                      {event.featured && <Badge>{t('events.featured')}</Badge>}
                    </div>
                    <h3 className="font-semibold text-lg mb-2 line-clamp-2">{event.title}</h3>
                    <div className="space-y-1.5 text-sm text-muted-foreground mb-3">
                      <div className="flex items-center gap-2"><Calendar className="h-4 w-4" />{format(new Date(event.starts_at), 'PPp')}</div>
                      <div className="flex items-center gap-2"><MapPin className="h-4 w-4" />{event.city}{event.venue && ` · ${event.venue}`}</div>
                    </div>
                    <div className="flex items-center justify-between pt-3 border-t border-border">
                      <span className="font-bold text-primary">{isFinite(minPrice) ? formatXaf(minPrice) : t('common.free')}</span>
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Ticket className="h-3 w-3" />{t('events.ticketsLeft', { count: totalLeft })}
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </main>
      <Footer />
      <MobileNav />
    </div>
  );
}
