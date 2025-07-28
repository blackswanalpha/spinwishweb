'use client'

import { Header } from "@/components/navigation/header";
import { TipsManagement } from "@/components/tips/tips-management";
import { AuthGuard } from "@/components/auth/auth-guard";
import { LazyWrapper } from "@/components/ui/lazy-wrapper";

export default function TipsPage() {
  return (
    <AuthGuard requireAuth={true}>
      <Header
        title="Tips & Payments"
        subtitle="Manage your tips and payment transactions."
      />
      <main className="flex-1 overflow-auto p-6">
        <LazyWrapper type="skeleton">
          <TipsManagement />
        </LazyWrapper>
      </main>
    </AuthGuard>
  );
}
