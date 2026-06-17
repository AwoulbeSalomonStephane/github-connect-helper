import { createFileRoute, Link } from '@tanstack/react-router';
import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useQuery } from '@tanstack/react-query';
import { MapPin, Search, Users, Building2 } from 'lucide-react';
import { Navbar, MobileNav } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { supabase } from '@/integrations/supabase/client';

export const Route = createFileRoute('/villas')({
  component: VillasPage,
  head: () => ({ meta: [{ title: 'Villas — VibeCam' }] }),
});

const CITY_KEYS = ['yaounde', 'douala', 'bafoussam', 'limbe', 'kribi', 'buea', 'bamenda', 'garoua'] as const;
const fmt = (v: number) => new Intl.NumberFormat('fr-CM', { style: 'currency', currency: 'XAF', maximumFractionDigits: 0 }).format(v);

function VillasPage() {
  const { t } = useTranslation();
  const [search, setSearch] = useState('');
  const [city, setCity] = useState('all');

  const { data: villas = [], isLoading } = useQuery({
    queryKey: ['villas', city],
    queryFn: async () => {
      let q = supabase.from('villas').select('*').eq('status', 'approved').order('featured', { ascending: false });
      if (city !== 'all') q = q.eq('city', city);
      const { data, error } = await q;
      if (error) throw error;
      return data ?? [];
    },
  });

  const filtered = useMemo(() => {
    if (!search.trim()) return villas;
    const s = search.toLowerCase();
    return villas.filter((v: any) => v.title?.toLowerCase().includes(s) || v.description?.toLowerCase().includes(s));
  }, [villas, search]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-24 md:pb-12 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-2">{t('villas.title')}</h1>
          <p className="text-muted-foreground text-lg">{t('villas.featured')}</p>
        </div>
        <div className="flex flex-col md:flex-row gap-3 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder={t('hero.searchPlaceholder')} value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
          </div>
          <Select value={city} onValueChange={setCity}>
            <SelectTrigger className="md:w-48"><SelectValue placeholder={t('events.city')} /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t('common.all')}</SelectItem>
              {CITY_KEYS.map((c) => <SelectItem key={c} value={t(`cities.${c}`)}>{t(`cities.${c}`)}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>

        {isLoading ? (
          <div className="text-center py-20 text-muted-foreground">{t('common.loading')}</div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 text-muted-foreground">{t('events.empty')}</div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((v: any) => (
              <Link key={v.id} to="/villas/$id" params={{ id: v.id }}
                className="group bg-card border border-border rounded-2xl overflow-hidden hover:border-primary/50 hover:shadow-lg transition-all">
                <div className="aspect-[4/3] bg-secondary overflow-hidden">
                  {v.cover_image ? <img src={v.cover_image} alt={v.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                    : <div className="w-full h-full flex items-center justify-center"><Building2 className="h-12 w-12 text-muted-foreground" /></div>}
                </div>
                <div className="p-5">
                  {v.featured && <Badge className="mb-2">{t('villas.featured')}</Badge>}
                  <h3 className="font-semibold text-lg mb-2 line-clamp-1">{v.title}</h3>
                  <div className="space-y-1.5 text-sm text-muted-foreground mb-3">
                    <div className="flex items-center gap-2"><MapPin className="h-4 w-4" />{v.city}</div>
                    <div className="flex items-center gap-2"><Users className="h-4 w-4" />{t('villas.capacity', { count: v.capacity })}</div>
                  </div>
                  <div className="flex items-center justify-between pt-3 border-t border-border">
                    <span className="font-bold text-primary">{fmt(v.price_per_night_xaf)}</span>
                    <span className="text-xs text-muted-foreground">{t('common.perNight')}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
      <Footer />
      <MobileNav />
    </div>
  );
}
