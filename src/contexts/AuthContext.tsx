// src/contexts/AuthContext.tsx - Updated with clientId support
'use client'
import { createContext, useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { apiClient } from '@/lib/api-config'
import { LoginRequest, LoginResponse, ApiRoleToInternal, RoleName } from '@/lib/types/api'
import { toast } from '@/hooks/use-toast'

export interface AuthUser {
  id: number
  email: string
  role: RoleName
  token: string
  clientId?: number // New field for client-specific operations
}

interface AuthContextType {
  user: AuthUser | null
  isLoading: boolean
  login: (credentials: LoginRequest) => Promise<void>
  logout: () => void
  hasRole: (role: RoleName | RoleName[]) => boolean
  isAuthenticated: boolean
  getClientId: () => number | null // Helper function to get the appropriate clientId
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    checkAuthStatus()
  }, [])

  const checkAuthStatus = async () => {
    try {
      const token = localStorage.getItem('auth_token')
      const userData = localStorage.getItem('user_data')
      
      if (token && userData) {
        const parsedUser = JSON.parse(userData)
        setUser(parsedUser)
        apiClient.setToken(token)
      }
    } catch (error) {
      console.error('Auth check failed:', error)
      logout()
    } finally {
      setIsLoading(false)
    }
  }

  const login = async (credentials: LoginRequest) => {
    try {
      setIsLoading(true)
      const response: LoginResponse = await apiClient.login(credentials)
      
      console.log('Login response:', response) // Debug log
      
      // Map API string role to internal role name
      const roleName = ApiRoleToInternal[response.role as keyof typeof ApiRoleToInternal]
      
      if (!roleName) {
        throw new Error(`Unknown role: ${response.role}`)
      }
      
      const authUser: AuthUser = {
        id: response.id,
        email: response.email,
        role: roleName,
        token: response.token,
        clientId: response.clientId // Store the clientId from API response
      }

      console.log('Created auth user:', authUser) // Debug log
      
      // Store auth data
      localStorage.setItem('auth_token', response.token)
      localStorage.setItem('user_data', JSON.stringify(authUser))
      
      // Set API client token
      apiClient.setToken(response.token)
      setUser(authUser)

      // Redirect based on role
      const dashboardRoutes = {
        admin: '/admin',
        sales: '/sales', 
        pm: '/pm',
        client: '/client'
      }
      const redirectPath = dashboardRoutes[roleName]
      
      toast({
        title: "Login Successful",
        description: `Welcome back! Redirecting to ${roleName} dashboard...`,
      })

      // Add a small delay to show the toast
      setTimeout(() => {
        router.push(redirectPath)
      }, 1000)
      
    } catch (error) {
      console.error('Login failed:', error)
      toast({
        title: "Login Failed",
        description: error instanceof Error ? error.message : "Invalid credentials",
        variant: "destructive",
      })
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    localStorage.removeItem('auth_token')
    localStorage.removeItem('user_data')
    apiClient.clearToken()
    setUser(null)
    router.push('/login')
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    })
  }

  const hasRole = (role: RoleName | RoleName[]) => {
    if (!user) return false
    if (Array.isArray(role)) {
      return role.includes(user.role)
    }
    return user.role === role
  }

  // Helper function to get the appropriate client ID for API calls
  const getClientId = (): number | null => {
    if (!user) return null
    
    // For clients, use the clientId field from the login response
    // For other roles, use the id field as fallback
    return user.clientId || user.id
  }

  const value = {
    user,
    isLoading,
    login,
    logout,
    hasRole,
    isAuthenticated: !!user,
    getClientId
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}