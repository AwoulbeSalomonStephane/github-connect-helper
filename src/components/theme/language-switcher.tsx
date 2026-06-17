import { useTranslation } from 'react-i18next';
import { Languages } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { SUPPORTED_LANGUAGES } from '@/i18n';

export function LanguageSwitcher() {
  const { i18n, t } = useTranslation();
  const current = SUPPORTED_LANGUAGES.find((l) => l.code === i18n.language) ?? SUPPORTED_LANGUAGES[0];
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" aria-label={t('nav.language')}>
          <Languages className="h-5 w-5" />
          <span className="sr-only">{current.label}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {SUPPORTED_LANGUAGES.map((l) => (
          <DropdownMenuItem key={l.code} onClick={() => i18n.changeLanguage(l.code)}>
            <span className="mr-2">{l.flag}</span>
            {l.label}
            {l.code === current.code && <span className="ml-auto text-primary">●</span>}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
