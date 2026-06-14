import { Link as TSLink } from '@tanstack/react-router';
import type { ComponentProps, ReactNode } from 'react';

type Props = Omit<ComponentProps<typeof TSLink>, 'to'> & {
  href?: string;
  to?: string;
  children?: ReactNode;
};

export function Link({ href, to, ...rest }: Props) {
  const target = (to ?? href ?? '/') as string;
  return <TSLink to={target as never} {...rest} />;
}

export default Link;
