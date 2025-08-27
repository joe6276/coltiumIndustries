// src/app/(dashboard)/sales/page.tsx - Fixed version with proper error handling
'use client'
import { useEffect, useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { apiClient } from '@/lib/api-config'
import { SalesClient, SalesProjectWithClient } from '@/lib/types/api'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Users, FolderOpen, DollarSign, TrendingUp, Calendar, Activity } from 'lucide-react'
import Link from 'next/link'

export default function SalesDashboard() {
  const { user } = useAuth()
  const [clients, setClients] = useState<SalesClient[]>([])
  const [projects, setProjects] = useState<SalesProjectWithClient[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      setIsLoading(true)
      const [clientsData, projectsData] = await Promise.all([
        apiClient.getSalesClients(),
        apiClient.getSalesProjects()
      ])
      
      setClients(clientsData)
      setProjects(projectsData)
      setError(null)
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error)
      setError('Failed to load dashboard data')
    } finally {
      setIsLoading(false)
    }
  }

  const getTotalProjects = () => {
    return projects.reduce((total, client) => total + (client.project?.length || 0), 0)
  }

  const getTotalRevenue = () => {
    let total = 0
    projects.forEach(client => {
      if (client.project && Array.isArray(client.project)) {
        client.project.forEach(project => {
          // Safely handle pricing - check if it's a string first
          if (project.pricing && typeof project.pricing === 'string') {
            // Parse pricing string (remove currency symbols, commas)
            const price = parseFloat(project.pricing.replace(/[^\d.-]/g, '')) || 0
            total += price
          } else if (project.pricing && typeof project.pricing === 'number') {
            // Handle case where pricing is already a number
            total += project.pricing
          }
          // If pricing is null, undefined, or other type, skip it (adds 0)
        })
      }
    })
    return total
  }

  const getConversionRate = () => {
    if (clients.length === 0) return 0
    const totalProjects = getTotalProjects()
    return Math.round((totalProjects / clients.length) * 100)
  }

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-4">
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
        <div className="flex items-center space-x-3">
          <TrendingUp className="h-8 w-8 text-green-600" />
          <div>
            <h1 className="text-3xl font-bold text-slate-800">Sales Dashboard</h1>
            <p className="text-slate-600 mt-1">Welcome back, {user?.email}</p>
          </div>
        </div>
      </div>

      {/* Error Alert */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-800">{error}</p>
          <button 
            onClick={fetchDashboardData}
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
            <CardTitle className="text-sm font-medium">Total Clients</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{clients.length}</div>
            <p className="text-xs text-muted-foreground">Active clients</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Projects</CardTitle>
            <FolderOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{getTotalProjects()}</div>
            <p className="text-xs text-muted-foreground">Active projects</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">
              ${getTotalRevenue().toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">From all projects</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">
              {getConversionRate()}%
            </div>
            <p className="text-xs text-muted-foreground">Projects per client</p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Link href="/sales/add-client">
          <Card className="hover:shadow-md transition-shadow cursor-pointer border-dashed border-2 border-slate-300 hover:border-blue-400">
            <CardContent className="flex items-center justify-center p-6">
              <div className="text-center">
                <Users className="h-12 w-12 text-slate-400 mx-auto mb-3" />
                <h3 className="font-semibold text-slate-700">Add New Client</h3>
                <p className="text-sm text-slate-500 mt-1">Create a new client account</p>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/sales/create-project">
          <Card className="hover:shadow-md transition-shadow cursor-pointer border-dashed border-2 border-slate-300 hover:border-green-400">
            <CardContent className="flex items-center justify-center p-6">
              <div className="text-center">
                <FolderOpen className="h-12 w-12 text-slate-400 mx-auto mb-3" />
                <h3 className="font-semibold text-slate-700">Create Project</h3>
                <p className="text-sm text-slate-500 mt-1">Start a new project</p>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/sales/projects">
          <Card className="hover:shadow-md transition-shadow cursor-pointer border-dashed border-2 border-slate-300 hover:border-purple-400">
            <CardContent className="flex items-center justify-center p-6">
              <div className="text-center">
                <Calendar className="h-12 w-12 text-slate-400 mx-auto mb-3" />
                <h3 className="font-semibold text-slate-700">View All Projects</h3>
                <p className="text-sm text-slate-500 mt-1">Manage existing projects</p>
              </div>
            </CardContent>
          </Card>
        </Link>
      </div>

      {/* Recent Projects */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Projects</CardTitle>
        </CardHeader>
        <CardContent>
          {projects.length > 0 ? (
            <div className="space-y-4">
              {projects.slice(0, 3).map((clientData, index) => (
                <div key={index}>
                  <h4 className="font-semibold text-slate-800 mb-2">
                    {clientData.clientName} - {clientData.company}
                  </h4>
                  {clientData.project && Array.isArray(clientData.project) && clientData.project.slice(0, 2).map((project) => (
                    <div key={project.id} className="ml-4 p-3 bg-slate-50 rounded-lg mb-2">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h5 className="font-medium text-slate-700">{project.title}</h5>
                          <p className="text-sm text-slate-500 mt-1">{project.description}</p>
                          <div className="flex items-center space-x-4 mt-2">
                            <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                              {project.pricing || 'Price TBD'}
                            </span>
                            <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                              {project.timeline || 'Timeline TBD'}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
              <div className="text-center pt-4">
                <Link 
                  href="/sales/projects"
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                >
                  View All Projects →
                </Link>
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <FolderOpen className="h-12 w-12 text-slate-300 mx-auto mb-3" />
              <p className="text-slate-500">No projects found</p>
              <Link href="/sales/create-project" className="text-blue-600 hover:text-blue-800 text-sm mt-2 inline-block">
                Create your first project
              </Link>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
