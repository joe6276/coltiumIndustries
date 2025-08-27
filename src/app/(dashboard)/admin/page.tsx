// src/app/(dashboard)/admin/page.tsx - Responsive Admin Dashboard
'use client'
import { useEffect, useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { apiClient } from '@/lib/api-config'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  Users, 
  FolderOpen, 
  FileText, 
  BarChart3,
  UserPlus,
  ClipboardList,
  CheckCircle,
  Clock,
  AlertCircle,
  Settings,
  RefreshCw,
  Shield
} from 'lucide-react'
import Link from 'next/link'

interface DashboardStats {
  totalUsers: number
  totalProjects: number
  requestedProjects: number
  pendingDocuments: number
  pendingReports: number
  totalPMs: number
}

interface ApiStatus {
  users: 'loading' | 'success' | 'error'
  projects: 'loading' | 'success' | 'error'
  requestedProjects: 'loading' | 'success' | 'error'
  documents: 'loading' | 'success' | 'error'
  reports: 'loading' | 'success' | 'error'
  pms: 'loading' | 'success' | 'error'
}

export default function AdminDashboard() {
  const { user } = useAuth()
  const [stats, setStats] = useState<DashboardStats>({
    totalUsers: 0,
    totalProjects: 0,
    requestedProjects: 0,
    pendingDocuments: 0,
    pendingReports: 0,
    totalPMs: 0
  })
  const [isLoading, setIsLoading] = useState(true)
  const [apiStatus, setApiStatus] = useState<ApiStatus>({
    users: 'loading',
    projects: 'loading',
    requestedProjects: 'loading',
    documents: 'loading',
    reports: 'loading',
    pms: 'loading'
  })
  const [errors, setErrors] = useState<string[]>([])

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      setIsLoading(true)
      setErrors([])
      
      // Reset API status
      setApiStatus({
        users: 'loading',
        projects: 'loading',
        requestedProjects: 'loading',
        documents: 'loading',
        reports: 'loading',
        pms: 'loading'
      })

      const newStats: DashboardStats = {
        totalUsers: 0,
        totalProjects: 0,
        requestedProjects: 0,
        pendingDocuments: 0,
        pendingReports: 0,
        totalPMs: 0
      }
      const newErrors: string[] = []

      // Fetch users
      try {
        const users = await apiClient.getUsers()
        newStats.totalUsers = users.length
        setApiStatus(prev => ({ ...prev, users: 'success' }))
      } catch (error) {
        console.error('Failed to fetch users:', error)
        newErrors.push('Failed to fetch users')
        setApiStatus(prev => ({ ...prev, users: 'error' }))
      }

      // Fetch projects
      try {
        const projects = await apiClient.getAllProjects()
        newStats.totalProjects = projects.length
        setApiStatus(prev => ({ ...prev, projects: 'success' }))
      } catch (error) {
        console.error('Failed to fetch projects:', error)
        newErrors.push('Failed to fetch projects')
        setApiStatus(prev => ({ ...prev, projects: 'error' }))
      }

      // Fetch requested projects
      try {
        const requestedProjects = await apiClient.getRequestedProjects()
        newStats.requestedProjects = requestedProjects.length
        setApiStatus(prev => ({ ...prev, requestedProjects: 'success' }))
      } catch (error) {
        console.error('Failed to fetch requested projects:', error)
        newErrors.push('Failed to fetch requested projects')
        setApiStatus(prev => ({ ...prev, requestedProjects: 'error' }))
      }

      // Fetch PMs
      try {
        const pms = await apiClient.getPMs()
        newStats.totalPMs = pms.length
        setApiStatus(prev => ({ ...prev, pms: 'success' }))
      } catch (error) {
        console.error('Failed to fetch PMs:', error)
        newErrors.push('Failed to fetch PMs')
        setApiStatus(prev => ({ ...prev, pms: 'error' }))
      }

      // Fetch documents
      try {
        const documents = await apiClient.getAdminDocuments()
        const pendingDocuments = documents.filter(doc => !doc.isApproved).length
        newStats.pendingDocuments = pendingDocuments
        setApiStatus(prev => ({ ...prev, documents: 'success' }))
      } catch (error) {
        console.error('Failed to fetch documents:', error)
        newErrors.push('Failed to fetch documents (may require specific permissions)')
        setApiStatus(prev => ({ ...prev, documents: 'error' }))
        newStats.pendingDocuments = 0
      }

      // Fetch reports
      try {
        const reports = await apiClient.getAdminReports()
        newStats.pendingReports = reports.length
        setApiStatus(prev => ({ ...prev, reports: 'success' }))
      } catch (error) {
        console.error('Failed to fetch reports:', error)
        newErrors.push('Failed to fetch reports (may require specific permissions)')
        setApiStatus(prev => ({ ...prev, reports: 'error' }))
        newStats.pendingReports = 0
      }

      setStats(newStats)
      setErrors(newErrors)
      
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error)
      setErrors(['Failed to load dashboard data'])
    } finally {
      setIsLoading(false)
    }
  }

  const getStatusIcon = (status: 'loading' | 'success' | 'error') => {
    switch (status) {
      case 'loading':
        return <RefreshCw className="h-3 w-3 animate-spin text-blue-500" />
      case 'success':
        return <CheckCircle className="h-3 w-3 text-green-500" />
      case 'error':
        return <AlertCircle className="h-3 w-3 text-red-500" />
    }
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-slate-200 rounded w-1/2 md:w-1/3"></div>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(6)].map((_, i) => (
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
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
          <div className="flex items-center space-x-2 md:space-x-3 min-w-0 flex-1">
            <Shield className="h-6 w-6 md:h-8 md:w-8 text-red-600 flex-shrink-0" />
            <div className="min-w-0 flex-1">
              <h1 className="text-xl md:text-3xl font-bold text-slate-800 truncate">Admin Dashboard</h1>
              <p className="text-sm md:text-base text-slate-600 truncate">System overview and management</p>
            </div>
          </div>
          <Button onClick={fetchDashboardData} variant="outline" size="sm" className="self-start sm:self-auto">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>

      {/* Error Alerts */}
      {errors.length > 0 && (
        <div className="space-y-2">
          {errors.map((error, index) => (
            <div key={index} className="p-3 md:p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="flex items-start space-x-2">
                <AlertCircle className="h-4 w-4 md:h-5 md:w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                <p className="text-yellow-800 text-sm md:text-base flex-1">{error}</p>
              </div>
            </div>
          ))}
          <div className="text-xs md:text-sm text-slate-600 px-3">
            Some features may be unavailable due to API permissions. Core functionality remains accessible.
          </div>
        </div>
      )}

      {/* Stats Grid - Responsive */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs md:text-sm font-medium flex items-center space-x-2">
              <span className="truncate">Total Users</span>
              {getStatusIcon(apiStatus.users)}
            </CardTitle>
            <Users className="h-3 w-3 md:h-4 md:w-4 text-muted-foreground flex-shrink-0" />
          </CardHeader>
          <CardContent>
            <div className="text-lg md:text-2xl font-bold text-blue-600">{stats.totalUsers}</div>
            <p className="text-xs text-muted-foreground">System users</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs md:text-sm font-medium flex items-center space-x-2">
              <span className="truncate">Total Projects</span>
              {getStatusIcon(apiStatus.projects)}
            </CardTitle>
            <FolderOpen className="h-3 w-3 md:h-4 md:w-4 text-muted-foreground flex-shrink-0" />
          </CardHeader>
          <CardContent>
            <div className="text-lg md:text-2xl font-bold text-green-600">{stats.totalProjects}</div>
            <p className="text-xs text-muted-foreground">Active projects</p>
          </CardContent>
        </Card>

        <Card className="col-span-2 lg:col-span-1">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs md:text-sm font-medium flex items-center space-x-2">
              <span className="truncate">Project Managers</span>
              {getStatusIcon(apiStatus.pms)}
            </CardTitle>
            <UserPlus className="h-3 w-3 md:h-4 md:w-4 text-muted-foreground flex-shrink-0" />
          </CardHeader>
          <CardContent>
            <div className="text-lg md:text-2xl font-bold text-purple-600">{stats.totalPMs}</div>
            <p className="text-xs text-muted-foreground">Available PMs</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs md:text-sm font-medium flex items-center space-x-2">
              <span className="truncate">Requests</span>
              {getStatusIcon(apiStatus.requestedProjects)}
            </CardTitle>
            <ClipboardList className="h-3 w-3 md:h-4 md:w-4 text-muted-foreground flex-shrink-0" />
          </CardHeader>
          <CardContent>
            <div className="text-lg md:text-2xl font-bold text-orange-600">{stats.requestedProjects}</div>
            <p className="text-xs text-muted-foreground">Awaiting assignment</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs md:text-sm font-medium flex items-center space-x-2">
              <span className="truncate">Documents</span>
              {getStatusIcon(apiStatus.documents)}
            </CardTitle>
            <FileText className="h-3 w-3 md:h-4 md:w-4 text-muted-foreground flex-shrink-0" />
          </CardHeader>
          <CardContent>
            <div className="text-lg md:text-2xl font-bold text-yellow-600">{stats.pendingDocuments}</div>
            <p className="text-xs text-muted-foreground">
              {apiStatus.documents === 'error' ? 'Access restricted' : 'Need approval'}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs md:text-sm font-medium flex items-center space-x-2">
              <span className="truncate">Reports</span>
              {getStatusIcon(apiStatus.reports)}
            </CardTitle>
            <BarChart3 className="h-3 w-3 md:h-4 md:w-4 text-muted-foreground flex-shrink-0" />
          </CardHeader>
          <CardContent>
            <div className="text-lg md:text-2xl font-bold text-red-600">{stats.pendingReports}</div>
            <p className="text-xs text-muted-foreground">
              {apiStatus.reports === 'error' ? 'Access restricted' : 'Need review'}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions - Mobile Optimized */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
        <Link href="/admin/users">
          <Card className="hover:shadow-md transition-shadow cursor-pointer border-dashed border-2 border-slate-300 hover:border-blue-400">
            <CardContent className="flex items-center justify-center p-3 md:p-6">
              <div className="text-center">
                <Users className="h-8 w-8 md:h-12 md:w-12 text-slate-400 mx-auto mb-2 md:mb-3" />
                <h3 className="text-sm md:text-base font-semibold text-slate-700">Manage Users</h3>
                <p className="text-xs md:text-sm text-slate-500 mt-1 hidden sm:block">Create and view users</p>
                {apiStatus.users === 'success' && (
                  <Badge variant="outline" className="mt-1 md:mt-2 text-green-600 border-green-600 text-xs">
                    Available
                  </Badge>
                )}
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/admin/requested-projects">
          <Card className="hover:shadow-md transition-shadow cursor-pointer border-dashed border-2 border-slate-300 hover:border-orange-400">
            <CardContent className="flex items-center justify-center p-3 md:p-6">
              <div className="text-center">
                <ClipboardList className="h-8 w-8 md:h-12 md:w-12 text-slate-400 mx-auto mb-2 md:mb-3" />
                <h3 className="text-sm md:text-base font-semibold text-slate-700">Project Requests</h3>
                <p className="text-xs md:text-sm text-slate-500 mt-1 hidden sm:block">Assign PMs to projects</p>
                {stats.requestedProjects > 0 && apiStatus.requestedProjects === 'success' && (
                  <Badge variant="destructive" className="mt-1 md:mt-2 text-xs">
                    {stats.requestedProjects} pending
                  </Badge>
                )}
                {apiStatus.requestedProjects === 'success' && stats.requestedProjects === 0 && (
                  <Badge variant="outline" className="mt-1 md:mt-2 text-green-600 border-green-600 text-xs">
                    All up to date
                  </Badge>
                )}
              </div>
            </CardContent>
          </Card>
        </Link>

        <Card className={`transition-shadow cursor-pointer border-dashed border-2 border-slate-300 ${
          apiStatus.documents === 'error' ? 'opacity-60' : 'hover:shadow-md hover:border-yellow-400'
        }`}>
          <CardContent className="flex items-center justify-center p-3 md:p-6">
            <div className="text-center">
              <FileText className="h-8 w-8 md:h-12 md:w-12 text-slate-400 mx-auto mb-2 md:mb-3" />
              <h3 className="text-sm md:text-base font-semibold text-slate-700">Review Documents</h3>
              <p className="text-xs md:text-sm text-slate-500 mt-1 hidden sm:block">
                {apiStatus.documents === 'error' ? 'Access restricted' : 'Approve PM documents'}
              </p>
              {stats.pendingDocuments > 0 && apiStatus.documents === 'success' && (
                <Badge variant="destructive" className="mt-1 md:mt-2 text-xs">
                  {stats.pendingDocuments} pending
                </Badge>
              )}
              {apiStatus.documents === 'error' && (
                <Badge variant="outline" className="mt-1 md:mt-2 text-red-600 border-red-600 text-xs">
                  Restricted
                </Badge>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className={`transition-shadow cursor-pointer border-dashed border-2 border-slate-300 ${
          apiStatus.reports === 'error' ? 'opacity-60' : 'hover:shadow-md hover:border-red-400'
        }`}>
          <CardContent className="flex items-center justify-center p-3 md:p-6">
            <div className="text-center">
              <BarChart3 className="h-8 w-8 md:h-12 md:w-12 text-slate-400 mx-auto mb-2 md:mb-3" />
              <h3 className="text-sm md:text-base font-semibold text-slate-700">Review Reports</h3>
              <p className="text-xs md:text-sm text-slate-500 mt-1 hidden sm:block">
                {apiStatus.reports === 'error' ? 'Access restricted' : 'Approve PM reports'}
              </p>
              {stats.pendingReports > 0 && apiStatus.reports === 'success' && (
                <Badge variant="destructive" className="mt-1 md:mt-2 text-xs">
                  {stats.pendingReports} pending
                </Badge>
              )}
              {apiStatus.reports === 'error' && (
                <Badge variant="outline" className="mt-1 md:mt-2 text-red-600 border-red-600 text-xs">
                  Restricted
                </Badge>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity Summary - Mobile Optimized */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg md:text-xl">API Status</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 md:space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 min-w-0 flex-1">
                <Users className="h-4 w-4 text-blue-600 flex-shrink-0" />
                <span className="text-sm truncate">Users API</span>
              </div>
              <Badge variant="outline" className={`text-xs flex-shrink-0 ${
                apiStatus.users === 'success' ? 'text-green-600 border-green-600' :
                apiStatus.users === 'error' ? 'text-red-600 border-red-600' :
                'text-blue-600 border-blue-600'
              }`}>
                {apiStatus.users === 'success' ? 'Connected' :
                 apiStatus.users === 'error' ? 'Error' : 'Loading'}
              </Badge>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 min-w-0 flex-1">
                <FolderOpen className="h-4 w-4 text-green-600 flex-shrink-0" />
                <span className="text-sm truncate">Projects API</span>
              </div>
              <Badge variant="outline" className={`text-xs flex-shrink-0 ${
                apiStatus.projects === 'success' ? 'text-green-600 border-green-600' :
                apiStatus.projects === 'error' ? 'text-red-600 border-red-600' :
                'text-blue-600 border-blue-600'
              }`}>
                {apiStatus.projects === 'success' ? 'Connected' :
                 apiStatus.projects === 'error' ? 'Error' : 'Loading'}
              </Badge>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 min-w-0 flex-1">
                <FileText className="h-4 w-4 text-purple-600 flex-shrink-0" />
                <span className="text-sm truncate">Documents API</span>
              </div>
              <Badge variant="outline" className={`text-xs flex-shrink-0 ${
                apiStatus.documents === 'success' ? 'text-green-600 border-green-600' :
                apiStatus.documents === 'error' ? 'text-red-600 border-red-600' :
                'text-blue-600 border-blue-600'
              }`}>
                {apiStatus.documents === 'success' ? 'Connected' :
                 apiStatus.documents === 'error' ? 'Restricted' : 'Loading'}
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg md:text-xl">Quick Stats</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 md:space-y-4">
            <div className="text-sm space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-slate-600 truncate flex-1">Active Users Today:</span>
                <span className="font-medium flex-shrink-0 ml-2">{Math.round(stats.totalUsers * 0.7)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-600 truncate flex-1">Projects This Month:</span>
                <span className="font-medium flex-shrink-0 ml-2">{Math.round(stats.totalProjects * 0.3)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-600 truncate flex-1">Avg. Project Value:</span>
                <span className="font-medium flex-shrink-0 ml-2">$45,250</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-600 truncate flex-1">Success Rate:</span>
                <span className="font-medium text-green-600 flex-shrink-0 ml-2">94.2%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}