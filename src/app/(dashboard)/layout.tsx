import { AuthProvider } from '@/contexts/AuthContext'
import { Toaster } from '@/components/ui/toaster'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AuthProvider>
      <div className="h-screen bg-slate-100">
        {children}
      </div>
      <Toaster />
    </AuthProvider>
  )
}