// src/app/(dashboard)/client/tokenization/[requestId]/page.tsx
'use client'
import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { apiClient } from '@/lib/api-config'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { 
  CheckCircle,
  AlertCircle,
  Loader2,
  TrendingUp,
  Zap,
  CreditCard,
  Clock
} from 'lucide-react'
import { TokenRequest,MarketPlaceDTO,ProcessedTokenizationResults } from '@/lib/types/api' // Correct import path
import { toast } from '@/hooks/use-toast'
import TokenizationForm from '@/components/TokenizationForm'

export default function ClientTokenizationPage() {
  const params = useParams()
  const router = useRouter()
  const { user, getClientId } = useAuth()
  const requestId = params.requestId as string

  const [tokenRequest, setTokenRequest] = useState<TokenRequest | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isListingToMarketplace, setIsListingToMarketplace] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [tokenizationCompleted, setTokenizationCompleted] = useState(false)
  const [tokenizationResults, setTokenizationResults] = useState<ProcessedTokenizationResults | null>(null)

  useEffect(() => {
    const clientId = getClientId()
    if (clientId) {
      fetchTokenRequest(clientId)
    }
  }, [requestId, user])

  const fetchTokenRequest = async (clientId: number) => {
    try {
      setIsLoading(true)
      
      // Use the client-specific endpoint for better performance
      const clientRequests = await apiClient.getClientTokenRequests(clientId)
      const request = clientRequests.find(r => r.id.toString() === requestId)
      
      if (!request) {
        setError('Token request not found')
        return
      }

      // Validate request ownership using clientId
      if (request.clientId !== clientId) {
        setError('You do not have permission to access this tokenization request')
        return
      }

      // Check payment status
      if (!request.paymentIntentId) {
        setError('Payment verification required before tokenization')
        return
      }

      // Check approval status
      if (!request.isApproved) {
        setError('This tokenization request has not been approved yet')
        return
      }

      setTokenRequest(request)
      setError(null)
    } catch (error) {
      console.error('Failed to fetch token request:', error)
      setError('Failed to load tokenization request')
    } finally {
      setIsLoading(false)
    }
  }

  const handleTokenizationComplete = (results: ProcessedTokenizationResults) => {
    setTokenizationResults(results)
    setTokenizationCompleted(true)
    
    toast({
      title: "Professional Tokenization Complete!",
      description: `Your asset has been valued at ${results.finalValue} using advanced AI algorithms.`,
    })
  }

  

  const handleListToMarketplace = async () => {
    if (!tokenizationResults || !tokenRequest) {
      toast({
        title: "Error",
        description: "Tokenization must be completed before listing to marketplace",
        variant: "destructive",
      })
      return
    }

    try {
      setIsListingToMarketplace(true)

      // Map the real tokenization API results to marketplace format
      const marketplaceData: MarketPlaceDTO = {
        intrisicScore: tokenizationResults.intrinsicScore.toString(),
        npv: tokenizationResults.npv,
        evm: tokenizationResults.evmScore,
        probabilisticSimulation: `AI Confidence Range: ${tokenizationResults.confidenceLow} - ${tokenizationResults.confidenceHigh} | Mean: ${tokenizationResults.confidenceMean}`,
        assetValuation: tokenizationResults.finalValue,
        value: tokenizationResults.finalValue,
        clientId: tokenRequest.clientId
      }

      console.log('Listing to marketplace with real tokenization data:', marketplaceData)
      
      const response = await apiClient.addMarketPlace(marketplaceData)
      
      toast({
        title: "Successfully Listed!",
        description: `Your asset valued at ${tokenizationResults.finalValue} has been added to the marketplace.`,
      })

      // Redirect to marketplace
      setTimeout(() => {
        router.push('/client/marketplace')
      }, 2000)

    } catch (error) {
      console.error('Failed to list to marketplace:', error)
      toast({
        title: "Marketplace Listing Failed",
        description: error instanceof Error ? error.message : "Failed to list asset to marketplace",
        variant: "destructive",
      })
    } finally {
      setIsListingToMarketplace(false)
    }
  }

  if (isLoading) {
    return (
      <div className="container mx-auto p-4 md:p-6 max-w-4xl">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-slate-200 rounded w-1/3"></div>
          <div className="h-64 bg-slate-200 rounded"></div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto p-4 md:p-6 max-w-4xl">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
        <div className="mt-6 flex space-x-4">
          <Button onClick={() => router.back()}>Go Back</Button>
          <Button onClick={() => router.push('/client/token-request/status')} variant="outline">
            View All Requests
          </Button>
        </div>
      </div>
    )
  }

  if (!tokenRequest) {
    return (
      <div className="container mx-auto p-4 md:p-6 max-w-4xl">
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>Token request not found</AlertDescription>
        </Alert>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-4 md:p-6 max-w-6xl space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center space-x-2 md:space-x-3">
          <Zap className="h-6 w-6 md:h-8 md:w-8 text-blue-600" />
          <div>
            <h1 className="text-xl md:text-3xl font-bold text-slate-800">Professional Asset Tokenization</h1>
            <p className="text-sm md:text-base text-slate-600">
              Complete the valuation for Project ID: {tokenRequest.projectId}
            </p>
          </div>
        </div>
      </div>

      {/* Request Info */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <CheckCircle className="h-5 w-5 text-green-600" />
            <span>Approved Tokenization Request</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <p className="text-sm text-slate-600">Request ID</p>
              <p className="font-medium">#{tokenRequest.id}</p>
            </div>
            <div>
              <p className="text-sm text-slate-600">Project ID</p>
              <p className="font-medium">{tokenRequest.projectId}</p>
            </div>
            <div>
              <p className="text-sm text-slate-600">Payment Status</p>
              <div className="flex items-center space-x-2">
                {tokenRequest.paymentIntentId ? (
                  <>
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-green-600 font-medium">Verified</span>
                  </>
                ) : (
                  <>
                    <CreditCard className="h-4 w-4 text-red-600" />
                    <span className="text-red-600 font-medium">Required</span>
                  </>
                )}
              </div>
            </div>
            <div>
              <p className="text-sm text-slate-600">Approval Status</p>
              <div className="flex items-center space-x-2">
                {tokenRequest.isApproved ? (
                  <>
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-green-600 font-medium">Approved</span>
                  </>
                ) : (
                  <>
                    <Clock className="h-4 w-4 text-yellow-600" />
                    <span className="text-yellow-600 font-medium">Pending</span>
                  </>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Marketplace Listing Button - Show when tokenization is complete */}
      {tokenizationCompleted && tokenizationResults && (
        <Card className="border-green-200 bg-green-50">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
              <div>
                <h3 className="text-lg font-semibold text-green-800 mb-2">Professional Tokenization Complete!</h3>
                <p className="text-green-700">
                  Your asset has been professionally valued at <strong>{tokenizationResults.finalValue}</strong>
                </p>
                <p className="text-sm text-green-600 mt-1">
                  Using advanced algorithms including NPV: {tokenizationResults.npv} | ML Adjusted: {tokenizationResults.mlAdjustedValue}
                </p>
                <p className="text-xs text-green-500 mt-1">
                  Ready to list on the marketplace for trading
                </p>
              </div>
              <Button
                onClick={handleListToMarketplace}
                disabled={isListingToMarketplace}
                className="bg-green-600 hover:bg-green-700"
                size="lg"
              >
                {isListingToMarketplace ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Listing to Marketplace...
                  </>
                ) : (
                  <>
                    <TrendingUp className="mr-2 h-4 w-4" />
                    List to Marketplace
                  </>
                )}
              </Button>
            </div>
            
            {/* Tokenization Summary */}
            <div className="mt-4 pt-4 border-t border-green-200">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div className="text-center">
                  <p className="text-green-600 font-medium">Intrinsic Score</p>
                  <p className="text-green-800">{(tokenizationResults.intrinsicScore * 100).toFixed(1)}%</p>
                </div>
                <div className="text-center">
                  <p className="text-green-600 font-medium">Confidence Range</p>
                  <p className="text-green-800">{tokenizationResults.confidenceLow} - {tokenizationResults.confidenceHigh}</p>
                </div>
                <div className="text-center">
                  <p className="text-green-600 font-medium">Token Value</p>
                  <p className="text-green-800">{tokenizationResults.tokenValue}</p>
                </div>
                <div className="text-center">
                  <p className="text-green-600 font-medium">EVM Score</p>
                  <p className="text-green-800">{tokenizationResults.evmScore}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Tokenization Form */}
      <TokenizationForm 
        onComplete={handleTokenizationComplete}
        projectData={{
          title: `Project ${tokenRequest.projectId}`,
          description: `Digital asset for tokenization - Project ID: ${tokenRequest.projectId}`,
          pricing: 0 // Will be determined by tokenization
        }}
      />

      

      

      {/* Navigation */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Button onClick={() => router.push('/client/token-request/status')} variant="outline" className="flex-1">
          ← Back to Token Requests
        </Button>
        <Button onClick={() => router.push('/client/marketplace')} variant="outline" className="flex-1">
          View Marketplace →
        </Button>
      </div>
    </div>
  )
}