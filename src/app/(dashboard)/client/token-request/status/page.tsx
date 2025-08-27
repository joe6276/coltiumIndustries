// src/app/(dashboard)/client/token-request/status/page.tsx - Updated to use correct clientId
'use client'
import { useEffect, useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { apiClient } from '@/lib/api-config'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Input } from '@/components/ui/input'
import { 
  Coins,
  CheckCircle,
  Clock,
  AlertCircle,
  Search,
  RefreshCw,
  Zap,
  ArrowRight,
  CreditCard,
  Play
} from 'lucide-react'
import { TokenRequest } from '@/lib/types/api'
import Link from 'next/link'

export default function ClientTokenRequestStatusPage() {
  const { user, getClientId } = useAuth()
  const [tokenRequests, setTokenRequests] = useState<TokenRequest[]>([])
  const [filteredRequests, setFilteredRequests] = useState<TokenRequest[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    const clientId = getClientId()
    if (clientId) {
      fetchClientTokenRequests(clientId)
    }
  }, [user])

  useEffect(() => {
    filterRequests()
  }, [tokenRequests, searchTerm])

  const fetchClientTokenRequests = async (clientId: number) => {
    try {
      setIsLoading(true)
      console.log('Fetching token requests for clientId:', clientId) // Debug log
      
      // Use the client-specific endpoint with the correct clientId
      const clientRequests = await apiClient.getClientTokenRequests(clientId)
      
      console.log('Received token requests:', clientRequests) // Debug log
      setTokenRequests(clientRequests)
      setError(null)
    } catch (error) {
      console.error('Failed to fetch client token requests:', error)
      setError('Failed to load your token requests')
    } finally {
      setIsLoading(false)
    }
  }

  const filterRequests = () => {
    let filtered = tokenRequests

    if (searchTerm) {
      filtered = filtered.filter(request =>
        request.project?.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        request.id.toString().includes(searchTerm) ||
        request.projectId.toString().includes(searchTerm)
      )
    }

    // Sort by ID descending (newest first)
    filtered.sort((a, b) => b.id - a.id)
    setFilteredRequests(filtered)
  }

  const getStatusInfo = (request: TokenRequest) => {
    // Check payment status first
    const hasPayment = Boolean(request.paymentIntentId)
    
    if (!hasPayment) {
      return {
        status: 'Payment Required',
        color: 'bg-red-100 text-red-800 border-red-200',
        icon: CreditCard,
        description: 'Payment verification needed',
        actionText: 'Complete Payment',
        canProceed: false
      }
    }
    
    if (!request.isApproved) {
      return {
        status: 'Pending Approval',
        color: 'bg-yellow-100 text-yellow-800 border-yellow-200',
        icon: Clock,
        description: 'Awaiting admin review',
        actionText: 'Waiting for Admin',
        canProceed: false
      }
    }
    
    return {
      status: 'Ready to Tokenize',
      color: 'bg-green-100 text-green-800 border-green-200',
      icon: CheckCircle,
      description: 'Approved and ready',
      actionText: 'Start Tokenization',
      canProceed: true
    }
  }

  const getProgressPercentage = (request: TokenRequest) => {
    const hasPayment = Boolean(request.paymentIntentId)
    
    if (!hasPayment) return 25
    if (!request.isApproved) return 50
    return 100
  }

  const handleRefresh = () => {
    const clientId = getClientId()
    if (clientId) {
      fetchClientTokenRequests(clientId)
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount)
  }

  const pendingRequests = tokenRequests.filter(r => !r.isApproved && r.paymentIntentId).length
  const approvedRequests = tokenRequests.filter(r => r.isApproved).length
  const paymentRequiredRequests = tokenRequests.filter(r => !r.paymentIntentId).length

  if (isLoading) {
    return (
      <div className="container mx-auto p-4 md:p-6 max-w-4xl">
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
    <div className="container mx-auto p-4 md:p-6 max-w-4xl space-y-6">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div className="flex items-center space-x-2 md:space-x-3">
            <Coins className="h-6 w-6 md:h-8 md:w-8 text-blue-600" />
            <div>
              <h1 className="text-xl md:text-3xl font-bold text-slate-800">My Token Requests</h1>
              <p className="text-sm md:text-base text-slate-600">
                Track your tokenization requests and progress
              </p>
            </div>
          </div>
          <div className="flex space-x-2">
            <Link href="/client/token-request">
              <Button variant="outline" size="sm">
                <Coins className="h-4 w-4 mr-2" />
                New Request
              </Button>
            </Link>
            <Button onClick={handleRefresh} variant="outline" size="sm">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
          </div>
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
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6">
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
              <CreditCard className="h-6 w-6 md:h-8 md:w-8 text-red-600" />
              <div>
                <p className="text-xs md:text-sm text-slate-600">Payment Required</p>
                <p className="text-lg md:text-2xl font-bold text-slate-800">{paymentRequiredRequests}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 md:p-6">
            <div className="flex items-center space-x-2 md:space-x-3">
              <Clock className="h-6 w-6 md:h-8 md:w-8 text-yellow-600" />
              <div>
                <p className="text-xs md:text-sm text-slate-600">Pending Approval</p>
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
                <p className="text-xs md:text-sm text-slate-600">Ready to Tokenize</p>
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
          placeholder="Search by project name or request ID..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Token Requests List */}
      <div className="space-y-4">
        {filteredRequests.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <Coins className="h-12 w-12 text-slate-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-slate-700 mb-2">
                {tokenRequests.length === 0 ? 'No Token Requests Yet' : 'No Requests Found'}
              </h3>
              <p className="text-slate-500 mb-4">
                {tokenRequests.length === 0 
                  ? 'Submit your first tokenization request to get started.'
                  : 'No requests match your search criteria.'
                }
              </p>
              {tokenRequests.length === 0 && (
                <Link href="/client/token-request">
                  <Button>
                    <Coins className="h-4 w-4 mr-2" />
                    Create Token Request
                  </Button>
                </Link>
              )}
            </CardContent>
          </Card>
        ) : (
          filteredRequests.map((request) => {
            const statusInfo = getStatusInfo(request)
            const progress = getProgressPercentage(request)
            
            return (
              <Card key={request.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4 md:p-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3">
                        <h3 className="font-semibold text-slate-900 truncate mb-2 sm:mb-0">
                          Project No: {request.projectId}
                        </h3>
                        <Badge className={statusInfo.color}>
                          <statusInfo.icon className="h-3 w-3 mr-1" />
                          {statusInfo.status}
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm text-slate-600 mb-4">
                        <div>
                          <span className="font-medium">Request No: </span>
                          #{request.id}
                        </div>
                        <div>
                          <span className="font-medium">Payment: </span>
                          {request.paymentIntentId ? (
                            <span className="text-green-600">Completed</span>
                          ) : (
                            <span className="text-red-600">Required</span>
                          )}
                        </div>
                        
                      </div>

                      {/* Progress Bar */}
                      <div className="mb-4">
                        <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                          <span>Progress</span>
                          <span>{progress}%</span>
                        </div>
                        <div className="w-full bg-slate-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full transition-all duration-300 ${
                              progress === 100 ? 'bg-green-600' : 
                              progress >= 50 ? 'bg-yellow-600' : 'bg-red-600'
                            }`}
                            style={{ width: `${progress}%` }}
                          />
                        </div>
                        <div className="flex justify-between mt-2 text-xs">
                          <div className="flex items-center space-x-1">
                            <div className={`w-2 h-2 rounded-full ${
                              progress >= 25 ? 'bg-green-500' : 'bg-slate-300'
                            }`} />
                            <span className={progress >= 25 ? 'text-green-600' : 'text-slate-400'}>
                              Request Created
                            </span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <div className={`w-2 h-2 rounded-full ${
                              progress >= 50 ? 'bg-green-500' : 'bg-slate-300'
                            }`} />
                            <span className={progress >= 50 ? 'text-green-600' : 'text-slate-400'}>
                              Payment Complete
                            </span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <div className={`w-2 h-2 rounded-full ${
                              progress >= 100 ? 'bg-green-500' : 'bg-slate-300'
                            }`} />
                            <span className={progress >= 100 ? 'text-green-600' : 'text-slate-400'}>
                              Approved
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col space-y-2 sm:ml-4">
                      {statusInfo.canProceed ? (
                        <Link href={`/client/tokenization/${request.id}`}>
                          <Button className="w-full sm:w-auto">
                            <Zap className="h-4 w-4 mr-2" />
                            {statusInfo.actionText}
                            <ArrowRight className="h-4 w-4 ml-2" />
                          </Button>
                        </Link>
                      ) : !request.paymentIntentId ? (
                        <div className="text-center sm:text-right">
                          <p className="text-sm text-red-600 mb-1">Payment verification required</p>
                          <p className="text-xs text-slate-400">Complete payment to proceed</p>
                        </div>
                      ) : (
                        <div className="text-center sm:text-right">
                          <p className="text-sm text-yellow-600 mb-1">{statusInfo.description}</p>
                          <p className="text-xs text-slate-400">Usually takes 1-3 business days</p>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })
        )}
      </div>

      {/* Results Summary */}
      {filteredRequests.length > 0 && (
        <div className="text-center text-xs md:text-sm text-slate-600">
          Showing {filteredRequests.length} of {tokenRequests.length} token requests
          {searchTerm && ` matching "${searchTerm}"`}
        </div>
      )}
    </div>
  )
}