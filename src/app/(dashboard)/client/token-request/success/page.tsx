// src/app/(dashboard)/client/token-request/success/page.tsx
'use client'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { apiClient } from '@/lib/api-config'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { 
  CheckCircle,
  Clock,
  AlertCircle,
  ArrowRight,
  Loader2
} from 'lucide-react'
import Link from 'next/link'

export default function TokenRequestSuccessPage() {
  const searchParams = useSearchParams()
  const [isValidating, setIsValidating] = useState(true)
  const [validationStatus, setValidationStatus] = useState<'validating' | 'success' | 'failed'>('validating')
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const validatePayment = async () => {
      try {
        // Get session ID from URL params or localStorage
        const sessionIdFromUrl = searchParams.get('session_id')
        const sessionIdFromStorage = localStorage.getItem('tokenSessionId')
        const sessionId = sessionIdFromUrl || sessionIdFromStorage

        if (!sessionId) {
          throw new Error('No payment session found')
        }

        console.log('Validating token payment with session ID:', sessionId)
        
        // Validate the payment
        const isValid = await apiClient.validateTokenPayment(sessionId)
        
        if (isValid) {
          setValidationStatus('success')
          // Clear stored session ID
          localStorage.removeItem('tokenSessionId')
          localStorage.removeItem('tokenProjectId')
        } else {
          setValidationStatus('failed')
          setError('Payment validation failed')
        }
      } catch (error) {
        console.error('Payment validation error:', error)
        setValidationStatus('failed')
        setError(error instanceof Error ? error.message : 'Payment validation failed')
      } finally {
        setIsValidating(false)
      }
    }

    validatePayment()
  }, [searchParams])

  if (isValidating) {
    return (
      <div className="container mx-auto p-4 md:p-6 max-w-2xl">
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-16">
            <Loader2 className="h-12 w-12 animate-spin text-blue-600 mb-4" />
            <h2 className="text-xl font-semibold mb-2">Validating Payment</h2>
            <p className="text-slate-600 text-center">
              Please wait while we confirm your token request payment...
            </p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-4 md:p-6 max-w-2xl space-y-6">
      {validationStatus === 'success' ? (
        <>
          {/* Success Card */}
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-16">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <h1 className="text-2xl md:text-3xl font-bold text-center mb-2">
                Token Request Submitted!
              </h1>
              <p className="text-slate-600 text-center mb-6">
                Your payment has been processed successfully and your tokenization request has been submitted for admin approval.
              </p>
            </CardContent>
          </Card>

          {/* Next Steps */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Clock className="h-5 w-5 text-blue-600" />
                <span>What Happens Next?</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">1</div>
                  <div>
                    <p className="font-medium">Admin Review</p>
                    <p className="text-sm text-slate-600">Our team will review your tokenization request within 1-3 business days.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">2</div>
                  <div>
                    <p className="font-medium">Approval Notification</p>
                    <p className="text-sm text-slate-600">You'll receive an email notification once your request is approved.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">3</div>
                  <div>
                    <p className="font-medium">Asset Valuation</p>
                    <p className="text-sm text-slate-600">Complete the tokenization form to value your digital asset.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">4</div>
                  <div>
                    <p className="font-medium">Marketplace Listing</p>
                    <p className="text-sm text-slate-600">List your tokenized asset on our marketplace for trading.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/client/token-request/status" className="flex-1">
              <Button className="w-full">
                Check Request Status
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/client" className="flex-1">
              <Button variant="outline" className="w-full">
                Back to Dashboard
              </Button>
            </Link>
          </div>
        </>
      ) : (
        <>
          {/* Error Card */}
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-16">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                <AlertCircle className="h-8 w-8 text-red-600" />
              </div>
              <h1 className="text-2xl md:text-3xl font-bold text-center mb-2">
                Payment Validation Failed
              </h1>
              <p className="text-slate-600 text-center mb-6">
                We couldn't validate your payment. Please contact support if you were charged.
              </p>
            </CardContent>
          </Card>

          {/* Error Details */}
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/client/token-request" className="flex-1">
              <Button className="w-full">
                Try Again
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/client/support" className="flex-1">
              <Button variant="outline" className="w-full">
                Contact Support
              </Button>
            </Link>
          </div>
        </>
      )}
    </div>
  )
}