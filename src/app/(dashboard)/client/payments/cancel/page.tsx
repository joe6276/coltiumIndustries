// src/app/(dashboard)/client/payments/cancel/page.tsx
'use client'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { XCircle, ArrowLeft, CreditCard } from 'lucide-react'
import Link from 'next/link'

export default function PaymentCancelPage() {
  return (
    <div className="p-6">
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardContent className="p-8 text-center">
            <div className="mb-6">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <XCircle className="h-8 w-8 text-red-600" />
              </div>
              <h1 className="text-2xl font-bold text-slate-800 mb-2">Payment Cancelled</h1>
              <p className="text-slate-600">Your payment was cancelled and no charges were made.</p>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
              <p className="text-amber-800 text-sm">
                If you cancelled by mistake, you can try again by clicking the button below.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/client/payments">
                <Button>
                  <CreditCard className="mr-2 h-4 w-4" />
                  Try Payment Again
                </Button>
              </Link>
              <Link href="/client/projects">
                <Button variant="outline">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Projects
                </Button>
              </Link>
            </div>

            <p className="text-sm text-slate-500 mt-6">
              Need help? <Link href="/client/support" className="text-blue-600 hover:text-blue-800">Contact our support team</Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
