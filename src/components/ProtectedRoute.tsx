// src/components/ProtectedRoute.tsx
'use client'
import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { RoleName } from '@/lib/types/api'

interface ProtectedRouteProps {
  children: React.ReactNode
  requiredRole?: RoleName | RoleName[]
  fallbackPath?: string
}

export function ProtectedRoute({ 
  children, 
  requiredRole, 
  fallbackPath = '/login' 
}: ProtectedRouteProps) {
  const { user, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading) {
      if (!user) {
        router.push(fallbackPath)
        return
      }

      if (requiredRole) {
        const hasRequiredRole = Array.isArray(requiredRole) 
          ? requiredRole.includes(user.role)
          : user.role === requiredRole

        if (!hasRequiredRole) {
          // Redirect to appropriate dashboard based on user's actual role
          const redirectRoutes = {
            admin: '/admin',
            sales: '/sales',
            pm: '/pm',
            client: '/client'
          }
          router.push(redirectRoutes[user.role] || '/dashboard')
          return
        }
      }
    }
  }, [user, isLoading, requiredRole, router, fallbackPath])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  if (requiredRole) {
    const hasRequiredRole = Array.isArray(requiredRole) 
      ? requiredRole.includes(user.role)
      : user.role === requiredRole

    if (!hasRequiredRole) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Access Denied</h2>
            <p className="text-slate-600">You don't have permission to access this page.</p>
          </div>
        </div>
      )
    }
  }

  return <>{children}</>
}