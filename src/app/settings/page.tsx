'use client'

import { Header } from "@/components/navigation/header";
import { SettingsManagement } from "@/components/settings/settings-management";
import { AuthGuard } from "@/components/auth/auth-guard";
import { LazyWrapper } from "@/components/ui/lazy-wrapper";

export default function SettingsPage() {
  return (
    <AuthGuard requireAuth={true}>
      <Header
        title="Settings"
        subtitle="Configure your application preferences and account settings."
      />
      <main className="flex-1 overflow-auto p-6">
        <LazyWrapper type="skeleton">
          <SettingsManagement />
        </LazyWrapper>
      </main>
    </AuthGuard>
  );
}
