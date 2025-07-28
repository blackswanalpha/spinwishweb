'use client'

import { Header } from "@/components/navigation/header";
import { QueueManagement } from "@/components/queue/queue-management";
import { AuthGuard } from "@/components/auth/auth-guard";
import { LazyWrapper } from "@/components/ui/lazy-wrapper";

export default function QueuePage() {
  return (
    <AuthGuard requireAuth={true}>
      <Header
        title="Queue Management"
        subtitle="Manage your song request queue and interact with your audience."
      />
      <main className="flex-1 overflow-auto p-6">
        <LazyWrapper type="skeleton">
          <QueueManagement />
        </LazyWrapper>
      </main>
    </AuthGuard>
  );
}
