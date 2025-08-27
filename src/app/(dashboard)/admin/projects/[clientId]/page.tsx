// src/app/(dashboard)/admin/projects/[clientId]/page.tsx
'use client'
import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { apiClient } from '@/lib/api-config'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { 
  ArrowLeft, 
  DollarSign, 
  CreditCard, 
  Building, 
  User,
  AlertCircle,
  Loader2,
  TrendingUp,
  Receipt,
  Calendar,
  CheckCircle,
  XCircle,
  Clock
} from 'lucide-react'
import { toast } from '@/hooks/use-toast'
import { ClientPaymentHistory } from '@/lib/types/api'

interface ClientInfo {
  id: number
  name: string
  company: string
  email: string
  phone: string
  totalProjects: number
  totalValue: number
  totalPaid: number
  totalUnpaid: number
}

interface Project {
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
  salespersonId: number
  paidPercentage: number
  percentage: number
  pmId: number
  documents: Array<{
    id: number
    documentUrl: string
  }>
}

export default function AdminClientPaymentDetailsPage() {
  const params = useParams()
  const router = useRouter()
  const clientId = parseInt(params.clientId as string)
  
  const [paymentHistory, setPaymentHistory] = useState<ClientPaymentHistory[]>([])
  const [clientInfo, setClientInfo] = useState<ClientInfo | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (clientId && !isNaN(clientId)) {
      fetchClientPaymentData()
      fetchClientInfo()
    } else {
      setError('Invalid client ID')
      setIsLoading(false)
    }
  }, [clientId])

  const fetchClientPaymentData = async () => {
    try {
      const paymentData = await apiClient.getClientPaymentHistory(clientId)
      setPaymentHistory(paymentData)
    } catch (error) {
      console.error('Failed to fetch client payment history:', error)
      setError('Failed to load payment history')
    }
  }

  const fetchClientInfo = async () => {
    try {
      // Since we're in admin, we'll use getAllProjects instead of getSalesProjects
      const allProjects = await apiClient.getAllProjects()
      
      // Find projects for this client
      const clientProjects = allProjects.filter(project => project.clientId === clientId)
      
      if (clientProjects.length > 0) {
        // Get client info from the first project (they should all have the same client info)
        const firstProject = clientProjects[0]
        const clientData = firstProject.client
        
        if (clientData) {
          // Calculate totals based on projects for this client
          const totalValue = clientProjects.reduce((sum, project) => {
            return sum + project.pricing
          }, 0)

          const totalPaid = clientProjects.reduce((sum, project) => {
            const paidAmount = (project.pricing * project.paidPercentage) / 100
            return sum + paidAmount
          }, 0)

          setClientInfo({
            id: clientId,
            name: clientData.clientName,
            company: clientData.company,
            email: clientData.email,
            phone: clientData.phone,
            totalProjects: clientProjects.length,
            totalValue,
            totalPaid,
            totalUnpaid: totalValue - totalPaid
          })
        } else {
          // If client data is null, create a basic client info
          setClientInfo({
            id: clientId,
            name: `Client #${clientId}`,
            company: 'Unknown Company',
            email: 'unknown@email.com',
            phone: 'N/A',
            totalProjects: clientProjects.length,
            totalValue: clientProjects.reduce((sum, project) => sum + project.pricing, 0),
            totalPaid: clientProjects.reduce((sum, project) => {
              const paidAmount = (project.pricing * project.paidPercentage) / 100
              return sum + paidAmount
            }, 0),
            totalUnpaid: 0
          })
          
          // Calculate unpaid amount
          if (clientInfo) {
            setClientInfo(prev => prev ? {
              ...prev,
              totalUnpaid: prev.totalValue - prev.totalPaid
            } : null)
          }
        }
      } else {
        setError('No projects found for this client')
      }
    } catch (error) {
      console.error('Failed to fetch client info:', error)
      setError('Failed to load client information')
    } finally {
      setIsLoading(false)
    }
  }

  const formatCurrency = (amount: number): string => {
    return `$${amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
  }

  const getPaymentMethodIcon = (method: string) => {
    switch (method?.toLowerCase()) {
      case 'stripe':
      case 'credit card':
      case 'card':
        return <CreditCard className="h-4 w-4 text-blue-600" />
      case 'mpesa':
      case 'm-pesa':
        return <Receipt className="h-4 w-4 text-green-600" />
      default:
        return <DollarSign className="h-4 w-4 text-gray-600" />
    }
  }

  const getPaymentMethodColor = (method: string) => {
    switch (method?.toLowerCase()) {
      case 'stripe':
      case 'credit card':
      case 'card':
        return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'mpesa':
      case 'm-pesa':
        return 'bg-green-100 text-green-800 border-green-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="max-w-6xl mx-auto">
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
      </div>
    )
  }

  return (
    <div className="p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <Button 
            onClick={() => router.push('/admin/projects')} 
            variant="outline" 
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to All Projects
          </Button>
          
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-800">
                {clientInfo ? `${clientInfo.name} - Payment Details` : 'Client Payment Details'}
              </h1>
              <p className="text-slate-600 mt-2">
                {clientInfo ? `${clientInfo.company} • ${clientInfo.email}` : 'Loading client information...'}
              </p>
            </div>
            
            {clientInfo && (
              <div className="text-right">
                <div className="text-sm text-slate-600">Client ID</div>
                <div className="text-lg font-semibold text-slate-800">#{clientInfo.id}</div>
              </div>
            )}
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

        {clientInfo && (
          <>
            {/* Client Info Card */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Building className="h-5 w-5" />
                  <span>Client Information</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <User className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium text-slate-800">{clientInfo.name}</p>
                      <p className="text-sm text-slate-600">{clientInfo.company}</p>
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-sm text-slate-600">Contact</p>
                    <p className="font-medium text-slate-800">{clientInfo.email}</p>
                    <p className="text-sm text-slate-600">{clientInfo.phone}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-slate-600">Total Projects</p>
                    <p className="text-2xl font-bold text-blue-600">{clientInfo.totalProjects}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-slate-600">Portfolio Value</p>
                    <p className="text-2xl font-bold text-purple-600">{formatCurrency(clientInfo.totalValue)}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Payment Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-slate-600">Total Paid</p>
                      <p className="text-2xl font-bold text-green-600">{formatCurrency(clientInfo.totalPaid)}</p>
                      <p className="text-xs text-slate-500 mt-1">
                        {clientInfo.totalValue > 0 ? 
                          `${((clientInfo.totalPaid / clientInfo.totalValue) * 100).toFixed(1)}% of total` 
                          : '0% of total'
                        }
                      </p>
                    </div>
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                      <CheckCircle className="h-6 w-6 text-green-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-slate-600">Outstanding</p>
                      <p className="text-2xl font-bold text-red-600">{formatCurrency(clientInfo.totalUnpaid)}</p>
                      <p className="text-xs text-slate-500 mt-1">
                        {clientInfo.totalValue > 0 ? 
                          `${((clientInfo.totalUnpaid / clientInfo.totalValue) * 100).toFixed(1)}% remaining` 
                          : '0% remaining'
                        }
                      </p>
                    </div>
                    <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                      <XCircle className="h-6 w-6 text-red-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-slate-600">Payment Rate</p>
                      <p className="text-2xl font-bold text-blue-600">
                        {clientInfo.totalValue > 0 ? 
                          `${((clientInfo.totalPaid / clientInfo.totalValue) * 100).toFixed(1)}%` 
                          : '0%'
                        }
                      </p>
                      <p className="text-xs text-slate-500 mt-1">
                        {paymentHistory.length} transactions
                      </p>
                    </div>
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <TrendingUp className="h-6 w-6 text-blue-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </>
        )}

        {/* Payment History Table */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Receipt className="h-5 w-5" />
              <span>Payment History</span>
            </CardTitle>
            <CardDescription>
              Detailed payment records for this client
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            {paymentHistory.length > 0 ? (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[300px]">Project</TableHead>
                      <TableHead className="w-[150px]">Amount</TableHead>
                      <TableHead className="w-[150px]">Payment Method</TableHead>
                      <TableHead className="w-[120px]">Date</TableHead>
                      <TableHead className="w-[100px]">Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {paymentHistory.map((payment, index) => (
                      <TableRow key={index} className="hover:bg-slate-50">
                        <TableCell className="py-4">
                          <div>
                            <div className="font-medium text-slate-900">{payment.projectTitle}</div>
                            <div className="text-sm text-slate-500">
                              Payment for project services
                            </div>
                          </div>
                        </TableCell>
                        
                        <TableCell className="py-4">
                          <div className="font-medium text-green-600">
                            {formatCurrency(payment.amount)}
                          </div>
                        </TableCell>
                        
                        <TableCell className="py-4">
                          <div className="flex items-center space-x-2">
                            {getPaymentMethodIcon(payment.paymentMethod)}
                            <Badge className={`${getPaymentMethodColor(payment.paymentMethod)} border text-xs`}>
                              {payment.paymentMethod || 'Unknown'}
                            </Badge>
                          </div>
                        </TableCell>
                        
                        <TableCell className="py-4">
                          <div className="flex items-center space-x-1">
                            <Calendar className="h-3 w-3 text-slate-400" />
                            <span className="text-sm text-slate-600">
                              {new Date().toLocaleDateString()}
                            </span>
                          </div>
                        </TableCell>
                        
                        <TableCell className="py-4">
                          <Badge className="bg-green-100 text-green-800 border-green-200 border text-xs">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Completed
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <div className="py-12 text-center">
                <Receipt className="h-12 w-12 text-slate-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-slate-700 mb-2">No payment history</h3>
                <p className="text-slate-500">
                  {error ? 'Unable to load payment history' : 'This client has no recorded payments yet'}
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Summary Footer */}
        {paymentHistory.length > 0 && (
          <div className="mt-4 text-center text-sm text-slate-600">
            Showing {paymentHistory.length} payment record{paymentHistory.length !== 1 ? 's' : ''}
          </div>
        )}
      </div>
    </div>
  )
}