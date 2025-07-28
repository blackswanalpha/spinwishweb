'use client'

import { Header } from "@/components/navigation/header";
import { ProfileManagement } from "@/components/profile/profile-management";
import { AuthGuard } from "@/components/auth/auth-guard";
import { LazyWrapper } from "@/components/ui/lazy-wrapper";

export default function ProfilePage() {
  return (
    <AuthGuard requireAuth={true}>
      <Header
        title="Profile"
        subtitle="Manage your personal information and preferences."
      />
      <main className="flex-1 overflow-auto p-6">
        <LazyWrapper type="skeleton">
          <ProfileManagement />
        </LazyWrapper>
      </main>
    </AuthGuard>
  );
}
