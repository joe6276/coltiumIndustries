// src/app/(dashboard)/sales/layout.tsx - Updated with proper sidebar
import { ProtectedRoute } from '@/components/ProtectedRoute'
import SalesSidebar from '@/components/sales/SalesSidebar'

export default function SalesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ProtectedRoute requiredRole="sales">
      <div className="flex h-screen bg-slate-100">
        <SalesSidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <main className="flex-1 overflow-x-hidden overflow-y-auto bg-slate-50">
            {children}
          </main>
        </div>
      </div>
    </ProtectedRoute>
  )
}
