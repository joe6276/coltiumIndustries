// src/app/(dashboard)/client/token-request/page.tsx - Updated to use correct clientId
'use client'
import { useEffect, useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { apiClient } from '@/lib/api-config'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { 
  Coins,
  CreditCard,
  CheckCircle,
  Clock,
  AlertCircle,
  Loader2,
  Zap,
  TrendingUp
} from 'lucide-react'
import { ClientProject, TokenRequestDTO } from '@/lib/types/api'
import { toast } from '@/hooks/use-toast'
import Link from 'next/link'

export default function TokenRequestPage() {
  const { user, getClientId } = useAuth()
  const [projects, setProjects] = useState<ClientProject[]>([])
  const [selectedProject, setSelectedProject] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (user?.email) {
      fetchProjects()
    }
  }, [user])

  const fetchProjects = async () => {
    try {
      setIsLoading(true)
      const projectsData = await apiClient.getClientProjects(user!.email)
      setProjects(projectsData)
      setError(null)
    } catch (error) {
      console.error('Failed to fetch projects:', error)
      setError('Failed to load your projects')
    } finally {
      setIsLoading(false)
    }
  }

  const handleTokenRequest = async () => {
    if (!selectedProject) {
      toast({
        title: "Error",
        description: "Please select a project to tokenize",
        variant: "destructive",
      })
      return
    }

    const clientId = getClientId()
    if (!clientId) {
      toast({
        title: "Error",
        description: "Client ID not found. Please try logging in again.",
        variant: "destructive",
      })
      return
    }

    const tokenRequestData: TokenRequestDTO = {
      clientId: clientId, // Use the correct clientId from auth context
      projectId: parseInt(selectedProject)
    }

    try {
      setIsProcessing(true)
      setError(null)
      
      console.log('Creating token request:', tokenRequestData) // Debug log
      const response = await apiClient.addTokenRequest(tokenRequestData)
      
      if (response.url) {
        // Store session ID for validation after payment
        localStorage.setItem('tokenSessionId', response.stripeSessionId)
        localStorage.setItem('tokenProjectId', selectedProject)
        
        toast({
          title: "Redirecting to Payment",
          description: "You will be redirected to Stripe to complete your $99 payment",
        })
        
        // Redirect to Stripe payment
        window.location.href = response.url
      } else {
        throw new Error('No payment URL received')
      }
    } catch (error) {
      console.error('Token request failed:', error)
      setError(error instanceof Error ? error.message : 'Failed to create token request')
      toast({
        title: "Token Request Failed",
        description: error instanceof Error ? error.message : "Failed to create token request",
        variant: "destructive",
      })
    } finally {
      setIsProcessing(false)
    }
  }

  const formatPricing = (pricing: any): string => {
    if (!pricing) return 'Price TBD'
    
    if (typeof pricing === 'string') {
      return pricing
    }
    
    if (typeof pricing === 'number') {
      return `${pricing.toLocaleString()}`
    }
    
    return 'Price TBD'
  }

  const getSelectedProjectDetails = () => {
    return projects.find(p => p.id.toString() === selectedProject)
  }

  if (isLoading) {
    return (
      <div className="container mx-auto p-4 md:p-6 max-w-4xl">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-slate-200 rounded w-1/3"></div>
          <div className="h-32 bg-slate-200 rounded"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-4 md:p-6 max-w-4xl space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center space-x-2 md:space-x-3">
          <Coins className="h-6 w-6 md:h-8 md:w-8 text-blue-600"/>
          <div>
            <h1 className="text-xl md:text-3xl font-bold text-slate-800">Request Tokenization</h1>
            <p className="text-sm md:text-base text-slate-600">
              Tokenize your digital assets and list them on the marketplace
            </p>
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Token Request Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* How It Works */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Zap className="h-5 w-5 text-yellow-500" />
                <span>How Tokenization Works</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-bold mx-auto mb-2">1</div>
                  <p className="text-xs md:text-sm font-medium">Select Project</p>
                  <p className="text-xs text-slate-500">Choose project to tokenize</p>
                </div>
                <div className="text-center">
                  <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-bold mx-auto mb-2">2</div>
                  <p className="text-xs md:text-sm font-medium">Pay Fee</p>
                  <p className="text-xs text-slate-500">Complete Stripe payment</p>
                </div>
                <div className="text-center">
                  <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-bold mx-auto mb-2">3</div>
                  <p className="text-xs md:text-sm font-medium">Admin Approval</p>
                  <p className="text-xs text-slate-500">Wait for admin review</p>
                </div>
                <div className="text-center">
                  <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-bold mx-auto mb-2">4</div>
                  <p className="text-xs md:text-sm font-medium">Tokenization</p>
                  <p className="text-xs text-slate-500">Complete valuation form</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Project Selection */}
          <Card>
            <CardHeader>
              <CardTitle>Select Project to Tokenize</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {projects.length === 0 ? (
                <div className="text-center py-8">
                  <Coins className="h-12 w-12 text-slate-300 mx-auto mb-3" />
                  <h3 className="text-lg font-medium text-slate-700 mb-2">No Projects Available</h3>
                  <p className="text-slate-500 mb-4">You need projects to request tokenization.</p>
                  <Link href="/client/projects">
                    <Button>View Projects</Button>
                  </Link>
                </div>
              ) : (
                <>
                  <div>
                    <label className="block text-sm font-medium mb-2">Choose Project</label>
                    <Select value={selectedProject} onValueChange={setSelectedProject}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a project to tokenize" />
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

                  {getSelectedProjectDetails() && (
                    <div className="p-4 bg-slate-50 rounded-lg">
                      <h4 className="font-medium mb-2">{getSelectedProjectDetails()!.title}</h4>
                      <p className="text-sm text-slate-600 mb-3">{getSelectedProjectDetails()!.description}</p>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-slate-500">Project Value: </span>
                          <span className="font-medium">{formatPricing(getSelectedProjectDetails()!.pricing)}</span>
                        </div>
                        <div>
                          <span className="text-slate-500">Timeline: </span>
                          <span className="font-medium">{getSelectedProjectDetails()!.timeline || 'TBD'}</span>
                        </div>
                        <div>
                          <span className="text-slate-500">Project ID: </span>
                          <span className="font-medium">{getSelectedProjectDetails()!.id}</span>
                        </div>
                        <div>
                          <span className="text-slate-500">Client ID: </span>
                          <span className="font-medium">{getClientId()}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Payment Summary & Action */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Tokenization Fee</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                {getSelectedProjectDetails() && (
                  <div className="text-3xl font-bold text-blue-600 mb-2">
                    {formatPricing(getSelectedProjectDetails()!.pricing)}
                  </div>
                )}
                <p className="text-sm text-slate-600">One-time tokenization fee</p>
              </div>
              
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Tokenization Service:</span>
                  <span>0.00</span>
                </div>
                <div className="flex justify-between">
                  <span>Processing Fee:</span>
                  <span>0.00</span>
                </div>
                {getSelectedProjectDetails() && (
                  <div className="flex justify-between">
                    <span>Total:</span>
                    <span>{formatPricing(getSelectedProjectDetails()!.pricing)}</span>
                  </div>
                )}
              </div>

              <Button 
                className="w-full" 
                onClick={handleTokenRequest}
                disabled={!selectedProject || isProcessing || projects.length === 0}
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <CreditCard className="mr-2 h-4 w-4" />
                    Pay & Request Tokenization
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

                   
          {/* Quick Links */}
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-3">
                <Link href="/client/token-request/status">
                  <Button variant="outline" className="w-full text-sm">
                    View My Token Requests
                  </Button>
                </Link>
                <Link href="/client/marketplace">
                  <Button variant="outline" className="w-full text-sm">
                    Browse Marketplace
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}