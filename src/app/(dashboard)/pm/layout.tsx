// src/app/(dashboard)/pm/layout.tsx - Updated PM Layout
import { ProtectedRoute } from '@/components/ProtectedRoute'
import PMSidebar from '@/components/pm/PMSidebar'

export default function PMLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ProtectedRoute requiredRole="pm">
      <div className="flex h-screen bg-slate-100">
        <PMSidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <main className="flex-1 overflow-x-hidden overflow-y-auto bg-slate-50">
            {children}
          </main>
        </div>
      </div>
    </ProtectedRoute>
  )
}