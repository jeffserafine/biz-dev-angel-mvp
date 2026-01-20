'use client';

import { AppProvider } from '@/lib/store';
import MainLayout from '@/components/layout/MainLayout';

/**
 * Biz Dev Angel OS - Main Application
 *
 * A deal-centric executive command center for business development operators.
 * This is not a CRM. This is not a funnel builder.
 * This is an operating system for strategic deal flow.
 */
export default function Home() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}
