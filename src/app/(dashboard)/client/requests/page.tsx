// src/app/(dashboard)/client/requests/page.tsx - View submitted requests
'use client'
import { useEffect, useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { apiClient } from '@/lib/api-config'
import { ClientRequestedPayment } from '@/lib/types/client'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { DollarSign, Clock, CheckCircle, Send } from 'lucide-react'
import Link from 'next/link'

export default function ClientRequestsPage() {
  const { user } = useAuth()
  const [requests, setRequests] = useState<ClientRequestedPayment[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (user?.id) {
      fetchRequests()
    }
  }, [user])

  const fetchRequests = async () => {
    try {
      setIsLoading(true)
      const requestsData = await apiClient.getClientRequests(user!.id)
      setRequests(requestsData)
      setError(null)
    } catch (error) {
      console.error('Failed to fetch requests:', error)
      setError('Failed to load requests')
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-slate-200 rounded w-1/3"></div>
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-24 bg-slate-200 rounded"></div>
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
          <h1 className="text-3xl font-bold text-slate-800">My Project Requests</h1>
          <p className="text-slate-600 mt-2">Track your submitted project requests</p>
        </div>
        <Link href="">
          <Button>
            <Send className="mr-2 h-4 w-4" />
            New Request
          </Button>
        </Link>
      </div>

      {/* Error Alert */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-800">{error}</p>
          <button 
            onClick={fetchRequests}
            className="mt-2 text-sm text-red-600 hover:text-red-800 underline"
          >
            Try Again
          </button>
        </div>
      )}

      {/* Requests List */}
      <div className="space-y-4">
        {requests.length > 0 ? (
          requests.map((request) => (
            <Card key={request.id}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Send className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-800">
                        Project Request #{request.id}
                      </h4>
                      <div className="flex items-center space-x-3 mt-1">
                        <div className="flex items-center space-x-1">
                          <DollarSign className="h-4 w-4 text-green-600" />
                          <span className="text-sm text-green-600 font-medium">
                            ${request.amount.toLocaleString()}
                          </span>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          <Clock className="h-3 w-3 mr-1" />
                          Under Review
                        </Badge>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <p className="text-sm text-slate-500">Submitted</p>
                    <p className="text-sm font-medium">Recently</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <Card>
            <CardContent className="py-12">
              <div className="text-center">
                <Send className="h-12 w-12 text-slate-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-slate-700 mb-2">No requests yet</h3>
                <p className="text-slate-500 mb-4">
                  Submit your first project request to get started.
                </p>
                <Link href="">
                  <Button>
                    <Send className="mr-2 h-4 w-4" />
                    Submit Request
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}