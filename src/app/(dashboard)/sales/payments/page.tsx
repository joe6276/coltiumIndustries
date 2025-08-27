// src/app/(dashboard)/sales/payments/page.tsx
'use client'
import { useEffect, useState } from 'react'
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { 
  DollarSign, 
  TrendingUp, 
  TrendingDown, 
  Calendar, 
  Building, 
  User,
  AlertCircle,
  Loader2,
  RefreshCw,
  Receipt,
  CreditCard,
  PieChart,
  BarChart3,
  CheckCircle,
  Clock,
  Wallet,
  Target,
  Activity,
  Users
} from 'lucide-react'
import { toast } from '@/hooks/use-toast'
import { MetricsSummary, TodayMetrics, ClientPaymentHistory, SalesClient } from '@/lib/types/api'

interface PaymentMetricsData {
  overall: MetricsSummary | null
  today: TodayMetrics | null
  clientHistory: ClientPaymentHistory[]
  selectedClientId: number | null
  clients: SalesClient[]
}

export default function SalesPaymentsPage() {
  const [metricsData, setMetricsData] = useState<PaymentMetricsData>({
    overall: null,
    today: null,
    clientHistory: [],
    selectedClientId: null,
    clients: []
  })
  const [isLoading, setIsLoading] = useState(true)
  const [isLoadingClientHistory, setIsLoadingClientHistory] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [refreshing, setRefreshing] = useState(false)

  useEffect(() => {
    fetchAllMetrics()
  }, [])

  const fetchAllMetrics = async () => {
    try {
      setIsLoading(true)
      setError(null)

      // Fetch all metrics data in parallel
      const [overallMetrics, todayMetrics, clientsData] = await Promise.all([
        apiClient.getMetrics(),
        apiClient.getTodayMetrics(),
        apiClient.getSalesClients()
      ])

      setMetricsData(prev => ({
        ...prev,
        overall: overallMetrics,
        today: todayMetrics,
        clients: clientsData
      }))
    } catch (error) {
      console.error('Failed to fetch metrics:', error)
      setError('Failed to load payment metrics')
      toast({
        title: "Error",
        description: "Failed to load payment metrics",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const fetchClientPaymentHistory = async (clientId: number) => {
    if (!clientId) return

    try {
      setIsLoadingClientHistory(true)
      const clientHistory = await apiClient.getClientPaymentHistory(clientId)
      
      setMetricsData(prev => ({
        ...prev,
        clientHistory,
        selectedClientId: clientId
      }))
    } catch (error) {
      console.error('Failed to fetch client payment history:', error)
      toast({
        title: "Error",
        description: "Failed to load client payment history",
        variant: "destructive",
      })
    } finally {
      setIsLoadingClientHistory(false)
    }
  }

  const handleRefresh = async () => {
    setRefreshing(true)
    await fetchAllMetrics()
    if (metricsData.selectedClientId) {
      await fetchClientPaymentHistory(metricsData.selectedClientId)
    }
    setRefreshing(false)
    toast({
      title: "Refreshed",
      description: "Payment metrics have been updated",
    })
  }

  const formatCurrency = (amount: number): string => {
    return `$${amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
  }

  const formatPercentage = (percentage: number): string => {
    return `${percentage.toFixed(1)}%`
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
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-slate-200 rounded w-1/3"></div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[...Array(8)].map((_, i) => (
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
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-slate-800">Payment Analytics</h1>
            <p className="text-slate-600 mt-2">Track payments, revenue, and client metrics</p>
          </div>
          <Button 
            onClick={handleRefresh} 
            variant="outline" 
            size="sm"
            disabled={refreshing}
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
            Refresh Data
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
                  onClick={fetchAllMetrics}
                  className="ml-2 text-sm underline hover:no-underline"
                >
                  Try Again
                </button>
              </AlertDescription>
            </Alert>
          </div>
        )}

        {/* Overall Metrics Cards */}
        {metricsData.overall && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-600">Total Revenue</p>
                    <p className="text-2xl font-bold text-blue-600">
                      {formatCurrency(metricsData.overall.totalAmount)}
                    </p>
                    <p className="text-xs text-slate-500 mt-1">All time</p>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <DollarSign className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-600">Total Paid</p>
                    <p className="text-2xl font-bold text-green-600">
                      {formatCurrency(metricsData.overall.totalPaid)}
                    </p>
                    <p className="text-xs text-slate-500 mt-1">
                      {formatPercentage((metricsData.overall.totalPaid / metricsData.overall.totalAmount) * 100)} of total
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
                    <p className="text-2xl font-bold text-red-600">
                      {formatCurrency(metricsData.overall.totalUnpaid)}
                    </p>
                    <p className="text-xs text-slate-500 mt-1">
                      {formatPercentage((metricsData.overall.totalUnpaid / metricsData.overall.totalAmount) * 100)} remaining
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                    <Clock className="h-6 w-6 text-red-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-600">Avg. Payment Rate</p>
                    <p className="text-2xl font-bold text-purple-600">
                      {formatPercentage(metricsData.overall.averagePaidPercentage)}
                    </p>
                    <p className="text-xs text-slate-500 mt-1">Across all projects</p>
                  </div>
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                    <Target className="h-6 w-6 text-purple-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Today's Metrics */}
        {metricsData.today && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="h-5 w-5" />
                <span>Today's Performance</span>
              </CardTitle>
              <CardDescription>
                Current day metrics and activity
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                <div className="text-center">
                  <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mx-auto mb-2">
                    <Activity className="h-6 w-6 text-blue-600" />
                  </div>
                  <p className="text-2xl font-bold text-blue-600">{metricsData.today.totalProjects}</p>
                  <p className="text-sm text-slate-600">Projects Today</p>
                </div>

                <div className="text-center">
                  <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mx-auto mb-2">
                    <DollarSign className="h-6 w-6 text-green-600" />
                  </div>
                  <p className="text-2xl font-bold text-green-600">
                    {formatCurrency(metricsData.today.totalAmount)}
                  </p>
                  <p className="text-sm text-slate-600">Revenue Today</p>
                </div>

                <div className="text-center">
                  <div className="flex items-center justify-center w-12 h-12 bg-emerald-100 rounded-full mx-auto mb-2">
                    <CheckCircle className="h-6 w-6 text-emerald-600" />
                  </div>
                  <p className="text-2xl font-bold text-emerald-600">
                    {formatCurrency(metricsData.today.totalPaid)}
                  </p>
                  <p className="text-sm text-slate-600">Paid Today</p>
                </div>

                <div className="text-center">
                  <div className="flex items-center justify-center w-12 h-12 bg-red-100 rounded-full mx-auto mb-2">
                    <Clock className="h-6 w-6 text-red-600" />
                  </div>
                  <p className="text-2xl font-bold text-red-600">
                    {formatCurrency(metricsData.today.totalUnpaid)}
                  </p>
                  <p className="text-sm text-slate-600">Unpaid Today</p>
                </div>

                <div className="text-center">
                  <div className="flex items-center justify-center w-12 h-12 bg-purple-100 rounded-full mx-auto mb-2">
                    <TrendingUp className="h-6 w-6 text-purple-600" />
                  </div>
                  <p className="text-2xl font-bold text-purple-600">
                    {formatPercentage(metricsData.today.averagePaidPercentage)}
                  </p>
                  <p className="text-sm text-slate-600">Payment Rate</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Client Payment History Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Users className="h-5 w-5" />
              <span>Client Payment History</span>
            </CardTitle>
            <CardDescription>
              Select a client to view their detailed payment history
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* Client Selection */}
            <div className="mb-6">
              <div className="flex items-center space-x-4">
                <div className="flex-1 max-w-xs">
                  <Select
                    value={metricsData.selectedClientId?.toString() || ''}
                    onValueChange={(value) => {
                      const clientId = parseInt(value)
                      if (!isNaN(clientId)) {
                        fetchClientPaymentHistory(clientId)
                      }
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a client" />
                    </SelectTrigger>
                    <SelectContent>
                      {metricsData.clients.map((client) => (
                        <SelectItem key={client.id} value={client.id.toString()}>
                          {client.email} (ID: {client.id})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                {isLoadingClientHistory && (
                  <div className="flex items-center space-x-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span className="text-sm text-slate-600">Loading payment history...</span>
                  </div>
                )}
              </div>
            </div>

            {/* Client Payment History Table */}
            {metricsData.selectedClientId && (
              <div className="overflow-x-auto">
                {metricsData.clientHistory.length > 0 ? (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[300px]">Project</TableHead>
                        <TableHead className="w-[150px]">Amount</TableHead>
                        <TableHead className="w-[150px]">Payment Method</TableHead>
                        <TableHead className="w-[120px]">Status</TableHead>
                        <TableHead className="w-[120px]">Date</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {metricsData.clientHistory.map((payment, index) => (
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
                            <Badge className="bg-green-100 text-green-800 border-green-200 border text-xs">
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Completed
                            </Badge>
                          </TableCell>
                          
                          <TableCell className="py-4">
                            <div className="flex items-center space-x-1">
                              <Calendar className="h-3 w-3 text-slate-400" />
                              <span className="text-sm text-slate-600">
                                {new Date().toLocaleDateString()}
                              </span>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                ) : (
                  <div className="py-12 text-center">
                    <Receipt className="h-12 w-12 text-slate-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-slate-700 mb-2">No payment history</h3>
                    <p className="text-slate-500">
                      This client has no recorded payments yet
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* No Client Selected State */}
            {!metricsData.selectedClientId && (
              <div className="py-12 text-center border-2 border-dashed border-slate-200 rounded-lg">
                <Users className="h-12 w-12 text-slate-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-slate-700 mb-2">Select a client to view payments</h3>
                <p className="text-slate-500">
                  Choose a client from the dropdown above to see their payment history
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Summary Statistics */}
        {metricsData.overall && metricsData.today && (
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BarChart3 className="h-5 w-5" />
                  <span>Payment Efficiency</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Overall Collection Rate</span>
                      <span className="font-medium">
                        {formatPercentage((metricsData.overall.totalPaid / metricsData.overall.totalAmount) * 100)}
                      </span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div 
                        className="bg-green-500 h-2 rounded-full transition-all"
                        style={{ 
                          width: `${(metricsData.overall.totalPaid / metricsData.overall.totalAmount) * 100}%` 
                        }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Today's Collection Rate</span>
                      <span className="font-medium">
                        {metricsData.today.totalAmount > 0 
                          ? formatPercentage((metricsData.today.totalPaid / metricsData.today.totalAmount) * 100)
                          : '0.0%'
                        }
                      </span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div 
                        className="bg-blue-500 h-2 rounded-full transition-all"
                        style={{ 
                          width: `${metricsData.today.totalAmount > 0 
                            ? (metricsData.today.totalPaid / metricsData.today.totalAmount) * 100 
                            : 0}%` 
                        }}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <PieChart className="h-5 w-5" />
                  <span>Revenue Breakdown</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="text-sm">Collected</span>
                    </div>
                    <span className="font-medium">{formatCurrency(metricsData.overall.totalPaid)}</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <span className="text-sm">Outstanding</span>
                    </div>
                    <span className="font-medium">{formatCurrency(metricsData.overall.totalUnpaid)}</span>
                  </div>
                  
                  <div className="pt-2 border-t">
                    <div className="flex justify-between items-center font-semibold">
                      <span>Total Revenue</span>
                      <span>{formatCurrency(metricsData.overall.totalAmount)}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Footer Stats */}
        {metricsData.clientHistory.length > 0 && (
          <div className="mt-6 text-center text-sm text-slate-600">
            Showing {metricsData.clientHistory.length} payment record{metricsData.clientHistory.length !== 1 ? 's' : ''} for selected client
          </div>
        )}
      </div>
    </div>
  )
}