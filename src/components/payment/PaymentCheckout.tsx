//src/components/payment/PaymentCheckout.tsx
"use client"

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { CreditCard, ArrowLeft, Loader2, DollarSign, FileText, Shield, CheckCircle, Smartphone, Phone } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useAuth } from '@/contexts/AuthContext'
import { api } from '@/lib/api'

interface PaymentCheckoutProps {
  projectData: any
  onSuccess: () => void
  onCancel: () => void
}

type PaymentMethod = 'stripe' | 'mpesa'

const PaymentCheckout: React.FC<PaymentCheckoutProps> = ({ 
  projectData, 
  onSuccess, 
  onCancel 
}) => {
  const { user } = useAuth()
  const [loading, setLoading] = useState(false)
  const [selectedPayment, setSelectedPayment] = useState<PaymentMethod>('stripe')
  const [mpesaPhone, setMpesaPhone] = useState('')
  const [mpesaError, setMpesaError] = useState('')

  // Calculate estimated price based on project type
  const getEstimatedPrice = (projectType: string): number => {
    const basePrices: { [key: string]: number } = {
      'Hardware Design': 5000,
      'Embedded Systems': 8000,
      'Software Development': 6000,
      'AI/ML Integration': 10000,
      'Web/Mobile App': 4000,
      'IoT Product': 12000,
      'Electronics R&D': 15000,
      'Custom Tooling': 7000
    }
    return basePrices[projectType] || 5000
  }

  const estimatedPrice = getEstimatedPrice(projectData?.projectType || '')

  // Convert USD to KES (approximate rate - you might want to get real-time rates)
  const usdToKes = (usd: number): number => {
    const exchangeRate = 150 // Approximate USD to KES rate
    return Math.round(usd * exchangeRate)
  }

  const kesAmount = usdToKes(estimatedPrice)

  // Validate Kenyan phone number
  const validateKenyanPhone = (phone: string): boolean => {
    // Remove any spaces, dashes, or plus signs
    const cleanPhone = phone.replace(/[\s\-\+]/g, '')
    
    // Check if it's a valid Kenyan phone number
    // Formats: 254XXXXXXXXX, 07XXXXXXXX, 01XXXXXXXX
    const kenyanPhoneRegex = /^(254[17][0-9]{8}|0[17][0-9]{8})$/
    return kenyanPhoneRegex.test(cleanPhone)
  }

  // Format phone number to 254 format
  const formatPhoneNumber = (phone: string): string => {
    const cleanPhone = phone.replace(/[\s\-\+]/g, '')
    
    if (cleanPhone.startsWith('254')) {
      return cleanPhone
    } else if (cleanPhone.startsWith('0')) {
      return '254' + cleanPhone.substring(1)
    } else if (cleanPhone.startsWith('7') || cleanPhone.startsWith('1')) {
      return '254' + cleanPhone
    }
    
    return cleanPhone
  }

  const handleStripePayment = async () => {
    if (!user?.token || !projectData?.projectId) {
      alert('Missing required data for payment')
      return
    }

    setLoading(true)
    
    try {
      // Create payment via API - ensure all fields match the API schema exactly
      const paymentData = {
        stripeSessionUrl: "",
        stripeSessionId: "",
        approvedUrl: `${window.location.origin}/payment-dashboard/success`,
        cancelUrl: `${window.location.origin}/payment-dashboard`,
        description: `Custom Project: ${projectData.title}`,
        userId: parseInt(user.id.toString()), // Ensure it's a number
        name: projectData.title || "Custom Project",
        amount: parseInt(estimatedPrice.toString()), // Ensure it's an integer
        project: parseInt(projectData.projectId.toString()) // Ensure it's a number
      }


      const response = await api.createPayment(paymentData, user.token)
      
      if (response.stripeSessionUrl) {
        // Redirect to Stripe checkout
        window.location.href = response.stripeSessionUrl
      } else {
        // For development/testing - simulate successful payment
        setTimeout(() => {
          setLoading(false)
          onSuccess()
        }, 2000)
      }
    } catch (error) {
      console.error('Payment error:', error)
      alert('Payment failed. Please try again.')
      setLoading(false)
    }
  }

  const handleMpesaPayment = async () => {
    if (!user?.token || !projectData?.projectId) {
      alert('Missing required data for payment')
      return
    }

    // Validate phone number
    if (!validateKenyanPhone(mpesaPhone)) {
      setMpesaError('Please enter a valid Kenyan phone number (e.g., 0712345678 or 254712345678)')
      return
    }

    setMpesaError('')
    setLoading(true)
    
    try {
      const formattedPhone = formatPhoneNumber(mpesaPhone)
      
      // Initiate M-Pesa payment
      const mpesaResponse = await api.initiateMPesaPayment(
        formattedPhone, 
        kesAmount.toString()
      )
      
      
      // Optionally create a payment record in your main system
      const paymentData = {
        stripeSessionUrl: "",
        stripeSessionId: "",
        approvedUrl: `${window.location.origin}/payment-dashboard/success`,
        cancelUrl: `${window.location.origin}/payment-dashboard`,
        description: `Custom Project: ${projectData.title} (M-Pesa)`,
        userId: parseInt(user.id.toString()), // Ensure it's a number
        name: `${projectData.title} - M-Pesa`,
        amount: parseInt(estimatedPrice.toString()), // Ensure it's an integer
        project: parseInt(projectData.projectId.toString()) // Ensure it's a number
      }


      await api.createMPesaPayment(paymentData, user.token)
      
      // Show success message and instructions
      alert(`M-Pesa payment initiated successfully! 
      
Please check your phone (${formattedPhone}) for the M-Pesa prompt.
Amount: KES ${kesAmount.toLocaleString()}

Complete the payment on your phone to proceed.`)
      
      // For now, simulate success after a delay
      // In production, you'd want to implement payment status checking
      setTimeout(() => {
        setLoading(false)
        onSuccess()
      }, 3000)
      
    } catch (error: any) {
      console.error('M-Pesa payment error:', error)
      alert(`M-Pesa payment failed: ${error.message}`)
      setLoading(false)
    }
  }

  const handlePayment = () => {
    if (selectedPayment === 'stripe') {
      handleStripePayment()
    } else {
      handleMpesaPayment()
    }
  }

  return (
    <div className="max-w-5xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="bg-primary text-white p-6">
          <h2 className="text-2xl font-bold">Secure Project Payment</h2>
          <p className="text-blue-100 mt-2">Complete payment to initiate your custom project</p>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Project Summary */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <FileText className="h-5 w-5 mr-2" />
                Project Summary
              </h3>
              
              <div className="space-y-4">
                <div>
                  <span className="text-sm text-gray-600">Project Title</span>
                  <div className="font-medium text-gray-900">{projectData?.title}</div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-sm text-gray-600">Type</span>
                    <div className="font-medium text-gray-900">{projectData?.projectType}</div>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Timeline</span>
                    <div className="font-medium text-gray-900">{projectData?.timeline}</div>
                  </div>
                </div>

                <div>
                  <span className="text-sm text-gray-600">Budget Range</span>
                  <div className="font-medium text-gray-900">{projectData?.budget}</div>
                </div>

                <div className="border-t pt-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-lg font-semibold">Estimated Cost:</span>
                    <span className="text-2xl font-bold text-primary">
                      ${estimatedPrice.toLocaleString()} USD
                    </span>
                  </div>
                  {selectedPayment === 'mpesa' && (
                    <div className="flex justify-between items-center text-sm text-gray-600">
                      <span>M-Pesa Amount:</span>
                      <span className="font-medium">KES {kesAmount.toLocaleString()}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Payment Options */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Choose Payment Method</h3>
              
              {/* Payment Method Selection */}
              <div className="space-y-3 mb-6">
                <motion.div
                  className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                    selectedPayment === 'stripe' 
                      ? 'border-primary bg-blue-50' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => setSelectedPayment('stripe')}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <CreditCard className="h-6 w-6 text-primary mr-3" />
                      <div>
                        <div className="font-medium">Credit/Debit Card</div>
                        <div className="text-sm text-gray-600">Visa, Mastercard, American Express</div>
                      </div>
                    </div>
                    <div className={`w-4 h-4 rounded-full border-2 ${
                      selectedPayment === 'stripe' 
                        ? 'border-primary bg-primary' 
                        : 'border-gray-300'
                    }`}>
                      {selectedPayment === 'stripe' && (
                        <div className="w-2 h-2 bg-white rounded-full mx-auto mt-0.5"></div>
                      )}
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                    selectedPayment === 'mpesa' 
                      ? 'border-green-500 bg-green-50' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => setSelectedPayment('mpesa')}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Smartphone className="h-6 w-6 text-green-600 mr-3" />
                      <div>
                        <div className="font-medium">M-Pesa Mobile Money</div>
                        <div className="text-sm text-gray-600">Pay with M-Pesa (KES {kesAmount.toLocaleString()})</div>
                      </div>
                    </div>
                    <div className={`w-4 h-4 rounded-full border-2 ${
                      selectedPayment === 'mpesa' 
                        ? 'border-green-500 bg-green-500' 
                        : 'border-gray-300'
                    }`}>
                      {selectedPayment === 'mpesa' && (
                        <div className="w-2 h-2 bg-white rounded-full mx-auto mt-0.5"></div>
                      )}
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* M-Pesa Phone Input */}
              {selectedPayment === 'mpesa' && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="mb-6"
                >
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    M-Pesa Phone Number *
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      type="tel"
                      placeholder="0712345678 or 254712345678"
                      value={mpesaPhone}
                      onChange={(e) => {
                        setMpesaPhone(e.target.value)
                        setMpesaError('')
                      }}
                      className={`pl-10 ${mpesaError ? 'border-red-300' : ''}`}
                    />
                  </div>
                  {mpesaError && (
                    <p className="text-red-600 text-sm mt-1">{mpesaError}</p>
                  )}
                  <p className="text-sm text-gray-600 mt-1">
                    Enter your M-Pesa registered phone number
                  </p>
                </motion.div>
              )}
              
              <div className="space-y-4">
                <Button
                  onClick={handlePayment}
                  disabled={loading || (selectedPayment === 'mpesa' && !mpesaPhone)}
                  className="w-full py-4 text-lg"
                  size="lg"
                >
                  {loading ? (
                    <div className="flex items-center">
                      <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                      {selectedPayment === 'stripe' ? 'Processing Payment...' : 'Initiating M-Pesa...'}
                    </div>
                  ) : (
                    <div className="flex items-center">
                      {selectedPayment === 'stripe' ? (
                        <>
                          <CreditCard className="h-5 w-5 mr-2" />
                          Pay ${estimatedPrice.toLocaleString()} USD
                        </>
                      ) : (
                        <>
                          <Smartphone className="h-5 w-5 mr-2" />
                          Pay KES {kesAmount.toLocaleString()}
                        </>
                      )}
                    </div>
                  )}
                </Button>
              </div>

              {/* Security Notice */}
              <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-start space-x-2">
                  <Shield className="h-5 w-5 text-green-600 mt-0.5" />
                  <div className="text-sm text-green-800">
                    <div className="font-medium mb-1">Secure & Protected</div>
                    <div>
                      {selectedPayment === 'stripe' 
                        ? 'Your payment is processed securely through Stripe. All data is encrypted.'
                        : 'Your M-Pesa payment is processed through secure Safaricom channels.'
                      }
                    </div>
                  </div>
                </div>
              </div>

              {/* M-Pesa Instructions */}
              {selectedPayment === 'mpesa' && (
                <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="text-sm text-blue-800">
                    <div className="font-medium mb-2">M-Pesa Payment Steps:</div>
                    <ol className="list-decimal list-inside space-y-1">
                      <li>Click "Pay KES {kesAmount.toLocaleString()}" button</li>
                      <li>Check your phone for M-Pesa prompt</li>
                      <li>Enter your M-Pesa PIN to complete payment</li>
                      <li>Wait for confirmation message</li>
                    </ol>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-between mt-8 pt-6 border-t">
            <Button variant="outline" onClick={onCancel}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Terms
            </Button>
            <div className="text-sm text-gray-600">
              Need help? <a href="/contact" className="text-primary hover:underline">Contact Support</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PaymentCheckout