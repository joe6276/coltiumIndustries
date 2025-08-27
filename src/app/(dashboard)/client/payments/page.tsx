// src/app/(dashboard)/client/payments/page.tsx
'use client'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { apiClient } from '@/lib/api-config'
import { ClientProject, PaymentRequest, MpesaPaymentRequest } from '@/lib/types/api'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { 
  CreditCard,
  Smartphone, 
  DollarSign, 
  Loader2,
  CheckCircle,
  AlertCircle,
  Clock
} from 'lucide-react'
import { toast } from '@/hooks/use-toast'

export default function ClientPaymentsPage() {
  const { user } = useAuth()
  const searchParams = useSearchParams()
  const selectedProjectId = searchParams.get('project')
  
  const [projects, setProjects] = useState<ClientProject[]>([])
  const [isLoadingProjects, setIsLoadingProjects] = useState(true)
  const [isProcessingPayment, setIsProcessingPayment] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState<'stripe' | 'mpesa'>('stripe')
  const [error, setError] = useState<string | null>(null)
  const [mpesaStatus, setMpesaStatus] = useState<'idle' | 'processing' | 'validating' | 'success' | 'failed'>('idle')
  
  // Form data
  const [selectedProject, setSelectedProject] = useState(selectedProjectId || '')
  const [amount, setAmount] = useState('')
  const [description, setDescription] = useState('')
  const [mpesaPhone, setMpesaPhone] = useState('')

  // Safe function to extract numeric value from pricing
  const extractPricingAmount = (pricing: any): string => {
    if (!pricing) return ''
    
    if (typeof pricing === 'number') {
      return pricing.toString()
    }
    
    if (typeof pricing === 'string') {
      const cleanedPrice = pricing.replace(/[^\d.-]/g, '')
      const parsed = parseFloat(cleanedPrice)
      return isNaN(parsed) ? '' : parsed.toString()
    }
    
    return ''
  }

  // Safe function to display pricing
  const formatPricing = (pricing: any): string => {
    if (!pricing) return 'Price TBD'
    
    if (typeof pricing === 'string') {
      return pricing
    }
    
    if (typeof pricing === 'number') {
      return `$${pricing.toLocaleString()}`
    }
    
    return 'Price TBD'
  }

  useEffect(() => {
    if (user?.email) {
      fetchProjects()
    }
  }, [user])

  useEffect(() => {
    if (selectedProjectId && projects.length > 0) {
      const project = projects.find(p => p.id.toString() === selectedProjectId)
      if (project) {
        const extractedAmount = extractPricingAmount(project.pricing)
        setAmount(extractedAmount)
        setDescription(`Payment for ${project.title}`)
      }
    }
  }, [selectedProjectId, projects])

  const fetchProjects = async () => {
    try {
      setIsLoadingProjects(true)
      const projectsData = await apiClient.getClientProjects(user!.email)
      setProjects(projectsData)
    } catch (error) {
      console.error('Failed to fetch projects:', error)
      setError('Failed to load projects')
    } finally {
      setIsLoadingProjects(false)
    }
  }

  const handleStripePayment = async () => {
  if (!selectedProject || !amount) {
    toast({
      title: "Error",
      description: "Please select a project and enter amount",
      variant: "destructive",
    })
    return
  }

  // Get the selected project to extract clientId
  const project = projects.find(p => p.id.toString() === selectedProject)
  if (!project) {
    toast({
      title: "Error",
      description: "Selected project not found",
      variant: "destructive",
    })
    return
  }

  const paymentData: PaymentRequest = {
    stripeSessionUrl: '',
    stripeSessionId: '',
    approvedUrl: `${window.location.origin}/client/payments/success`,
    cancelUrl: `${window.location.origin}/client/payments/cancel`,
    description: description,
    userId: project.clientId, 
    name: user!.email,
    amount: parseFloat(amount),
    project: parseInt(selectedProject)
  }

  try {
    setIsProcessingPayment(true)
    const response = await apiClient.createStripePayment(paymentData)
    localStorage.setItem('sessionId', response.stripeSessionId)
    console.log('Stripe Session ID:', response.stripeSessionId)
    console.log('Client ID being sent:', project.clientId)
    
    if (response.stripeSessionUrl) {
      window.location.href = response.stripeSessionUrl
    } else {
      throw new Error('No Stripe session URL received')
    }
  } catch (error) {
    console.error('Stripe payment failed:', error)
    toast({
      title: "Payment Failed",
      description: error instanceof Error ? error.message : "Failed to process Stripe payment",
      variant: "destructive",
    })
  } finally {
    setIsProcessingPayment(false)
  }
}

  const handleMpesaPayment = async () => {
    if (!selectedProject || !amount || !mpesaPhone) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    // Validate phone number format
    const phoneRegex = /^254\d{9}$/
    if (!phoneRegex.test(mpesaPhone)) {
      toast({
        title: "Invalid Phone Number",
        description: "Please enter phone number in format 254XXXXXXXXX",
        variant: "destructive",
      })
      return
    }

    const paymentData: MpesaPaymentRequest = {
      phone: mpesaPhone,
      amount: amount,              
      projectId: selectedProject   
    }

    try {
      setIsProcessingPayment(true)
      setMpesaStatus('processing')
      setError(null) // Clear any previous errors
      
      console.log('Initiating M-Pesa payment:', paymentData)
      const response = await apiClient.initiateMpesaPayment(paymentData)
      console.log('M-Pesa initiation response:', response)
      
      if (response.checkoutRequestId || response.CheckoutRequestID) {
        const checkoutRequestId = response.checkoutRequestId || response.CheckoutRequestID
        setMpesaStatus('validating')
        toast({
          title: "Payment Initiated",
          description: "Please check your phone for M-Pesa prompt and enter your PIN",
        })
        
        // Start polling for payment status
        pollMpesaStatus(checkoutRequestId)
      } else if (response.success === false) {
        throw new Error(response.message || 'M-Pesa payment initiation failed')
      } else {
        // Handle case where we don't get checkoutRequestId but it might still be successful
        toast({
          title: "Payment Initiated",
          description: "Please check your phone for M-Pesa prompt",
        })
        setMpesaStatus('idle')
      }
    } catch (error) {
      console.error('M-Pesa payment failed:', error)
      setMpesaStatus('failed')
      setError(error instanceof Error ? error.message : "Failed to process M-Pesa payment")
      toast({
        title: "Payment Failed",
        description: error instanceof Error ? error.message : "Failed to process M-Pesa payment",
        variant: "destructive",
      })
    } finally {
      setIsProcessingPayment(false)
    }
  }

  const pollMpesaStatus = async (checkoutRequestId: string) => {
    const maxAttempts = 24 // 2 minutes with 5-second intervals
    let attempts = 0
    
    const poll = async () => {
      try {
        attempts++
        console.log(`Polling M-Pesa status (attempt ${attempts}/${maxAttempts}):`, checkoutRequestId)
        
        const status = await apiClient.validateMpesaPayment(checkoutRequestId)
        console.log('M-Pesa validation response:', status)
        console.log('Response type:', typeof status)
        
        // Handle string response (like "Payment was successful!")
        if (typeof status === 'string') {
          const statusString = status.toLowerCase()
          
          if (statusString.includes('payment was successful') || statusString.includes('success')) {
            setMpesaStatus('success')
            toast({
              title: "Payment Successful!",
              description: "Your M-Pesa payment has been processed successfully",
            })
            
            // Redirect to success page after a delay
            setTimeout(() => {
              window.location.href = '/client/payments/success'
            }, 2000)
            return
          }
          
          if (statusString.includes('failed') || statusString.includes('error')) {
            setMpesaStatus('failed')
            setError(status)
            toast({
              title: "Payment Failed",
              description: status,
              variant: "destructive",
            })
            return
          }
          
          // If it's a string but not success/failure, continue polling
          if (attempts < maxAttempts) {
            console.log('Payment status unclear from string, continuing to poll...')
            setTimeout(poll, 5000)
            return
          }
        }
        
        // Handle object response
        if (typeof status === 'object' && status !== null) {
          const resultCode = status.resultCode || status.ResultCode
          const resultDesc = status.resultDesc || status.ResultDesc || status.message
          const isSuccess = status.success === true || resultCode === '0' || resultCode === 0
          const isFailure = status.success === false && resultCode && resultCode !== '1032' && resultCode !== 1032
          const isPending = resultCode === '1032' || resultCode === 1032 || (!resultCode && !status.success)
          
          console.log('Status analysis:', { resultCode, isSuccess, isFailure, isPending })
          
          // Check for successful payment
          if (isSuccess) {
            setMpesaStatus('success')
            toast({
              title: "Payment Successful!",
              description: "Your M-Pesa payment has been processed successfully",
            })
            
            // Redirect to success page after a delay
            setTimeout(() => {
              window.location.href = '/client/payments/success'
            }, 2000)
            return
          }
          
          // Check for failed payment (but not pending)
          if (isFailure) {
            setMpesaStatus('failed')
            const errorMessage = resultDesc || "M-Pesa payment was not successful"
            setError(errorMessage)
            toast({
              title: "Payment Failed",
              description: errorMessage,
              variant: "destructive",
            })
            return
          }
        }
        
        // Continue polling if payment is still pending or status is unclear
        if (attempts < maxAttempts) {
          console.log('Payment still pending, continuing to poll...')
          setTimeout(poll, 5000) // Poll every 5 seconds
        } else {
          // Timeout reached
          setMpesaStatus('failed')
          const timeoutMessage = "Payment verification timed out. Please check your M-Pesa messages or contact support."
          setError(timeoutMessage)
          toast({
            title: "Payment Status Timeout",
            description: timeoutMessage,
            variant: "destructive",
          })
        }
      } catch (error) {
        console.error('Failed to check M-Pesa status:', error)
        
        // On error, continue polling for a few more attempts
        if (attempts < maxAttempts) {
          console.log('Error checking status, retrying...')
          setTimeout(poll, 5000)
        } else {
          setMpesaStatus('failed')
          const errorMessage = "Unable to verify payment status. Please contact support if you were charged."
          setError(errorMessage)
          toast({
            title: "Payment Status Check Failed",
            description: errorMessage,
            variant: "destructive",
          })
        }
      }
    }
    
    // Start polling after a short delay to allow M-Pesa to process
    setTimeout(poll, 3000)
  }

  const getSelectedProjectDetails = () => {
    return projects.find(p => p.id.toString() === selectedProject)
  }

  const getMpesaStatusDisplay = () => {
    switch (mpesaStatus) {
      case 'processing':
        return { text: 'Initiating payment...', color: 'text-blue-600', icon: Loader2 }
      case 'validating':
        return { text: 'Waiting for confirmation...', color: 'text-yellow-600', icon: Clock }
      case 'success':
        return { text: 'Payment successful!', color: 'text-green-600', icon: CheckCircle }
      case 'failed':
        return { text: 'Payment failed', color: 'text-red-600', icon: AlertCircle }
      default:
        return null
    }
  }

  const statusDisplay = getMpesaStatusDisplay()

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Make Payment</h1>
        <p className="text-muted-foreground">Pay for your projects using Stripe or M-Pesa</p>
      </div>

      {/* Error Alert */}
      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* M-Pesa Status Alert */}
      {statusDisplay && paymentMethod === 'mpesa' && (
        <Alert className="mb-6">
          <statusDisplay.icon className={`h-4 w-4 ${statusDisplay.color} ${mpesaStatus === 'processing' || mpesaStatus === 'validating' ? 'animate-spin' : ''}`} />
          <AlertDescription>
            <div className={statusDisplay.color}>
              {statusDisplay.text}
              {mpesaStatus === 'validating' && (
                <p className="text-sm mt-1">
                  Please complete the payment on your phone. This may take up to 2 minutes.
                </p>
              )}
            </div>
          </AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Payment Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Project Selection */}
          <Card>
            <CardHeader>
              <CardTitle>Select Project</CardTitle>
              <CardDescription>Choose the project you want to make a payment for</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="project">Project</Label>
                <Select value={selectedProject} onValueChange={setSelectedProject}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a project" />
                  </SelectTrigger>
                  <SelectContent>
                    {projects.map((project) => (
                      <SelectItem key={project.id} value={project.id.toString()}>
                        {project.title} - {formatPricing(project.pricing)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="amount">Amount (USD)</Label>
                  <Input
                    id="amount"
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Enter amount"
                  />
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Input
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Payment description"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Payment Method Selection */}
          <Card>
            <CardHeader>
              <CardTitle>Payment Method</CardTitle>
              <CardDescription>Choose your preferred payment method</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <Button
                  variant={paymentMethod === 'stripe' ? 'default' : 'outline'}
                  className="h-20 flex flex-col space-y-2"
                  onClick={() => setPaymentMethod('stripe')}
                >
                  <CreditCard className="h-6 w-6" />
                  <div className="text-center">
                    <div className="font-medium">Stripe</div>
                    <div className="text-xs text-muted-foreground">Credit/Debit Card</div>
                  </div>
                </Button>
                <Button
                  variant={paymentMethod === 'mpesa' ? 'default' : 'outline'}
                  className="h-20 flex flex-col space-y-2"
                  onClick={() => setPaymentMethod('mpesa')}
                >
                  <Smartphone className="h-6 w-6" />
                  <div className="text-center">
                    <div className="font-medium">M-Pesa</div>
                    <div className="text-xs text-muted-foreground">Mobile Money</div>
                  </div>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* M-Pesa Phone Number */}
          {paymentMethod === 'mpesa' && (
            <Card>
              <CardHeader>
                <CardTitle>M-Pesa Details</CardTitle>
                <CardDescription>Enter your M-Pesa phone number</CardDescription>
              </CardHeader>
              <CardContent>
                <div>
                  <Label htmlFor="mpesa-phone">Phone Number</Label>
                  <Input
                    id="mpesa-phone"
                    value={mpesaPhone}
                    onChange={(e) => setMpesaPhone(e.target.value)}
                    placeholder="254798361771"
                  />
                  <p className="text-sm text-muted-foreground mt-1">
                    Enter your phone number in format: 254XXXXXXXXX (example: 254798361771)
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Payment Summary */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Payment Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {getSelectedProjectDetails() && (
                <div className="space-y-2">
                  <h4 className="font-medium">{getSelectedProjectDetails()!.title}</h4>
                  <p className="text-sm text-muted-foreground">{getSelectedProjectDetails()!.description}</p>
                  <div className="text-sm">
                    <span className="text-muted-foreground">Project Value: </span>
                    <span className="font-medium">{formatPricing(getSelectedProjectDetails()!.pricing)}</span>
                  </div>
                </div>
              )}
              
              <Separator />
              
              <div className="flex justify-between">
                <span>Payment Amount:</span>
                <span className="font-medium">${amount || '0.00'}</span>
              </div>
              
              <div className="flex justify-between">
                <span>Method:</span>
                <span className="font-medium capitalize">{paymentMethod}</span>
              </div>
              
              <Separator />
              
              <Button 
                className="w-full" 
                onClick={paymentMethod === 'stripe' ? handleStripePayment : handleMpesaPayment}
                disabled={!selectedProject || !amount || isProcessingPayment || mpesaStatus === 'processing' || mpesaStatus === 'validating'}
              >
                {isProcessingPayment || mpesaStatus === 'processing' ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : mpesaStatus === 'validating' ? (
                  <>
                    <Clock className="mr-2 h-4 w-4" />
                    Waiting for confirmation...
                  </>
                ) : (
                  <>
                    {paymentMethod === 'stripe' ? (
                      <CreditCard className="mr-2 h-4 w-4" />
                    ) : (
                      <Smartphone className="mr-2 h-4 w-4" />
                    )}
                    Pay ${amount || '0.00'}
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Payment Security Info */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center space-x-2">
                <div className="flex-shrink-0">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                </div>
                <div>
                  <p className="font-medium">Secure Payment</p>
                  <p className="text-sm text-muted-foreground">Your payment information is encrypted and secure</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* M-Pesa Instructions */}
          {paymentMethod === 'mpesa' && (
            <Card>
              <CardHeader>
                <CardTitle>M-Pesa Payment Steps</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm">1</div>
                    <span className="text-sm">Click "Pay" button above</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm">2</div>
                    <span className="text-sm">Check your phone for M-Pesa prompt</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm">3</div>
                    <span className="text-sm">Enter your M-Pesa PIN</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm">4</div>
                    <span className="text-sm">Wait for confirmation (up to 2 minutes)</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}