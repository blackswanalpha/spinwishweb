'use client'

import { Header } from "@/components/navigation/header"
import { DJShowcase } from "@/components/dj/dj-showcase"
import { AuthGuard } from "@/components/auth/auth-guard"
import { LazyWrapper } from "@/components/ui/lazy-wrapper"

export default function DJsPage() {
  return (
    <AuthGuard requireAuth={true}>
      <Header 
        title="DJ Directory" 
        subtitle="Discover talented DJs and request your favorite songs"
      />
      <main className="flex-1 overflow-auto p-6">
        <LazyWrapper type="skeleton">
          <DJShowcase />
        </LazyWrapper>
      </main>
    </AuthGuard>
  )
}
