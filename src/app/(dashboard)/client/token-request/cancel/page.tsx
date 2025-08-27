// src/app/(dashboard)/client/token-request/cancel/page.tsx
'use client'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { 
  XCircle,
  AlertTriangle,
  ArrowRight,
  RotateCcw,
  HelpCircle,
  Clock,
  CreditCard,
  Shield
} from 'lucide-react'
import Link from 'next/link'

export default function TokenRequestCancelPage() {
  const searchParams = useSearchParams()
  const [sessionInfo, setSessionInfo] = useState<{
    sessionId: string | null
    projectId: string | null
  }>({
    sessionId: null,
    projectId: null
  })

  useEffect(() => {
    // Get session info from URL params or localStorage
    const sessionIdFromUrl = searchParams.get('session_id')
    const sessionIdFromStorage = localStorage.getItem('tokenSessionId')
    const projectIdFromStorage = localStorage.getItem('tokenProjectId')
    
    setSessionInfo({
      sessionId: sessionIdFromUrl || sessionIdFromStorage,
      projectId: projectIdFromStorage
    })

    // Clear stored session data since payment was cancelled
    localStorage.removeItem('tokenSessionId')
    localStorage.removeItem('tokenProjectId')
  }, [searchParams])

  return (
    <div className="container mx-auto p-4 md:p-6 max-w-2xl space-y-6">
      {/* Cancel Card */}
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-16">
          <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-4">
            <XCircle className="h-8 w-8 text-orange-600" />
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-center mb-2">
            Payment Cancelled
          </h1>
          <p className="text-slate-600 text-center mb-6">
            Your tokenization request payment was cancelled. No charges have been made to your account.
          </p>
        </CardContent>
      </Card>

      {/* Session Info */}
      {sessionInfo.sessionId && (
        <Alert>
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            <div className="space-y-1">
              <p>Payment session was cancelled:</p>
              <p className="font-mono text-xs bg-slate-100 px-2 py-1 rounded inline-block">
                {sessionInfo.sessionId.substring(0, 30)}...
              </p>
              {sessionInfo.projectId && (
                <p className="text-sm">Project ID: {sessionInfo.projectId}</p>
              )}
            </div>
          </AlertDescription>
        </Alert>
      )}

      {/* What Happened */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <AlertTriangle className="h-5 w-5 text-orange-600" />
            <span>What Happened?</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">!</div>
              <div>
                <p className="font-medium">Payment Process Cancelled</p>
                <p className="text-sm text-slate-600">You cancelled the payment process before completing the $99 tokenization fee.</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">✓</div>
              <div>
                <p className="font-medium">No Charges Made</p>
                <p className="text-sm text-slate-600">Your payment method was not charged. No tokenization request was submitted.</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">i</div>
              <div>
                <p className="font-medium">Project Selection Saved</p>
                <p className="text-sm text-slate-600">Your project selection is still available when you're ready to try again.</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Next Steps */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <RotateCcw className="h-5 w-5 text-blue-600" />
            <span>Ready to Try Again?</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-slate-600">
            You can restart the tokenization request process anytime. Here's what you'll need to do:
          </p>
          <div className="space-y-3">
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">1</div>
              <div>
                <p className="font-medium">Select Your Project</p>
                <p className="text-sm text-slate-600">Choose the digital asset project you want to tokenize.</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">2</div>
              <div>
                <p className="font-medium">Complete Payment</p>
                <p className="text-sm text-slate-600">Pay the $99 tokenization fee securely through Stripe.</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">3</div>
              <div>
                <p className="font-medium">Wait for Approval</p>
                <p className="text-sm text-slate-600">Our admin team will review and approve your request within 1-3 business days.</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Link href="/client/token-request" className="flex-1">
          <Button className="w-full">
            <RotateCcw className="mr-2 h-4 w-4" />
            Try Again
          </Button>
        </Link>
        <Link href="/client" className="flex-1">
          <Button variant="outline" className="w-full">
            Back to Dashboard
          </Button>
        </Link>
      </div>

      {/* Help Section */}
      <Card className="border-blue-200 bg-blue-50">
        <CardContent className="pt-6">
          <div className="flex items-start space-x-3">
            <HelpCircle className="h-6 w-6 text-blue-600 mt-1 flex-shrink-0" />
            <div className="flex-1">
              <h3 className="font-semibold text-blue-900 mb-2">Need Help?</h3>
              <p className="text-blue-800 text-sm mb-3">
                If you encountered any issues during the payment process or have questions about tokenization:
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
               
                <Link href="/client/token-request/status">
                  <Button variant="outline" size="sm" className="border-blue-300 text-blue-700 hover:bg-blue-100">
                    <Clock className="mr-2 h-4 w-4" />
                    View Request Status
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Security Notice */}
      <Card className="border-green-200 bg-green-50">
        <CardContent className="pt-6">
          <div className="flex items-start space-x-3">
            <Shield className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-green-900 mb-2">Payment Security</h3>
              <p className="text-green-800 text-sm">
                All payments are processed securely through Stripe. Your payment information is encrypted 
                and never stored on our servers. You can safely retry the payment process at any time.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* FAQ */}
      <Card>
        <CardHeader>
          <CardTitle>Frequently Asked Questions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h4 className="font-medium text-slate-900 mb-1">Why was I charged if I cancelled?</h4>
              <p className="text-sm text-slate-600">
                You were not charged. Stripe only processes payments after successful completion. 
                Cancelled payments result in no charges to your account.
              </p>
            </div>
            <div>
              <h4 className="font-medium text-slate-900 mb-1">Can I use a different payment method?</h4>
              <p className="text-sm text-slate-600">
                Yes, when you retry the tokenization request, you can choose any payment method 
                accepted by Stripe (credit cards, debit cards, etc.).
              </p>
            </div>
            <div>
              <h4 className="font-medium text-slate-900 mb-1">How long is my project selection valid?</h4>
              <p className="text-sm text-slate-600">
                Your project remains available for tokenization indefinitely. You can request 
                tokenization for any of your projects at any time.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}