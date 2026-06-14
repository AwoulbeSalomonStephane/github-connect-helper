import { useRouterState } from '@tanstack/react-router';

export function usePathname(): string {
  return useRouterState({ select: (s) => s.location.pathname });
}
