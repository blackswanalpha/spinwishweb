'use client'

import { Header } from "@/components/navigation/header";
import { RequestsManagement } from "@/components/requests/requests-management";
import { AuthGuard } from "@/components/auth/auth-guard";
import { LazyWrapper } from "@/components/ui/lazy-wrapper";

export default function RequestsPage() {
  return (
    <AuthGuard requireAuth={true}>
      <Header
        title="Song Requests"
        subtitle="Browse and request songs from your favorite artists."
      />
      <main className="flex-1 overflow-auto p-6">
        <LazyWrapper type="skeleton">
          <RequestsManagement />
        </LazyWrapper>
      </main>
    </AuthGuard>
  );
}
