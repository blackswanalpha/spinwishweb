'use client'

import { Header } from "@/components/navigation/header";
import { AnalyticsDashboard } from "@/components/analytics/analytics-dashboard";
import { AuthGuard } from "@/components/auth/auth-guard";
import { LazyWrapper } from "@/components/ui/lazy-wrapper";

export default function AnalyticsPage() {
  return (
    <AuthGuard requireAuth={true}>
      <Header
        title="Sales Analytics"
        subtitle="Track your performance and earnings with detailed insights."
      />
      <main className="flex-1 overflow-auto p-6">
        <LazyWrapper type="skeleton">
          <AnalyticsDashboard />
        </LazyWrapper>
      </main>
    </AuthGuard>
  );
}
