// src/app/(dashboard)/admin/token-requests/page.tsx
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
} from '@/components/ui/table'
import { 
  Coins,
  CheckCircle,
  Clock,
  AlertCircle,
  MoreHorizontal,
  Search,
  RefreshCw,
  User,
  FolderOpen,
  CreditCard,
  Eye
} from 'lucide-react'
import { TokenRequest } from '@/lib/types/api'
import { toast } from '@/hooks/use-toast'

export default function AdminTokenRequestsPage() {
  const [tokenRequests, setTokenRequests] = useState<TokenRequest[]>([])
  const [filteredRequests, setFilteredRequests] = useState<TokenRequest[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [processingIds, setProcessingIds] = useState<Set<number>>(new Set())

  useEffect(() => {
    fetchTokenRequests()
  }, [])

  useEffect(() => {
    filterRequests()
  }, [tokenRequests, searchTerm])

  const fetchTokenRequests = async () => {
    try {
      setIsLoading(true)
      const requests = await apiClient.getTokenRequests()
      setTokenRequests(requests)
      setError(null)
    } catch (error) {
      console.error('Failed to fetch token requests:', error)
      setError('Failed to load token requests')
    } finally {
      setIsLoading(false)
    }
  }

  const filterRequests = () => {
    let filtered = tokenRequests

    if (searchTerm) {
      filtered = filtered.filter(request =>
        request.project?.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        request.client?.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        request.client?.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        request.stripeSessionId.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    setFilteredRequests(filtered)
  }

  const handleApproveRequest = async (tokenRequestId: number) => {
    try {
      setProcessingIds(prev => new Set([...prev, tokenRequestId]))
      
      const success = await apiClient.approveTokenRequest(tokenRequestId)
      
      if (success) {
        toast({
          title: "Success",
          description: "Token request approved successfully",
        })
        
        // Update the local state
        setTokenRequests(prev => prev.map(request => 
          request.id === tokenRequestId 
            ? { ...request, isApproved: true }
            : request
        ))
      } else {
        throw new Error('Failed to approve token request')
      }
    } catch (error) {
      console.error('Failed to approve token request:', error)
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to approve token request",
        variant: "destructive",
      })
    } finally {
      setProcessingIds(prev => {
        const newSet = new Set(prev)
        newSet.delete(tokenRequestId)
        return newSet
      })
    }
  }

  const getStatusBadge = (isApproved: boolean) => {
    if (isApproved) {
      return (
        <Badge className="bg-green-100 text-green-800 border-green-200">
          <CheckCircle className="h-3 w-3 mr-1" />
          Approved
        </Badge>
      )
    } else {
      return (
        <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">
          <Clock className="h-3 w-3 mr-1" />
          Pending
        </Badge>
      )
    }
  }


  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const pendingRequests = tokenRequests.filter(r => !r.isApproved).length
  const approvedRequests = tokenRequests.filter(r => r.isApproved).length

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-slate-200 rounded w-1/3"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-24 bg-slate-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div className="flex items-center space-x-2 md:space-x-3">
            <Coins className="h-6 w-6 md:h-8 md:w-8 text-blue-600" />
            <div>
              <h1 className="text-xl md:text-3xl font-bold text-slate-800">Token Requests</h1>
              <p className="text-sm md:text-base text-slate-600">Review and approve tokenization requests</p>
            </div>
          </div>
          <Button onClick={fetchTokenRequests} variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>

      {/* Error Alert */}
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        <Card>
          <CardContent className="p-4 md:p-6">
            <div className="flex items-center space-x-2 md:space-x-3">
              <Coins className="h-6 w-6 md:h-8 md:w-8 text-blue-600" />
              <div>
                <p className="text-xs md:text-sm text-slate-600">Total Requests</p>
                <p className="text-lg md:text-2xl font-bold text-slate-800">{tokenRequests.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 md:p-6">
            <div className="flex items-center space-x-2 md:space-x-3">
              <Clock className="h-6 w-6 md:h-8 md:w-8 text-yellow-600" />
              <div>
                <p className="text-xs md:text-sm text-slate-600">Pending</p>
                <p className="text-lg md:text-2xl font-bold text-slate-800">{pendingRequests}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 md:p-6">
            <div className="flex items-center space-x-2 md:space-x-3">
              <CheckCircle className="h-6 w-6 md:h-8 md:w-8 text-green-600" />
              <div>
                <p className="text-xs md:text-sm text-slate-600">Approved</p>
                <p className="text-lg md:text-2xl font-bold text-slate-800">{approvedRequests}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
        <Input
          placeholder="Search by project, client, or session ID..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Token Requests Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Coins className="h-5 w-5" />
            <span>Token Requests ({filteredRequests.length})</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {filteredRequests.length === 0 ? (
            <div className="py-12 text-center">
              <Coins className="h-12 w-12 text-slate-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-slate-700 mb-2">
                {tokenRequests.length === 0 ? 'No Token Requests' : 'No Requests Found'}
              </h3>
              <p className="text-slate-500">
                {tokenRequests.length === 0 
                  ? 'Token requests will appear here when clients submit them.'
                  : 'No requests match your search criteria.'
                }
              </p>
            </div>
          ) : (
            <>
              {/* Mobile Card View */}
              <div className="block md:hidden divide-y divide-slate-200">
                {filteredRequests.map((request) => (
                  <div key={request.id} className="p-4 space-y-3">
                    <div className="flex items-start justify-between">
                      
                      <div className="ml-2 flex-shrink-0">
                        {getStatusBadge(request.isApproved)}
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      
                      <div>
                        <span className="text-slate-500">Request No </span>
                        <span className="font-medium">#{request.id}</span>
                      </div>
                    </div>

                    {!request.isApproved && (
                      <div className="pt-2">
                        <Button
                          size="sm"
                          onClick={() => handleApproveRequest(request.id)}
                          disabled={processingIds.has(request.id)}
                          className="w-full"
                        >
                          {processingIds.has(request.id) ? (
                            <>
                              <RefreshCw className="h-3 w-3 mr-2 animate-spin" />
                              Approving...
                            </>
                          ) : (
                            <>
                              <CheckCircle className="h-3 w-3 mr-2" />
                              Approve Request
                            </>
                          )}
                        </Button>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Desktop Table View */}
              <div className="hidden md:block overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Request No</TableHead>
                      
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredRequests.map((request) => (
                      <TableRow key={request.id}>
                        <TableCell className="font-medium">#{request.id}</TableCell>
                        
                        <TableCell>{getStatusBadge(request.isApproved)}</TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            {!request.isApproved && (
                              <Button
                                size="sm"
                                onClick={() => handleApproveRequest(request.id)}
                                disabled={processingIds.has(request.id)}
                              >
                                {processingIds.has(request.id) ? (
                                  <RefreshCw className="h-3 w-3 animate-spin" />
                                ) : (
                                  <CheckCircle className="h-3 w-3" />
                                )}
                              </Button>
                            )}
                            
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {/* Results Summary */}
      {filteredRequests.length > 0 && (
        <div className="text-center text-xs md:text-sm text-slate-600">
          Showing {filteredRequests.length} of {tokenRequests.length} token requests
        </div>
      )}
    </div>
  )
}