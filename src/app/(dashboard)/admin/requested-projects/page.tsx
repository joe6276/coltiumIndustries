// src/app/(dashboard)/admin/requested-projects/page.tsx - Tabular Format
'use client'
import { useEffect, useState } from 'react'
import { apiClient } from '@/lib/api-config'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { 
  ClipboardList, 
  User, 
  DollarSign, 
  Calendar,
  UserCheck,
  Loader2,
  CheckCircle,
  AlertCircle,
  MoreHorizontal,
  Eye,
  UserPlus,
  Building,
  Phone,
  Mail,
  Search,
  RefreshCw
} from 'lucide-react'
import { toast } from '@/hooks/use-toast'

interface RequestedProject {
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
  salespersonId: number;
  paidPercentage: number
  percentage: number
  pmId: number
  documents: Array<{
    id: number
    documentUrl: string
  }>
}

interface ProjectManager {
  id: number
  name: string
  email: string
  phone: string
  role: number
}

interface ClientInfo {
  id: number
  email: string
}

export default function RequestedProjectsPage() {
  const [projects, setProjects] = useState<RequestedProject[]>([])
  const [filteredProjects, setFilteredProjects] = useState<RequestedProject[]>([])
  const [pms, setPMs] = useState<ProjectManager[]>([])
  const [clients, setClients] = useState<ClientInfo[]>([])
  const [selectedPMs, setSelectedPMs] = useState<{[key: number]: number}>({})
  const [isLoading, setIsLoading] = useState(true)
  const [isAssigning, setIsAssigning] = useState<{[key: number]: boolean}>({})
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    filterProjects()
  }, [projects, searchTerm])

  const fetchData = async () => {
    try {
      setIsLoading(true)
      const [projectsData, pmsData, clientsData] = await Promise.all([
        apiClient.getRequestedProjects(),
        apiClient.getPMs(),
        apiClient.getSalesClients() // Fetch clients to get client info
      ])
      
      setProjects(projectsData)
      setPMs(pmsData)
      setClients(clientsData)
      setError(null)
    } catch (error) {
      console.error('Failed to fetch data:', error)
      setError('Failed to load requested projects')
    } finally {
      setIsLoading(false)
    }
  }

  const filterProjects = () => {
    let filtered = projects

    if (searchTerm) {
      filtered = filtered.filter(project =>
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (project.client?.clientName?.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (project.client?.company?.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    }

    setFilteredProjects(filtered)
  }

  const getClientInfo = (clientId: number) => {
    const client = clients.find(c => c.id === clientId)
    return client || { id: clientId, email: `client-${clientId}@unknown.com` }
  }

  const handleAssignPM = async (projectId: number) => {
    const pmId = selectedPMs[projectId]
    if (!pmId) {
      toast({
        title: "Error",
        description: "Please select a Project Manager",
        variant: "destructive",
      })
      return
    }

    try {
      setIsAssigning(prev => ({ ...prev, [projectId]: true }))
      
      await apiClient.assignPMToProject({ userId: pmId, projectId })
      
      toast({
        title: "Success",
        description: "Project Manager assigned successfully",
      })
      
      // Remove assigned project from list
      setProjects(prev => prev.filter(p => p.id !== projectId))
      
    } catch (error) {
      console.error('Failed to assign PM:', error)
      toast({
        title: "Error",
        description: "Failed to assign Project Manager",
        variant: "destructive",
      })
    } finally {
      setIsAssigning(prev => ({ ...prev, [projectId]: false }))
    }
  }

  const handlePMSelection = (projectId: number, pmId: string) => {
    setSelectedPMs(prev => ({
      ...prev,
      [projectId]: parseInt(pmId)
    }))
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount)
  }

  const getPMName = (pmId: number) => {
    const pm = pms.find(pm => pm.id === pmId)
    return pm ? pm.name : 'Select PM'
  }

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-slate-200 rounded w-1/3"></div>
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
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
            <ClipboardList className="h-8 w-8 text-orange-600" />
            <div>
              <h1 className="text-3xl font-bold text-slate-800">Requested Projects</h1>
              <p className="text-slate-600 mt-1">Assign Project Managers to client requests</p>
            </div>
          </div>
          <Button onClick={fetchData} variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>

      {/* Error Alert */}
      {error && (
        <div className="mb-6">
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        </div>
      )}

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <ClipboardList className="h-8 w-8 text-orange-600" />
              <div>
                <p className="text-sm text-slate-600">Pending Requests</p>
                <p className="text-2xl font-bold text-slate-800">{projects.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <DollarSign className="h-8 w-8 text-green-600" />
              <div>
                <p className="text-sm text-slate-600">Total Value</p>
                <p className="text-2xl font-bold text-slate-800">
                  {formatCurrency(projects.reduce((sum, p) => sum + p.pricing, 0))}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <UserPlus className="h-8 w-8 text-blue-600" />
              <div>
                <p className="text-sm text-slate-600">Available PMs</p>
                <p className="text-2xl font-bold text-slate-800">{pms.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search Filter */}
      <div className="mb-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input
            placeholder="Search projects by title, description, or client..."
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
            <ClipboardList className="h-5 w-5" />
            <span>Requested Projects ({filteredProjects.length})</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {filteredProjects.length === 0 ? (
            <div className="py-12 text-center">
              {projects.length === 0 ? (
                <>
                  <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-slate-700 mb-2">All caught up!</h3>
                  <p className="text-slate-500">No pending project requests at the moment.</p>
                </>
              ) : (
                <>
                  <ClipboardList className="h-12 w-12 text-slate-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-slate-700 mb-2">No Projects Found</h3>
                  <p className="text-slate-500">No projects match your search criteria.</p>
                </>
              )}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[200px]">Project</TableHead>
                    <TableHead className="w-[180px]">Client</TableHead>
                    <TableHead className="w-[120px]">Pricing</TableHead>
                    <TableHead className="w-[100px]">Timeline</TableHead>
                    <TableHead className="w-[120px]">Status</TableHead>
                    <TableHead className="w-[200px]">Assign PM</TableHead>
                    <TableHead className="w-[120px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredProjects.map((project) => {
                    // Get client info - use the client object if available, otherwise fetch from clients list
                    const clientInfo = project.client || {
                      clientName: getClientInfo(project.clientId).email.split('@')[0],
                      company: 'Unknown Company',
                      email: getClientInfo(project.clientId).email,
                      phone: 'N/A'
                    }

                    return (
                      <TableRow key={project.id} className="hover:bg-slate-50">
                        <TableCell className="py-4">
                          <div>
                            <div className="font-medium text-slate-900 mb-1">{project.title}</div>
                            <div className="text-sm text-slate-500 line-clamp-2">
                              {project.description}
                            </div>
                            
                          </div>
                        </TableCell>
                        
                        <TableCell className="py-4">
                          <div>
                            <div className="font-medium text-slate-900">{clientInfo.clientName}</div>
                            
                            <div className="text-xs text-slate-400 mt-1">
                              <div className="flex items-center space-x-1">
                                <Mail className="h-3 w-3" />
                                <span>{clientInfo.email}</span>
                              </div>
                              {clientInfo.phone && clientInfo.phone !== 'N/A' && (
                                <div className="flex items-center space-x-1 mt-1">
                                  <Phone className="h-3 w-3" />
                                  <span>{clientInfo.phone}</span>
                                </div>
                              )}
                            </div>
                          </div>
                        </TableCell>
                        
                        <TableCell className="py-4">
                          <div className="font-medium text-green-600">
                            {formatCurrency(project.pricing)}
                          </div>
                          
                        </TableCell>
                        
                        <TableCell className="py-4">
                          <div className="flex items-center space-x-1">
                            <Calendar className="h-3 w-3 text-blue-600" />
                            <span className="text-sm">{project.timeline}</span>
                          </div>
                        </TableCell>
                        
                        <TableCell className="py-4">
                          <div className="space-y-1">
                            <div className="flex items-center space-x-1">
                              <Badge>
                                {project.status}
                              </Badge>
                          </div>
                          </div>
                        </TableCell>
                        
                        <TableCell className="py-4">
                          {project.pmId === 0 ? (
                            <div className="space-y-2">
                              <Select 
                                value={selectedPMs[project.id]?.toString() || ''} 
                                onValueChange={(value) => handlePMSelection(project.id, value)}
                                disabled={isAssigning[project.id]}
                              >
                                <SelectTrigger className="text-xs">
                                  <SelectValue placeholder="Select PM" />
                                </SelectTrigger>
                                <SelectContent>
                                  {pms.map((pm) => (
                                    <SelectItem key={pm.id} value={pm.id.toString()}>
                                      <div>
                                        <div className="font-medium">{pm.name}</div>
                                        <div className="text-xs text-slate-500">{pm.email}</div>
                                      </div>
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              
                              <Button 
                                onClick={() => handleAssignPM(project.id)}
                                disabled={!selectedPMs[project.id] || isAssigning[project.id]}
                                size="sm"
                                className="w-full text-xs"
                              >
                                {isAssigning[project.id] ? (
                                  <>
                                    <Loader2 className="mr-1 h-3 w-3 animate-spin" />
                                    Assigning...
                                  </>
                                ) : (
                                  <>
                                    <UserCheck className="mr-1 h-3 w-3" />
                                    Assign PM
                                  </>
                                )}
                              </Button>
                            </div>
                          ) : (
                            <div className="flex items-center space-x-2 text-green-600">
                              <CheckCircle className="h-4 w-4" />
                              <span className="text-xs">Already Assigned</span>
                            </div>
                          )}
                        </TableCell>
                        
                        <TableCell className="py-4">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button 
                                variant="ghost" 
                                className="h-8 w-8 p-0"
                                disabled={isAssigning[project.id]}
                              >
                                <span className="sr-only">Open menu</span>
                                {isAssigning[project.id] ? (
                                  <Loader2 className="h-4 w-4 animate-spin" />
                                ) : (
                                  <MoreHorizontal className="h-4 w-4" />
                                )}
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-56">
                              <DropdownMenuLabel>Project Actions</DropdownMenuLabel>
                              <DropdownMenuSeparator />
                              
                              {/* View Project Details */}
                              <DropdownMenuItem>
                                <Eye className="mr-2 h-4 w-4" />
                                <span>View Project Details</span>
                              </DropdownMenuItem>
                              
                              <DropdownMenuSeparator />
                              
                              {/* Client Information */}
                              <DropdownMenuItem disabled>
                                <User className="mr-2 h-4 w-4" />
                                <span>Client ID: {project.clientId}</span>
                              </DropdownMenuItem>
                              
                              <DropdownMenuItem disabled>
                                <Building className="mr-2 h-4 w-4" />
                                <span>{clientInfo.company}</span>
                              </DropdownMenuItem>
                              
                              <DropdownMenuItem disabled>
                                <Mail className="mr-2 h-4 w-4" />
                                <span>{clientInfo.email}</span>
                              </DropdownMenuItem>
                              
                              {clientInfo.phone && clientInfo.phone !== 'N/A' && (
                                <DropdownMenuItem disabled>
                                  <Phone className="mr-2 h-4 w-4" />
                                  <span>{clientInfo.phone}</span>
                                </DropdownMenuItem>
                              )}
                              
                              <DropdownMenuSeparator />
                              <DropdownMenuItem disabled>
                                <User className="mr-2 h-4 w-4" />
                                <span>Sales Person ID: {project.salespersonId}</span>
                              </DropdownMenuItem>

                              <DropdownMenuSeparator />
                              
                              {/* Project Status Info */}
                              <DropdownMenuItem disabled>
                                <CheckCircle className="mr-2 h-4 w-4" />
                                <span>Price Percentage: {project.percentage}%</span>
                              </DropdownMenuItem>
                              
                              <DropdownMenuItem disabled>
                                <DollarSign className="mr-2 h-4 w-4" />
                                <span>Payment: {project.paidPercentage}%</span>
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
          )}
        </CardContent>
      </Card>

      {/* Results Summary */}
      {filteredProjects.length > 0 && (
        <div className="mt-6 text-center text-sm text-slate-600">
          Showing {filteredProjects.length} of {projects.length} requested projects
        </div>
      )}
    </div>
  )
}