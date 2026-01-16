'use client';

import { useEffect, useMemo } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { trackPageView } from '@/lib/ga4-events';

declare global {
  interface Window {
    dataLayer: Array<Record<string, unknown>>;
  }
}

export default function GTMPageView() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const search = useMemo(
    () => searchParams?.toString() ?? "",
    [searchParams]
  );

  useEffect(() => {
    if (!pathname) return;
    const url = search ? `${pathname}?${search}` : pathname;
    trackPageView(url);
  }, [pathname, search]);

  return null;
}


