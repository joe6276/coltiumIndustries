//src/app/(dashboard)/client/layout.tsx
import { ProtectedRoute } from '@/components/ProtectedRoute'
import ResponsiveClientSidebar from '@/components/client/ResponsiveClientSidebar'

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ProtectedRoute requiredRole="client">
      <div className="flex h-screen flex-col md:flex-row md:overflow-hidden bg-slate-100">
        <div className="w-full flex-none md:w-64">
          <ResponsiveClientSidebar />
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