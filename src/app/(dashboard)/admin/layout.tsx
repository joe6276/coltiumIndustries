//src/app/(dashboard)/admin/layout.tsx
import { ProtectedRoute } from '@/components/ProtectedRoute'
import ResponsiveAdminSidebar from '@/components/admin/ResponsiveAdminSidebar'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ProtectedRoute requiredRole="admin">
      <div className="flex h-screen flex-col md:flex-row md:overflow-hidden bg-slate-100">
        <div className="w-full flex-none md:w-64">
          <ResponsiveAdminSidebar />
        </div>
        <div className="flex-grow overflow-y-auto bg-slate-50 p-4 md:p-6">
          <main className="h-full">
            {children}
          </main>
        </div>
      </div>
    </ProtectedRoute>
  )
}