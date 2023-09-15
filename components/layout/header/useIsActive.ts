import { usePathname } from 'next/navigation';

export function useIsActive(href: string) {
  const path = usePathname();
  const firstSegment = path.split('/')[1];
  const isActive = firstSegment === href.split('/')[1];
  return isActive;
}
