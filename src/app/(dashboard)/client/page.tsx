// src/app/(dashboard)/client/page.tsx 
'use client'
import { useEffect, useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { apiClient } from '@/lib/api-config'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { 
  FolderOpen, 
  CreditCard, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  DollarSign,
  Calendar,
  FileText,
  MessageCircle,
  UserCircle
} from 'lucide-react'
import Link from 'next/link'
import { ClientProject } from '@/lib/types/api'

export default function ClientDashboard() {
  const { user } = useAuth()
  const [projects, setProjects] = useState<ClientProject[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (user?.email) {
      fetchProjects()
    }
  }, [user])

  const fetchProjects = async () => {
    try {
      setIsLoading(true)
      const projectsData = await apiClient.getClientProjects(user!.email)
      setProjects(projectsData)
      setError(null)
    } catch (error) {
      console.error('Failed to fetch projects:', error)
      setError('Failed to load your projects')
    } finally {
      setIsLoading(false)
    }
  }

  // Safe function to parse pricing from any format
  const safeParsePricing = (pricing: any): number => {
    if (!pricing) return 0
    
    if (typeof pricing === 'number') {
      return pricing
    }
    
    if (typeof pricing === 'string') {
      // Remove currency symbols, commas, and other non-numeric characters except decimal points and minus signs
      const cleanedPrice = pricing.replace(/[^\d.-]/g, '')
      const parsed = parseFloat(cleanedPrice)
      return isNaN(parsed) ? 0 : parsed
    }
    
    return 0
  }

  const getTotalProjectValue = () => {
    return projects.reduce((total, project) => {
      const price = safeParsePricing(project.pricing)
      return total + price
    }, 0)
  }

  const getProjectStats = () => {
    const total = projects.length
    const completed = projects.filter(p => 
      p.title.toLowerCase().includes('completed') || 
      p.description.toLowerCase().includes('completed')
    ).length
    const inProgress = total - completed
    
    return { total, completed, inProgress }
  }

  const formatPricing = (pricing: any): string => {
    if (!pricing) return 'Price TBD'
    
    if (typeof pricing === 'string') {
      return pricing
    }
    
    if (typeof pricing === 'number') {
      return `$${pricing.toLocaleString()}`
    }
    
    return 'Price TBD'
  }

  const stats = getProjectStats()

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-slate-200 rounded w-1/2 md:w-1/3"></div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-24 md:h-32 bg-slate-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header - Mobile Optimized */}
      <div className="space-y-2">
        <div className="flex items-center space-x-2 md:space-x-3">
          <UserCircle className="h-6 w-6 md:h-8 md:w-8 text-blue-600 flex-shrink-0" />
          <div className="min-w-0 flex-1">
            <h1 className="text-xl md:text-3xl font-bold text-slate-800 truncate">Client Dashboard</h1>
            <p className="text-sm md:text-base text-slate-600 truncate">Welcome back, {user?.email?.split('@')[0]}</p>
          </div>
        </div>
      </div>

      {/* Error Alert */}
      {error && (
        <div className="p-3 md:p-4 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex items-center space-x-2">
            <AlertCircle className="h-4 w-4 md:h-5 md:w-5 text-red-600 flex-shrink-0" />
            <p className="text-sm md:text-base text-red-800 flex-1">{error}</p>
          </div>
          <button 
            onClick={fetchProjects}
            className="mt-2 text-xs md:text-sm text-red-600 hover:text-red-800 underline"
          >
            Try Again
          </button>
        </div>
      )}

      {/* Stats Grid - Responsive */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs md:text-sm font-medium">Total Projects</CardTitle>
            <FolderOpen className="h-3 w-3 md:h-4 md:w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-lg md:text-2xl font-bold text-blue-600">{stats.total}</div>
            <p className="text-xs text-muted-foreground">Active projects</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs md:text-sm font-medium">In Progress</CardTitle>
            <Clock className="h-3 w-3 md:h-4 md:w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-lg md:text-2xl font-bold text-orange-600">{stats.inProgress}</div>
            <p className="text-xs text-muted-foreground">Ongoing work</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs md:text-sm font-medium">Completed</CardTitle>
            <CheckCircle className="h-3 w-3 md:h-4 md:w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-lg md:text-2xl font-bold text-green-600">{stats.completed}</div>
            <p className="text-xs text-muted-foreground">Finished projects</p>
          </CardContent>
        </Card>
        
        <Card className="col-span-2 lg:col-span-1">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs md:text-sm font-medium">Total Value</CardTitle>
            <DollarSign className="h-3 w-3 md:h-4 md:w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-lg md:text-2xl font-bold text-purple-600">
              ${getTotalProjectValue().toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">Project value</p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions - Mobile Optimized */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        <Link href="/client/projects">
          <Card className="hover:shadow-md transition-shadow cursor-pointer border-dashed border-2 border-slate-300 hover:border-blue-400">
            <CardContent className="flex items-center justify-center p-4 md:p-6">
              <div className="text-center">
                <FolderOpen className="h-8 w-8 md:h-12 md:w-12 text-slate-400 mx-auto mb-2 md:mb-3" />
                <h3 className="text-sm md:text-base font-semibold text-slate-700">View Projects</h3>
                <p className="text-xs md:text-sm text-slate-500 mt-1">Check project progress</p>
              </div>
            </CardContent>
          </Card>
        </Link>
        
        <Link href="/client/payments">
          <Card className="hover:shadow-md transition-shadow cursor-pointer border-dashed border-2 border-slate-300 hover:border-green-400">
            <CardContent className="flex items-center justify-center p-4 md:p-6">
              <div className="text-center">
                <CreditCard className="h-8 w-8 md:h-12 md:w-12 text-slate-400 mx-auto mb-2 md:mb-3" />
                <h3 className="text-sm md:text-base font-semibold text-slate-700">Make Payment</h3>
                <p className="text-xs md:text-sm text-slate-500 mt-1">Pay via Stripe or M-Pesa</p>
              </div>
            </CardContent>
          </Card>
        </Link>
        
        <Link href="/client/support">
          <Card className="hover:shadow-md transition-shadow cursor-pointer border-dashed border-2 border-slate-300 hover:border-purple-400">
            <CardContent className="flex items-center justify-center p-4 md:p-6">
              <div className="text-center">
                <MessageCircle className="h-8 w-8 md:h-12 md:w-12 text-slate-400 mx-auto mb-2 md:mb-3" />
                <h3 className="text-sm md:text-base font-semibold text-slate-700">Get Support</h3>
                <p className="text-xs md:text-sm text-slate-500 mt-1">Contact our team</p>
              </div>
            </CardContent>
          </Card>
        </Link>
      </div>

      {/* Recent Projects - Mobile Optimized */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg md:text-xl">Your Projects</CardTitle>
        </CardHeader>
        <CardContent>
          {projects.length > 0 ? (
            <div className="space-y-3 md:space-y-4">
              {projects.slice(0, 3).map((project) => (
                <div key={project.id} className="p-3 md:p-4 bg-slate-50 rounded-lg border">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-3">
                    <div className="flex-1 mb-2 md:mb-0">
                      <h4 className="text-sm md:text-base font-semibold text-slate-800">{project.title}</h4>
                      <p className="text-xs md:text-sm text-slate-600 mt-1">{project.description}</p>
                    </div>
                    <Badge variant="outline" className="self-start md:ml-4">
                      Active
                    </Badge>
                  </div>
                  
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-2 md:space-y-0 text-xs md:text-sm">
                    <div className="flex flex-wrap items-center gap-3 md:gap-4">
                      <div className="flex items-center space-x-1">
                        <DollarSign className="h-3 w-3 md:h-4 md:w-4 text-green-600" />
                        <span className="text-green-600 font-medium">
                          {formatPricing(project.pricing)}
                        </span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-3 w-3 md:h-4 md:w-4 text-blue-600" />
                        <span className="text-blue-600">{project.timeline || 'Timeline TBD'}</span>
                      </div>
                      {project.documents && project.documents.length > 0 && (
                        <div className="flex items-center space-x-1">
                          <FileText className="h-3 w-3 md:h-4 md:w-4 text-purple-600" />
                          <span className="text-purple-600">{project.documents.length} docs</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              
              {projects.length > 3 && (
                <div className="text-center pt-4">
                  <Link 
                    href="/client/projects"
                    className="text-blue-600 hover:text-blue-800 text-xs md:text-sm font-medium"
                  >
                    View All {projects.length} Projects →
                  </Link>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-6 md:py-8">
              <FolderOpen className="h-8 w-8 md:h-12 md:w-12 text-slate-300 mx-auto mb-2 md:mb-3" />
              <h3 className="text-base md:text-lg font-medium text-slate-700 mb-2">No projects yet</h3>
              <p className="text-sm md:text-base text-slate-500">Your projects will appear here once they are created.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}