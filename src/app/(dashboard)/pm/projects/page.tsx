// src/app/(dashboard)/pm/projects/page.tsx - PM Projects Table
'use client'
import { useEffect, useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { apiClient } from '@/lib/api-config'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { 
  FolderOpen, 
  User, 
  DollarSign, 
  Calendar,
  FileText,
  Upload,
  BarChart3,
  ExternalLink,
  MoreHorizontal,
  Search,
  RefreshCw,
  Eye,
  Phone,
  Mail,
  CheckCircle,
  Clock,
  Play,
  AlertCircle
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
  } | null
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

export default function PMProjectsPage() {
  const { user } = useAuth()
  const [projects, setProjects] = useState<PMProject[]>([])
  const [clients, setClients] = useState<ClientInfo[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState('')

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
        apiClient.getSalesClients()
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
    if (project.client) {
      return project.client
    }
    
    const clientFromList = clients.find(c => c.id === project.clientId)
    
    return {
      id: project.clientId,
      clientName: clientFromList?.email.split('@')[0] || `Client-${project.clientId}`,
      company: 'Unknown Company',
      email: clientFromList?.email || `client-${project.clientId}@unknown.com`,
      phone: 'N/A',
      projects: []
    }
  }

  const getProjectStatus = (project: PMProject) => {
    if (project.percentage === 100) {
      return { status: 'Completed', color: 'bg-green-100 text-green-800 border-green-200', icon: CheckCircle }
    } else if (project.percentage > 0) {
      return { status: 'In Progress', color: 'bg-yellow-100 text-yellow-800 border-yellow-200', icon: Clock }
    } else {
      return { status: 'Not Started', color: 'bg-slate-100 text-slate-800 border-slate-200', icon: Play }
    }
  }

  // Calculate upfront payment amount for a project
  const calculateUpfrontAmount = (project: PMProject) => {
    // Use the percentage field as upfront percentage (assuming it represents upfront payment %)
    return (project.pricing * project.percentage) / 100
  }

  const getPaymentStatus = (paidPercentage: number) => {
    if (paidPercentage === 100) {
      return { status: 'Fully Paid', color: 'bg-green-100 text-green-800', icon: CheckCircle }
    } else if (paidPercentage > 0) {
      return { status: 'Partially Paid', color: 'bg-yellow-100 text-yellow-800', icon: Clock }
    } else {
      return { status: 'Not Paid', color: 'bg-red-100 text-red-800', icon: AlertCircle }
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount)
  }

  // Filter projects based on search term
  const filteredProjects = projects.filter(project => {
    const clientInfo = getClientInfo(project)
    const searchLower = searchTerm.toLowerCase()
    
    return (
      project.title.toLowerCase().includes(searchLower) ||
      project.description.toLowerCase().includes(searchLower) ||
      clientInfo.clientName.toLowerCase().includes(searchLower) ||
      clientInfo.email.toLowerCase().includes(searchLower) ||
      project.id.toString().includes(searchLower)
    )
  })

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-slate-200 rounded w-1/3"></div>
          <div className="h-10 bg-slate-200 rounded w-1/4"></div>
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-16 bg-slate-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">My Projects</h1>
          <p className="text-slate-600 mt-2">Manage your assigned projects ({projects.length} total)</p>
        </div>
        <div className="flex space-x-3">
          <Button 
            variant="outline" 
            onClick={fetchData}
            disabled={isLoading}
          >
            <RefreshCw className={`mr-2 h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <Link href="/pm/upload-document">
            <Button variant="outline">
              <Upload className="mr-2 h-4 w-4" />
              Upload Document
            </Button>
          </Link>
          <Link href="/pm/create-report">
            <Button>
              <BarChart3 className="mr-2 h-4 w-4" />
              Create Report
            </Button>
          </Link>
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

      {/* Search and Filters */}
      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
          <Input
            placeholder="Search projects by title, client, or ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Projects Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <FolderOpen className="h-5 w-5" />
            <span>Project Management Dashboard</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {filteredProjects.length > 0 ? (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[250px]">Project</TableHead>
                    <TableHead className="w-[120px]">Status</TableHead>
                    <TableHead className="w-[150px]">Upfront Payment</TableHead>
                    <TableHead className="w-[150px]">Payment</TableHead>
                    <TableHead className="w-[130px]">Value</TableHead>
                    <TableHead className="w-[120px]">Timeline</TableHead>
                    <TableHead className="w-[100px]">Documents</TableHead>
                    <TableHead className="w-[80px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredProjects.map((project) => {
                    const projectStatus = getProjectStatus(project)
                    const paymentStatus = getPaymentStatus(project.paidPercentage)
                    const clientInfo = getClientInfo(project)
                    const StatusIcon = projectStatus.icon
                    const PaymentIcon = paymentStatus.icon

                    return (
                      <TableRow key={project.id} className="hover:bg-slate-50">
                        <TableCell className="py-4">
                          <div className="space-y-1">
                            <div className="font-medium text-slate-900 leading-5">
                              {project.title}
                            </div>
                            <div className="text-sm text-slate-500 line-clamp-2">
                              {project.description}
                            </div>
                            <div className="flex items-center space-x-1 text-xs text-slate-400">
                              <span>ID: {project.id}</span>
                              <span>•</span>
                              <span>Client: {clientInfo.clientName}</span>
                            </div>
                          </div>
                        </TableCell>

                        <TableCell className="py-4">
                          <Badge 
                            variant="outline" 
                            className={`${projectStatus.color} flex items-center space-x-1 w-fit`}
                          >
                            <StatusIcon className="h-3 w-3" />
                            <span>{projectStatus.status}</span>
                          </Badge>
                        </TableCell>

                        <TableCell className="py-4">
                          <div className="space-y-1">
                            <div className="flex items-center space-x-1">
                              <DollarSign className="h-3 w-3 text-orange-600" />
                              <span className="font-medium text-orange-600 text-sm">
                                {formatCurrency(calculateUpfrontAmount(project))}
                              </span>
                            </div>
                            <div className="text-xs text-slate-500">
                              {project.percentage}% of total
                            </div>
                            <div className="text-xs text-slate-500">
                              Required to start
                            </div>
                          </div>
                        </TableCell>

                        <TableCell className="py-4">
                          <div className="space-y-2">
                            <div className="flex items-center space-x-1">
                              <PaymentIcon className="h-3 w-3 text-slate-500" />
                              <span className="text-sm font-medium text-slate-700">
                                {project.paidPercentage}%
                              </span>
                            </div>
                            <Progress value={project.paidPercentage} className="h-2 w-24" />
                            <div className="text-xs text-slate-500">
                              {paymentStatus.status}
                            </div>
                          </div>
                        </TableCell>

                        <TableCell className="py-4">
                          <div className="flex items-center space-x-1">
                            <DollarSign className="h-3 w-3 text-green-600" />
                            <span className="font-medium text-green-600">
                              {formatCurrency(project.pricing)}
                            </span>
                          </div>
                        </TableCell>

                        <TableCell className="py-4">
                          <div className="flex items-center space-x-1">
                            <Calendar className="h-3 w-3 text-blue-600" />
                            <span className="text-sm text-slate-700">
                              {project.timeline}
                            </span>
                          </div>
                        </TableCell>

                        <TableCell className="py-4">
                          <div className="flex items-center space-x-1">
                            <FileText className="h-3 w-3 text-purple-600" />
                            <span className="text-sm font-medium text-purple-600">
                              {project.documents.length}
                            </span>
                          </div>
                        </TableCell>

                        <TableCell className="py-4">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-56">
                              <DropdownMenuLabel>Project Actions</DropdownMenuLabel>
                              
                              <DropdownMenuSeparator />
                              
                              <DropdownMenuItem disabled>
                                <DollarSign className="mr-2 h-4 w-4" />
                                <span>Upfront: {formatCurrency(calculateUpfrontAmount(project))} ({project.percentage}%)</span>
                              </DropdownMenuItem>
                              
                              <DropdownMenuItem disabled>
                                <DollarSign className="mr-2 h-4 w-4" />
                                <span>Payment: {project.paidPercentage}%</span>
                              </DropdownMenuItem>

                              <DropdownMenuSeparator />
                              
                              <DropdownMenuItem disabled>
                                <User className="mr-2 h-4 w-4" />
                                <span>{clientInfo.clientName}</span>
                              </DropdownMenuItem>
                              
                              <DropdownMenuItem disabled>
                                <Mail className="mr-2 h-4 w-4" />
                                <span className="text-xs">{clientInfo.email}</span>
                              </DropdownMenuItem>
                              
                              {clientInfo.phone !== 'N/A' && (
                                <DropdownMenuItem disabled>
                                  <Phone className="mr-2 h-4 w-4" />
                                  <span className="text-xs">{clientInfo.phone}</span>
                                </DropdownMenuItem>
                              )}

                              <DropdownMenuSeparator />
                              
                              {project.documents.length > 0 && (
                                <>
                                  <DropdownMenuLabel>Documents ({project.documents.length})</DropdownMenuLabel>
                                  {project.documents.slice(0, 3).map((doc, index) => (
                                    <DropdownMenuItem key={doc.id} asChild>
                                      <a 
                                        href={doc.documentUrl} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="cursor-pointer"
                                      >
                                        <ExternalLink className="mr-2 h-4 w-4" />
                                        <span>Document {index + 1}</span>
                                      </a>
                                    </DropdownMenuItem>
                                  ))}
                                  {project.documents.length > 3 && (
                                    <DropdownMenuItem disabled>
                                      <FileText className="mr-2 h-4 w-4" />
                                      <span>+{project.documents.length - 3} more...</span>
                                    </DropdownMenuItem>
                                  )}
                                  <DropdownMenuSeparator />
                                </>
                              )}
                              
                              <DropdownMenuItem asChild>
                                <Link href={`/pm/upload-document?project=${project.id}`}>
                                  <Upload className="mr-2 h-4 w-4" />
                                  <span>Upload Document</span>
                                </Link>
                              </DropdownMenuItem>
                              
                              <DropdownMenuItem asChild>
                                <Link href={`/pm/create-report?project=${project.id}`}>
                                  <BarChart3 className="mr-2 h-4 w-4" />
                                  <span>Create Report</span>
                                </Link>
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="py-12">
              <div className="text-center">
                <FolderOpen className="h-12 w-12 text-slate-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-slate-700 mb-2">
                  {searchTerm ? 'No projects found' : 'No projects assigned'}
                </h3>
                <p className="text-slate-500">
                  {searchTerm 
                    ? 'Try adjusting your search criteria'
                    : 'Projects will appear here once assigned by admin.'
                  }
                </p>
                {searchTerm && (
                  <Button 
                    variant="outline" 
                    onClick={() => setSearchTerm('')}
                    className="mt-4"
                  >
                    Clear Search
                  </Button>
                )}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}