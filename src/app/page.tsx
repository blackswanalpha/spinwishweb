'use client'

import { useSession } from 'next-auth/react'
import { Header } from "@/components/navigation/header";
import { Dashboard } from "@/components/dashboard/dashboard";
import { DJDashboard } from "@/components/dj/dj-dashboard";
import { AuthGuard } from "@/components/auth/auth-guard";

export default function Home() {
  const { data: session } = useSession()

  return (
    <AuthGuard requireAuth={true}>
      <Header
        title="DJ Dashboard"
        subtitle={`Welcome back${session?.user?.firstName ? `, DJ ${session.user.firstName}` : ''}! Manage your performances and track your earnings.`}
      />
      <main className="flex-1 overflow-auto p-6">
        {session?.user?.role === 'dj' ? <DJDashboard /> : <Dashboard />}
      </main>
    </AuthGuard>
  );
}
