// src/app/(auth)/layout.tsx - AuthProvider only for auth pages
import { AuthProvider } from '@/contexts/AuthContext'
import { Toaster } from '@/components/ui/toaster'

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-slate-50">
        {children}
      </div>
      <Toaster />
    </AuthProvider>
  )
}