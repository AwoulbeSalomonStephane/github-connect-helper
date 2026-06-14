import { createFileRoute } from '@tanstack/react-router';
import { LandingPage } from '@/components/pages/landing';

export const Route = createFileRoute('/')({
  component: LandingPage,
  head: () => ({
    meta: [
      { title: 'VibeCam — Events, Villas & Experiences in Cameroon' },
      {
        name: 'description',
        content:
          'Discover premium events, luxury villas, nightlife, and unforgettable experiences across Cameroon.',
      },
    ],
  }),
});
