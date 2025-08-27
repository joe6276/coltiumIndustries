// src/app/(dashboard)/client/payments/success/page.tsx
'use client'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { apiClient } from '@/lib/api-config'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { CheckCircle, Download, ArrowLeft, Loader2, AlertCircle } from 'lucide-react'
import { Alert, AlertDescription } from '@/components/ui/alert'
import Link from 'next/link'
import { toast } from '@/hooks/use-toast'

// Updated interface to match the actual API response
interface PaymentValidationResponse {
  id: number
  stripeSessionUrl: string
  stripeSessionId: string
  paymentIntentId: string
  userId: number
  amount: number
  discount: number | null
  description: string
  name: string
  quantity: number
  projectId: number
}

export default function PaymentSuccessPage() {
  const { user } = useAuth()
  const searchParams = useSearchParams()
  // Get session_id from localStorage (stored during payment initiation)
  const sessionId = localStorage.getItem('sessionId')
  
  const [paymentDetails, setPaymentDetails] = useState<PaymentValidationResponse | null>(null)
  const [isValidating, setIsValidating] = useState(false)
  const [validationError, setValidationError] = useState<string | null>(null)
  const [isValidated, setIsValidated] = useState(false)

  useEffect(() => {
    if (sessionId && !isValidated) {
      validatePayment(sessionId)
    } else if (!sessionId) {
      setValidationError('No session ID found in storage. Please ensure you accessed this page from a valid payment flow.')
    }
  }, [sessionId, isValidated])

  const validatePayment = async (stripeSessionId: string) => {
    try {
      setIsValidating(true)
      setValidationError(null)
      
      console.log('Validating payment with session ID:', stripeSessionId)
      
      // Call the validation API endpoint - now returns full payment object
      const paymentData = await apiClient.validateStripePayment(stripeSessionId)
      
      if (paymentData && paymentData.id) {
        setPaymentDetails(paymentData)
        setIsValidated(true)
        
        toast({
          title: "Payment Validated",
          description: "Your payment has been successfully validated",
        })
      } else {
        throw new Error('Invalid payment data received')
      }
    } catch (error) {
      console.error('Payment validation failed:', error)
      const errorMessage = error instanceof Error ? error.message : 'Failed to validate payment'
      setValidationError(errorMessage)
      
      toast({
        title: "Validation Failed",
        description: errorMessage,
        variant: "destructive",
      })
    } finally {
      setIsValidating(false)
    }
  }

  const formatAmount = (amount: number, discount?: number | null): string => {
    const discountAmount = discount || 0
    const finalAmount = amount - discountAmount
    return `$${finalAmount.toLocaleString()}`
  }

  const formatDate = (): string => {
    return new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  if (isValidating) {
    return (
      <div className="p-6">
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardContent className="p-8 text-center">
              <div className="mb-6">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Loader2 className="h-8 w-8 text-blue-600 animate-spin" />
                </div>
                <h1 className="text-2xl font-bold text-slate-800 mb-2">Validating Payment...</h1>
                <p className="text-slate-600">Please wait while we confirm your payment.</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  if (validationError) {
    return (
      <div className="p-6">
        <div className="max-w-2xl mx-auto">
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{validationError}</AlertDescription>
          </Alert>
          
          <Card>
            <CardContent className="p-8 text-center">
              <div className="mb-6">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <AlertCircle className="h-8 w-8 text-red-600" />
                </div>
                <h1 className="text-2xl font-bold text-slate-800 mb-2">Payment Validation Failed</h1>
                <p className="text-slate-600">We couldn't validate your payment. Please contact support if you were charged.</p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link href="/client/payments">
                  <Button variant="outline">
                    Try Another Payment
                  </Button>
                </Link>
                <Link href="/client/projects">
                  <Button>
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Projects
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6">
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardContent className="p-8 text-center">
            <div className="mb-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <h1 className="text-2xl font-bold text-slate-800 mb-2">Payment Successful!</h1>
              <p className="text-slate-600">Your payment has been processed and validated successfully.</p>
            </div>
            
            {paymentDetails && (
              <div className="bg-slate-50 rounded-lg p-4 mb-6 text-left">
                <h3 className="font-semibold text-slate-800 mb-3">Payment Details</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Amount:</span>
                    <span className="font-medium">{formatAmount(paymentDetails.amount, paymentDetails.discount)}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-slate-500">Quantity:</span>
                    <span className="font-medium">{paymentDetails.quantity}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Description:</span>
                    <span className="font-medium">{paymentDetails.description}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Customer:</span>
                    <span className="font-medium">{paymentDetails.name}</span>
                  </div>                            
              
                  <div className="flex justify-between">
                    <span className="text-slate-500">Date:</span>
                    <span className="font-medium">{formatDate()}</span>
                  </div>
                </div>
              </div>
            )}
            
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              
              <Link href="/client/projects">
                <Button>
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Projects
                </Button>
              </Link>
            </div>
            
            <p className="text-sm text-slate-500 mt-6">
              If you have any questions or need assistance, please contact our support team.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}