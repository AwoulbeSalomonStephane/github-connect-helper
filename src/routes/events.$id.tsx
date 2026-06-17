import { createFileRoute, useNavigate, Link } from '@tanstack/react-router';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useQuery } from '@tanstack/react-query';
import { Calendar, MapPin, Ticket, Heart, Share2, ArrowLeft, Loader2 } from 'lucide-react';
import { format } from 'date-fns';
import { toast } from 'sonner';
import { Navbar, MobileNav } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/use-auth';

export const Route = createFileRoute('/events/$id')({
  component: EventDetailPage,
});

function formatXaf(v: number) {
  return new Intl.NumberFormat('fr-CM', { style: 'currency', currency: 'XAF', maximumFractionDigits: 0 }).format(v);
}

function EventDetailPage() {
  const { id } = Route.useParams();
  const { t } = useTranslation();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [qty, setQty] = useState(1);
  const [buying, setBuying] = useState(false);

  const { data: event, isLoading } = useQuery({
    queryKey: ['event', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('events')
        .select('*, ticket_types(*), profiles!events_organizer_id_fkey(display_name, avatar_url, username)')
        .eq('id', id).maybeSingle();
      if (error) throw error;
      return data;
    },
  });

  const buy = async () => {
    if (!user) { navigate({ to: '/auth' }); return; }
    if (!selectedType || !event) return;
    const tt = (event.ticket_types as any[]).find((t) => t.id === selectedType);
    if (!tt) return;
    setBuying(true);
    const total = tt.price_xaf * qty;
    const fee = Math.round(total * 0.1);
    const { error } = await supabase.from('ticket_purchases').insert({
      user_id: user.id, event_id: event.id, ticket_type_id: tt.id, quantity: qty,
      unit_price_xaf: tt.price_xaf, total_xaf: total,
      platform_fee_xaf: fee, organizer_payout_xaf: total - fee,
      status: 'pending',
    });
    setBuying(false);
    if (error) { toast.error(error.message); return; }
    toast.success(t('common.success'));
    navigate({ to: '/tickets' });
  };

  if (isLoading) return <div className="min-h-screen flex items-center justify-center"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>;
  if (!event) return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 px-4 max-w-3xl mx-auto text-center">
        <h1 className="text-2xl font-bold">404</h1>
        <Link to="/events" className="text-primary underline">{t('common.back')}</Link>
      </main>
    </div>
  );

  const types = (event.ticket_types as any[]) ?? [];
  const organizer = (event as any).profiles;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-20 pb-24 md:pb-12">
        <div className="relative h-72 md:h-96 bg-secondary overflow-hidden">
          {event.cover_image && <img src={event.cover_image} alt={event.title} className="w-full h-full object-cover" />}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
        </div>
        <div className="mx-auto max-w-5xl px-4 sm:px-6 -mt-20 relative">
          <Link to="/events"><Button variant="ghost" size="sm" className="mb-4"><ArrowLeft className="h-4 w-4 mr-2" />{t('common.back')}</Button></Link>
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div>
                {event.category && <Badge className="mb-3">{event.category}</Badge>}
                <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">{event.title}</h1>
                <div className="space-y-2 text-muted-foreground">
                  <div className="flex items-center gap-2"><Calendar className="h-4 w-4" />{format(new Date(event.starts_at), 'PPPP p')}</div>
                  <div className="flex items-center gap-2"><MapPin className="h-4 w-4" />{event.city}{event.venue && ` · ${event.venue}`}{event.address && ` · ${event.address}`}</div>
                </div>
              </div>
              {organizer && (
                <div className="flex items-center gap-3 p-4 rounded-xl bg-card border border-border">
                  <div className="text-sm text-muted-foreground">{t('events.organizer')}</div>
                  <div className="font-semibold">{organizer.display_name ?? organizer.username}</div>
                </div>
              )}
              {event.description && (
                <div className="prose prose-invert max-w-none">
                  <p className="whitespace-pre-line text-foreground/90">{event.description}</p>
                </div>
              )}
            </div>

            <aside className="lg:sticky lg:top-24 self-start space-y-4">
              <div className="bg-card border border-border rounded-2xl p-6">
                <h3 className="font-semibold mb-4 flex items-center gap-2"><Ticket className="h-4 w-4" />{t('events.buyTicket')}</h3>
                {types.length === 0 ? (
                  <p className="text-sm text-muted-foreground">{t('common.comingSoon')}</p>
                ) : (
                  <div className="space-y-3">
                    {types.map((tt) => {
                      const left = tt.quantity - tt.sold;
                      const soldOut = left <= 0;
                      return (
                        <button key={tt.id} disabled={soldOut} onClick={() => setSelectedType(tt.id)}
                          className={`w-full text-left p-3 rounded-lg border transition-colors ${selectedType === tt.id ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'} ${soldOut ? 'opacity-50 cursor-not-allowed' : ''}`}>
                          <div className="flex justify-between items-start">
                            <div>
                              <div className="font-medium">{tt.name}</div>
                              {tt.description && <div className="text-xs text-muted-foreground">{tt.description}</div>}
                            </div>
                            <div className="text-right">
                              <div className="font-bold text-primary">{formatXaf(tt.price_xaf)}</div>
                              <div className="text-xs text-muted-foreground">{soldOut ? t('events.soldOut') : t('events.ticketsLeft', { count: left })}</div>
                            </div>
                          </div>
                        </button>
                      );
                    })}
                    {selectedType && (
                      <>
                        <div className="flex items-center gap-2 pt-2">
                          <label className="text-sm">Qty</label>
                          <input type="number" min={1} max={10} value={qty} onChange={(e) => setQty(Math.max(1, +e.target.value))}
                            className="w-20 px-2 py-1 rounded border border-border bg-background" />
                        </div>
                        <Button className="w-full" onClick={buy} disabled={buying}>
                          {buying && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                          {t('events.buyTicket')}
                        </Button>
                        <p className="text-xs text-muted-foreground text-center">
                          {t('common.comingSoon')}: Stripe + MTN/Orange Money
                        </p>
                      </>
                    )}
                  </div>
                )}
              </div>
              <div className="flex gap-2">
                <Button variant="outline" className="flex-1"><Heart className="h-4 w-4 mr-2" />{t('events.save')}</Button>
                <Button variant="outline" className="flex-1"><Share2 className="h-4 w-4 mr-2" />{t('events.share')}</Button>
              </div>
            </aside>
          </div>
        </div>
      </main>
      <Footer />
      <MobileNav />
    </div>
  );
}
