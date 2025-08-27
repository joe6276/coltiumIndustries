// src/app/(dashboard)/admin/documents/page.tsx - Admin Document Approval (Tabular Format)
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { 
  FileText, 
  Check, 
  Clock,
  ExternalLink,
  Loader2,
  CheckCircle,
  AlertCircle,
  Search,
  User,
  Calendar,
  RefreshCw,
  Eye,
  Filter
} from 'lucide-react'
import { toast } from '@/hooks/use-toast'

// Updated interface to match the actual API response structure
interface AdminDocumentResponse {
  id: number
  documentUrl: string
  title: string
  description: string
  timeline: string
  pm: string
  pmEmail: string
}

export default function AdminDocumentsPage() {
  const [documents, setDocuments] = useState<AdminDocumentResponse[]>([])
  const [filteredDocuments, setFilteredDocuments] = useState<AdminDocumentResponse[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [approvingIds, setApprovingIds] = useState<Set<number>>(new Set())
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'approved'>('all')

  useEffect(() => {
    fetchDocuments()
  }, [])

  useEffect(() => {
    // Apply filters
    let filtered = documents

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(doc =>
        doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doc.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doc.pm.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doc.pmEmail.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Status filter - since all documents are pending, we'll filter differently
    if (statusFilter !== 'all') {
      if (statusFilter === 'pending') {
        // Show all documents (they're all pending)
        filtered = filtered
      } else if (statusFilter === 'approved') {
        // Show no documents (none are approved in this format)
        filtered = []
      }
    }

    setFilteredDocuments(filtered)
  }, [documents, searchTerm, statusFilter])

  const fetchDocuments = async () => {
    try {
      setIsLoading(true)
      
      // The API now returns the detailed format directly
      const documentsData = await apiClient.getAdminDocuments()
      
      // Cast to the correct type since API returns the detailed format
      setDocuments(documentsData as AdminDocumentResponse[])
      setError(null)
    } catch (error) {
      console.error('Failed to fetch documents:', error)
      setError('Failed to load documents')
    } finally {
      setIsLoading(false)
    }
  }

  const handleApprove = async (documentId: number) => {
    try {
      setApprovingIds(prev => new Set([...prev, documentId]))
      
      await apiClient.approveDocument(documentId)
      
      toast({
        title: "Success",
        description: "Document approved successfully",
      })
      
      // Update document status locally
      setDocuments(prev => 
        prev.map(doc => 
          doc.id === documentId 
            ? { ...doc, isApproved: true }
            : doc
        )
      )
      
    } catch (error) {
      console.error('Failed to approve document:', error)
      toast({
        title: "Error",
        description: "Failed to approve document",
        variant: "destructive",
      })
    } finally {
      setApprovingIds(prev => {
        const newSet = new Set(prev)
        newSet.delete(documentId)
        return newSet
      })
    }
  }

  

  const pendingCount = documents.length // All documents are pending since no isApproved field
  const approvedCount = 0 // No approved documents in this response format

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-slate-200 rounded w-1/3"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[...Array(3)].map((_, i) => (
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
          <FileText className="h-8 w-8 text-blue-600" />
          <div>
            <h1 className="text-3xl font-bold text-slate-800">Document Management</h1>
            <p className="text-slate-600 mt-1">Review and approve PM submitted documents</p>
          </div>
        </div>
        <Button onClick={fetchDocuments} variant="outline" size="sm">
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
                onClick={fetchDocuments}
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
              <div className="text-2xl font-bold text-blue-600">{documents.length}</div>
              <p className="text-sm text-slate-500">Total Documents</p>
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
              <div className="text-2xl font-bold text-purple-600">
                {documents.length > 0 ? Math.round((approvedCount / documents.length) * 100) : 0}%
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
                  placeholder="Search by title, description, PM name or email..."
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
                  <SelectItem value="all">All Documents</SelectItem>
                  <SelectItem value="pending">Pending Review</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Documents Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <FileText className="h-5 w-5" />
            <span>Documents ({filteredDocuments.length})</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {filteredDocuments.length > 0 ? (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[50px]">ID</TableHead>
                    <TableHead className="w-[200px]">Project</TableHead>
                    <TableHead className="w-[300px]">Description</TableHead>
                    <TableHead className="w-[150px]">Project Manager</TableHead>
                    <TableHead className="w-[120px]">Timeline</TableHead>
                    <TableHead className="w-[100px]">Document</TableHead>
                    <TableHead className="w-[120px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredDocuments.map((document) => (
                    <TableRow key={document.id} className="hover:bg-slate-50">
                      <TableCell className="font-medium">
                        #{document.id}
                      </TableCell>
                      
                      <TableCell>
                        <div>
                          <div className="font-medium text-slate-900">{document.title}</div>
                          <div className="text-sm text-slate-500">
                            Project Documentation
                          </div>
                        </div>
                      </TableCell>
                      
                      <TableCell>
                        <div className="text-sm text-slate-700 line-clamp-2">
                          {document.description || 'No description provided'}
                        </div>
                      </TableCell>
                      
                      <TableCell>
                        <div>
                          <div className="flex items-center space-x-2">
                            <User className="h-4 w-4 text-slate-400" />
                            <div>
                              <div className="font-medium text-slate-900">{document.pm}</div>
                              <div className="text-sm text-slate-500">{document.pmEmail}</div>
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      
                      <TableCell>
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-3 w-3 text-slate-400" />
                          <span className="text-sm text-slate-600">
                            {document.timeline || 'N/A'}
                          </span>
                        </div>
                      </TableCell>
                      
                      
                      
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <a 
                            href={document.documentUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-800 flex items-center space-x-1"
                          >
                            <Eye className="h-4 w-4" />
                            <span className="text-sm">View</span>
                          </a>
                          <a 
                            href={document.documentUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-slate-400 hover:text-slate-600"
                          >
                            <ExternalLink className="h-3 w-3" />
                          </a>
                        </div>
                      </TableCell>
                      
                      <TableCell>
                        <Button 
                          onClick={() => handleApprove(document.id)}
                          disabled={approvingIds.has(document.id)}
                          size="sm"
                          className="bg-green-600 hover:bg-green-700"
                        >
                          {approvingIds.has(document.id) ? (
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
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="py-12 text-center">
              <FileText className="h-12 w-12 text-slate-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-slate-700 mb-2">
                {searchTerm || statusFilter !== 'all' ? 'No documents match your filters' : 'No documents submitted'}
              </h3>
              <p className="text-slate-500">
                {searchTerm || statusFilter !== 'all' 
                  ? 'Try adjusting your search criteria or filters'
                  : 'Documents submitted by Project Managers will appear here for review.'
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
      {filteredDocuments.length > 0 && (
        <div className="mt-4 text-center text-sm text-slate-600">
          Showing {filteredDocuments.length} of {documents.length} documents
        </div>
      )}
    </div>
  )
}