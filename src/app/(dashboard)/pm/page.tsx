// src/app/(dashboard)/pm/page.tsx - Fixed PM Dashboard with null handling
'use client'
import { useEffect, useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { apiClient } from '@/lib/api-config'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { 
  FolderOpen, 
  FileText, 
  BarChart3,
  Upload,
  PlusCircle,
  Clock,
  DollarSign,
  User,
  CheckCircle
} from 'lucide-react'
import Link from 'next/link'

interface PMProject {
  id: number
  title: string
  client: {
    id: number
    clientName: string
    company: string
    email: string
    phone: string
    projects: string[]
  } | null // Make client nullable to match API response
  clientId: number
  description: string
  pricing: number
  timeline: string
  status: string
  paidPercentage: number
  percentage: number
  pmId: number
  documents: Array<{
    id: number
    documentUrl: string
  }>
}

interface ClientInfo {
  id: number
  email: string
}

export default function PMDashboard() {
  const { user } = useAuth()
  const [projects, setProjects] = useState<PMProject[]>([])
  const [clients, setClients] = useState<ClientInfo[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (user?.id) {
      fetchData()
    }
  }, [user])

  const fetchData = async () => {
    try {
      setIsLoading(true)
      const [projectsData, clientsData] = await Promise.all([
        apiClient.getPMProjects(user!.id),
        apiClient.getSalesClients() // Fetch clients to get client info
      ])
      setProjects(projectsData)
      setClients(clientsData)
      setError(null)
    } catch (error) {
      console.error('Failed to fetch projects:', error)
      setError('Failed to load your projects')
    } finally {
      setIsLoading(false)
    }
  }

  const getClientInfo = (project: PMProject) => {
    // If project has client object, use it
    if (project.client) {
      return project.client
    }
    
    // Otherwise, try to find client in the clients list
    const clientFromList = clients.find(c => c.id === project.clientId)
    
    // Return fallback client info
    return {
      id: project.clientId,
      clientName: clientFromList?.email.split('@')[0] || `Client-${project.clientId}`,
      company: 'Unknown Company',
      email: clientFromList?.email || `client-${project.clientId}@unknown.com`,
      phone: 'N/A',
      projects: []
    }
  }

  const getProjectStats = () => {
    const total = projects.length
    const completed = projects.filter(p => p.percentage === 100).length
    const inProgress = projects.filter(p => p.percentage > 0 && p.percentage < 100).length
    const notStarted = projects.filter(p => p.percentage === 0).length
    const totalValue = projects.reduce((sum, p) => sum + p.pricing, 0)
    
    return { total, completed, inProgress, notStarted, totalValue }
  }

  const stats = getProjectStats()

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-slate-200 rounded w-1/3"></div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-32 bg-slate-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <BarChart3 className="h-8 w-8 text-purple-600" />
            <div>
              <h1 className="text-3xl font-bold text-slate-800">Project Manager Dashboard</h1>
              <p className="text-slate-600 mt-1">Welcome back, {user?.email}</p>
            </div>
          </div>
          <div className="flex space-x-3">
            <Link href="/pm/upload-document">
              <Button variant="outline">
                <Upload className="mr-2 h-4 w-4" />
                Upload Document
              </Button>
            </Link>
            <Link href="/pm/create-report">
              <Button>
                <PlusCircle className="mr-2 h-4 w-4" />
                Create Report
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Error Alert */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-800">{error}</p>
          <button 
            onClick={fetchData}
            className="mt-2 text-sm text-red-600 hover:text-red-800 underline"
          >
            Try Again
          </button>
        </div>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Projects</CardTitle>
            <FolderOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{stats.total}</div>
            <p className="text-xs text-muted-foreground">Assigned to you</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">In Progress</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{stats.inProgress}</div>
            <p className="text-xs text-muted-foreground">Active work</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.completed}</div>
            <p className="text-xs text-muted-foreground">Finished projects</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Value</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">
              ${stats.totalValue.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">Portfolio value</p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Link href="/pm/projects">
          <Card className="hover:shadow-md transition-shadow cursor-pointer border-dashed border-2 border-slate-300 hover:border-blue-400">
            <CardContent className="flex items-center justify-center p-6">
              <div className="text-center">
                <FolderOpen className="h-12 w-12 text-slate-400 mx-auto mb-3" />
                <h3 className="font-semibold text-slate-700">View Projects</h3>
                <p className="text-sm text-slate-500 mt-1">Manage your assignments</p>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/pm/upload-document">
          <Card className="hover:shadow-md transition-shadow cursor-pointer border-dashed border-2 border-slate-300 hover:border-green-400">
            <CardContent className="flex items-center justify-center p-6">
              <div className="text-center">
                <Upload className="h-12 w-12 text-slate-400 mx-auto mb-3" />
                <h3 className="font-semibold text-slate-700">Upload Document</h3>
                <p className="text-sm text-slate-500 mt-1">Submit project files</p>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/pm/create-report">
          <Card className="hover:shadow-md transition-shadow cursor-pointer border-dashed border-2 border-slate-300 hover:border-purple-400">
            <CardContent className="flex items-center justify-center p-6">
              <div className="text-center">
                <FileText className="h-12 w-12 text-slate-400 mx-auto mb-3" />
                <h3 className="font-semibold text-slate-700">Create Report</h3>
                <p className="text-sm text-slate-500 mt-1">Submit progress report</p>
              </div>
            </CardContent>
          </Card>
        </Link>
      </div>

      {/* Recent Projects */}
      <Card>
        <CardHeader>
          <CardTitle>Your Projects</CardTitle>
        </CardHeader>
        <CardContent>
          {projects.length > 0 ? (
            <div className="space-y-4">
              {projects.slice(0, 5).map((project) => {
                const clientInfo = getClientInfo(project)
                
                return (
                  <div key={project.id} className="p-4 bg-slate-50 rounded-lg border">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex-1">
                        <h4 className="font-semibold text-slate-800">{project.title}</h4>
                        <p className="text-sm text-slate-600 mt-1">{project.description}</p>
                        <div className="flex items-center space-x-4 mt-2 text-sm text-slate-500">
                          <div className="flex items-center space-x-1">
                            <User className="h-4 w-4" />
                            <span>{clientInfo.clientName}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <DollarSign className="h-4 w-4" />
                            <span>${project.pricing.toLocaleString()}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Clock className="h-4 w-4" />
                            <span>{project.timeline}</span>
                          </div>
                        </div>
                        {/* Additional client info if available */}
                        {clientInfo.company !== 'Unknown Company' && (
                          <div className="text-xs text-slate-400 mt-1">
                            {clientInfo.company} • {clientInfo.email}
                          </div>
                        )}
                      </div>
                      <Badge variant={project.percentage === 100 ? "default" : "outline"}>
                        {project.percentage === 100 ? 'Completed' : 'In Progress'}
                      </Badge>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span>{project.percentage}%</span>
                      </div>
                      <Progress value={project.percentage} className="h-2" />
                    </div>
                  </div>
                )
              })}
              
              {projects.length > 5 && (
                <div className="text-center pt-4">
                  <Link 
                    href="/pm/projects"
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                  >
                    View All {projects.length} Projects →
                  </Link>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-8">
              <FolderOpen className="h-12 w-12 text-slate-300 mx-auto mb-3" />
              <h3 className="text-lg font-medium text-slate-700 mb-2">No projects assigned</h3>
              <p className="text-slate-500">Projects will appear here once assigned by admin.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
