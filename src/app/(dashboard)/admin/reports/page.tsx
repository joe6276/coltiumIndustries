// src/app/(dashboard)/admin/reports/page.tsx - Admin Report Review (Tabular Format)
'use client'
import { useEffect, useState } from 'react'
import { apiClient } from '@/lib/api-config'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
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
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { 
  BarChart3, 
  Check, 
  Clock,
  ExternalLink,
  Loader2,
  CheckCircle,
  AlertCircle,
  FileText,
  Search,
  User,
  Calendar,
  RefreshCw,
  ChevronDown,
  ChevronRight,
  Eye,
  BookOpen
} from 'lucide-react'
import { toast } from '@/hooks/use-toast'

// Updated interface to match the actual API response structure
interface AdminReportResponse {
  id: number
  report: string
  title: string
  description: string
  timeline: string
  pm: string
  pmEmail: string
}

export default function AdminReportsPage() {
  const [reports, setReports] = useState<AdminReportResponse[]>([])
  const [filteredReports, setFilteredReports] = useState<AdminReportResponse[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [approvingIds, setApprovingIds] = useState<Set<number>>(new Set())
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'approved'>('all')
  const [expandedRows, setExpandedRows] = useState<Set<number>>(new Set())

  useEffect(() => {
    fetchReports()
  }, [])

  useEffect(() => {
    // Apply filters
    let filtered = reports

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(report =>
        report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        report.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        report.pm.toLowerCase().includes(searchTerm.toLowerCase()) ||
        report.pmEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
        report.report.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Status filter - since all reports are pending, we'll filter differently
    if (statusFilter !== 'all') {
      if (statusFilter === 'pending') {
        // Show all reports (they're all pending)
        filtered = filtered
      } else if (statusFilter === 'approved') {
        // Show no reports (none are approved in this format)
        filtered = []
      }
    }

    setFilteredReports(filtered)
  }, [reports, searchTerm, statusFilter])

  const fetchReports = async () => {
    try {
      setIsLoading(true)
      
      // The API now returns the detailed format directly
      const reportsData = await apiClient.getAdminReports()
      
      // Cast to the correct type since API returns the detailed format
      setReports(reportsData as AdminReportResponse[])
      setError(null)
    } catch (error) {
      console.error('Failed to fetch reports:', error)
      setError('Failed to load reports')
    } finally {
      setIsLoading(false)
    }
  }

  const handleApprove = async (reportId: number) => {
    try {
      setApprovingIds(prev => new Set([...prev, reportId]))
      
      await apiClient.approveReport(reportId)
      
      toast({
        title: "Success",
        description: "Report approved successfully",
      })
      
      // Update report status locally
      setReports(prev => 
        prev.map(report => 
          report.id === reportId 
            ? { ...report, isApproved: true }
            : report
        )
      )
      
    } catch (error) {
      console.error('Failed to approve report:', error)
      toast({
        title: "Error",
        description: "Failed to approve report",
        variant: "destructive",
      })
    } finally {
      setApprovingIds(prev => {
        const newSet = new Set(prev)
        newSet.delete(reportId)
        return newSet
      })
    }
  }

  const toggleRowExpansion = (reportId: number) => {
    setExpandedRows(prev => {
      const newSet = new Set(prev)
      if (newSet.has(reportId)) {
        newSet.delete(reportId)
      } else {
        newSet.add(reportId)
      }
      return newSet
    })
  }


  const truncateText = (text: string, maxLength: number = 100) => {
    if (text.length <= maxLength) return text
    return text.substring(0, maxLength) + '...'
  }

  const pendingCount = reports.length // All reports are pending since no isApproved field
  const approvedCount = 0 // No approved reports in this response format

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-slate-200 rounded w-1/3"></div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-24 bg-slate-200 rounded"></div>
            ))}
          </div>
          <div className="h-64 bg-slate-200 rounded"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-3">
          <BarChart3 className="h-8 w-8 text-purple-600" />
          <div>
            <h1 className="text-3xl font-bold text-slate-800">Report Management</h1>
            <p className="text-slate-600 mt-1">Review and approve PM submitted reports</p>
          </div>
        </div>
        <Button onClick={fetchReports} variant="outline" size="sm">
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh
        </Button>
      </div>

      {/* Error Alert */}
      {error && (
        <div className="mb-6">
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              {error}
              <button 
                onClick={fetchReports}
                className="ml-2 text-sm underline hover:no-underline"
              >
                Try Again
              </button>
            </AlertDescription>
          </Alert>
        </div>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{reports.length}</div>
              <p className="text-sm text-slate-500">Total Reports</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-600">{pendingCount}</div>
              <p className="text-sm text-slate-500">Pending Review</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{approvedCount}</div>
              <p className="text-sm text-slate-500">Approved</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                {reports.length > 0 ? Math.round((approvedCount / reports.length) * 100) : 0}%
              </div>
              <p className="text-sm text-slate-500">Approval Rate</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                <Input
                  placeholder="Search by title, description, PM name, or report content..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="w-48">
              <Select value={statusFilter} onValueChange={(value: 'all' | 'pending' | 'approved') => setStatusFilter(value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Reports</SelectItem>
                  <SelectItem value="pending">Pending Review</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Reports Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <BarChart3 className="h-5 w-5" />
            <span>Reports ({filteredReports.length})</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {filteredReports.length > 0 ? (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[50px]"></TableHead>
                    <TableHead className="w-[50px]">ID</TableHead>
                    <TableHead className="w-[200px]">Project</TableHead>
                    <TableHead className="w-[300px]">Description</TableHead>
                    <TableHead className="w-[150px]">Project Manager</TableHead>
                    <TableHead className="w-[120px]">Timeline</TableHead>
                    <TableHead className="w-[300px]">Report Preview</TableHead>
                    <TableHead className="w-[120px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredReports.map((report) => (
                    <>
                      <TableRow key={report.id} className="hover:bg-slate-50">
                        <TableCell>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => toggleRowExpansion(report.id)}
                            className="p-0 h-8 w-8"
                          >
                            {expandedRows.has(report.id) ? (
                              <ChevronDown className="h-4 w-4" />
                            ) : (
                              <ChevronRight className="h-4 w-4" />
                            )}
                          </Button>
                        </TableCell>
                        
                        <TableCell className="font-medium">
                          #{report.id}
                        </TableCell>
                        
                        <TableCell>
                          <div>
                            <div className="font-medium text-slate-900">{report.title}</div>
                            <div className="text-sm text-slate-500">Project Report</div>
                          </div>
                        </TableCell>
                        
                        <TableCell>
                          <div className="text-sm text-slate-700">
                            {truncateText(report.description, 80)}
                          </div>
                        </TableCell>
                        
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <User className="h-4 w-4 text-slate-400" />
                            <div>
                              <div className="font-medium text-slate-900">{report.pm}</div>
                              <div className="text-sm text-slate-500">{report.pmEmail}</div>
                            </div>
                          </div>
                        </TableCell>
                        
                        <TableCell>
                          <div className="flex items-center space-x-1">
                            <Calendar className="h-3 w-3 text-slate-400" />
                            <span className="text-sm text-slate-600">
                              {report.timeline || 'N/A'}
                            </span>
                          </div>
                        </TableCell>
                        
                        <TableCell>
                          <div className="text-sm text-slate-600">
                            {truncateText(report.report, 100)}
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => toggleRowExpansion(report.id)}
                            className="mt-1 p-0 h-auto text-blue-600 hover:text-blue-800"
                          >
                            <BookOpen className="h-3 w-3 mr-1" />
                            {expandedRows.has(report.id) ? 'Show less' : 'Read full report'}
                          </Button>
                        </TableCell>
                        
                        
                        
                        <TableCell>
                          <Button 
                            onClick={() => handleApprove(report.id)}
                            disabled={approvingIds.has(report.id)}
                            size="sm"
                            className="bg-green-600 hover:bg-green-700"
                          >
                            {approvingIds.has(report.id) ? (
                              <>
                                <Loader2 className="mr-2 h-3 w-3 animate-spin" />
                                Approving...
                              </>
                            ) : (
                              <>
                                <Check className="mr-2 h-3 w-3" />
                                Approve
                              </>
                            )}
                          </Button>
                        </TableCell>
                      </TableRow>
                      
                      {/* Expanded Row - Full Report Content */}
                      {expandedRows.has(report.id) && (
                        <TableRow>
                          <TableCell colSpan={9} className="bg-slate-50 border-t-0">
                            <div className="py-4">
                              <div className="flex items-center space-x-2 mb-3">
                                <FileText className="h-5 w-5 text-slate-600" />
                                <h4 className="font-semibold text-slate-800">Full Report Content</h4>
                              </div>
                              <div className="bg-white rounded-lg p-4 border max-h-96 overflow-y-auto">
                                <div className="prose prose-sm max-w-none">
                                  <div className="whitespace-pre-wrap text-slate-700 leading-relaxed">
                                    {report.report}
                                  </div>
                                </div>
                              </div>
                              <div className="mt-3 flex justify-end">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => toggleRowExpansion(report.id)}
                                >
                                  <ChevronDown className="h-4 w-4 mr-1" />
                                  Collapse
                                </Button>
                              </div>
                            </div>
                          </TableCell>
                        </TableRow>
                      )}
                    </>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="py-12 text-center">
              <BarChart3 className="h-12 w-12 text-slate-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-slate-700 mb-2">
                {searchTerm || statusFilter !== 'all' ? 'No reports match your filters' : 'No reports submitted'}
              </h3>
              <p className="text-slate-500">
                {searchTerm || statusFilter !== 'all' 
                  ? 'Try adjusting your search criteria or filters'
                  : 'Reports submitted by Project Managers will appear here for review.'
                }
              </p>
              {(searchTerm || statusFilter !== 'all') && (
                <div className="mt-4">
                  <Button 
                    variant="outline"
                    onClick={() => {
                      setSearchTerm('')
                      setStatusFilter('all')
                    }}
                  >
                    Clear Filters
                  </Button>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Results Summary */}
      {filteredReports.length > 0 && (
        <div className="mt-4 text-center text-sm text-slate-600">
          Showing {filteredReports.length} of {reports.length} reports
        </div>
      )}
    </div>
  )
}