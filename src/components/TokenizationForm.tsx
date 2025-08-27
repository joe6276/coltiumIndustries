import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'
import { 
  Calculator,
  Loader2,
  TrendingUp,
  BarChart3,
  DollarSign,
  AlertCircle,
  CheckCircle,
  Target,
  Activity,
  Zap
} from 'lucide-react'
import { apiClient } from '@/lib/api-config'
import { 
  TokenizationRequest, 
  TokenizationApiResponse, 
  TokenizationFormData,
  ProcessedTokenizationResults 
} from '@/lib/types/api'
import { toast } from '@/hooks/use-toast'

interface TokenizationFormProps {
  onComplete?: (results: ProcessedTokenizationResults) => void
  projectData?: {
    title: string
    description: string
    pricing: number
  }
}

export default function TokenizationForm({ onComplete, projectData }: TokenizationFormProps) {
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [results, setResults] = useState<ProcessedTokenizationResults | null>(null)
  const [formData, setFormData] = useState<TokenizationFormData>({
    content: projectData?.description || `Title: ${projectData?.title || 'Digital Asset'}

Description: ${projectData?.description || 'A valuable digital asset ready for tokenization.'}

This is a unique digital asset with specific characteristics that make it suitable for tokenization and marketplace trading.

Key Features:
- Unique content and intellectual property
- Market-ready for digital trading
- Professionally developed and tested
- High potential for revenue generation`,
    projectType: 'digital_asset',
    developmentCost: projectData?.pricing ? Math.round(projectData.pricing * 0.3) : 1500,
    stageCompletion: 100,
    expectedRevenue: projectData?.pricing || 5000,
    discountRate: 0.1,
    riskFactor: 0.2,
    userBase: 10000,
    tokenSupply: 1000000,
    usefulLife: 5,
    blockchainFlag: true
  })

  const handleInputChange = (field: keyof TokenizationFormData, value: string | number | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const processTokenizationResults = (apiResponse: TokenizationApiResponse): ProcessedTokenizationResults => {
    const { data } = apiResponse
    
    return {
      intrinsicScore: data.intrinsic_score,
      npv: data.economics.npv,
      finalValue: data.final_estimated_value,
      amortizedValue: data.accounting.amortized_value,
      mlAdjustedValue: data.ml_adjusted,
      tokenValue: data.tokenomics,
      evmScore: data.evm.ev,
      confidenceHigh: data.probabilistic.confidence_interval_90.high,
      confidenceLow: data.probabilistic.confidence_interval_90.low,
      confidenceMean: data.probabilistic.mean,
      cpi: data.evm.cpi,
      eac: data.evm.eac,
      ev: data.evm.ev
    }
  }

  const handleFormSubmit = async () => {
    // Basic validation
    if (!formData.content || !formData.projectType) {
      toast({
        title: "Validation Error",
        description: "Please fill out all required fields.",
        variant: "destructive",
      })
      return
    }

    if (formData.developmentCost <= 0 || formData.expectedRevenue <= 0) {
      toast({
        title: "Validation Error",
        description: "Development cost and expected revenue must be greater than 0.",
        variant: "destructive",
      })
      return
    }

    if (formData.stageCompletion < 0 || formData.stageCompletion > 100) {
      toast({
        title: "Validation Error",
        description: "Stage completion must be between 0 and 100.",
        variant: "destructive",
      })
      return
    }

    try {
      setIsProcessing(true)
      setError(null)
      
      // Prepare data for the tokenization API
      const tokenizationRequest: TokenizationRequest = {
        blockchain_flag: formData.blockchainFlag,
        content: formData.content,
        development_cost: formData.developmentCost,
        discount_rate: formData.discountRate,
        expected_revenue: formData.expectedRevenue,
        project_type: formData.projectType,
        risk_factor: formData.riskFactor,
        stage_completion: formData.stageCompletion,
        token_supply: formData.tokenSupply,
        useful_life: formData.usefulLife,
        user_base: formData.userBase
      }

      console.log('Submitting tokenization request:', tokenizationRequest)
      
      const apiResponse = await apiClient.tokenizeAsset(tokenizationRequest)
      
      if (!apiResponse.success) {
        throw new Error('Tokenization was not successful')
      }
      
      const processedResults = processTokenizationResults(apiResponse)
      setResults(processedResults)
      
      toast({
        title: "Tokenization Complete!",
        description: "Your asset has been successfully tokenized using AI-powered valuation.",
      })

      // Call the completion callback if provided
      if (onComplete) {
        onComplete(processedResults)
      }
      
    } catch (error) {
      console.error('Tokenization failed:', error)
      const errorMessage = error instanceof Error ? error.message : 'Failed to tokenize asset'
      setError(errorMessage)
      toast({
        title: "Tokenization Failed",
        description: errorMessage,
        variant: "destructive",
      })
    } finally {
      setIsProcessing(false)
    }
  }
  const resetForm = () => {
    setResults(null)
    setError(null)
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Calculator className="h-6 w-6 text-blue-600" />
            <span>Professional Asset Tokenization</span>
          </CardTitle>
          <p className="text-slate-600">
            Complete the form below to tokenize your digital asset using our advanced AI-powered valuation system.
          </p>
        </CardHeader>
        
        <CardContent>
          {!results ? (
            <div className="space-y-6">
              {/* Error Alert */}
              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {/* Asset Content */}
              <div className="space-y-2">
                <Label htmlFor="content">Asset Content *</Label>
                <Textarea
                  id="content"
                  value={formData.content}
                  onChange={(e) => handleInputChange('content', e.target.value)}
                  className="min-h-[200px]"
                  placeholder="Describe your digital asset in detail..."
                />
                <p className="text-xs text-slate-500">
                  Provide a comprehensive description of your digital asset including its unique characteristics and value proposition.
                </p>
              </div>

              {/* Form Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="projectType">Project Type *</Label>
                  <Input
                    id="projectType"
                    value={formData.projectType}
                    onChange={(e) => handleInputChange('projectType', e.target.value)}
                    placeholder="e.g., recipe, artwork, software, content"
                  />
                  <p className="text-xs text-slate-500">Category of your digital asset</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="developmentCost">Development Cost (USD) *</Label>
                  <Input
                    id="developmentCost"
                    type="number"
                    step="0.01"
                    min="0"
                    value={formData.developmentCost}
                    onChange={(e) => handleInputChange('developmentCost', Number(e.target.value))}
                    placeholder="1500"
                  />
                  <p className="text-xs text-slate-500">Total cost to develop this asset</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="stageCompletion">Stage Completion (%) *</Label>
                  <Input
                    id="stageCompletion"
                    type="number"
                    min="0"
                    max="100"
                    value={formData.stageCompletion}
                    onChange={(e) => handleInputChange('stageCompletion', Number(e.target.value))}
                    placeholder="100"
                  />
                  <p className="text-xs text-slate-500">Percentage of project completion</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="expectedRevenue">Expected Annual Revenue (USD) *</Label>
                  <Input
                    id="expectedRevenue"
                    type="number"
                    step="0.01"
                    min="0"
                    value={formData.expectedRevenue}
                    onChange={(e) => handleInputChange('expectedRevenue', Number(e.target.value))}
                    placeholder="5000"
                  />
                  <p className="text-xs text-slate-500">Projected annual revenue from this asset</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="discountRate">Discount Rate *</Label>
                  <Input
                    id="discountRate"
                    type="number"
                    step="0.01"
                    min="0"
                    max="1"
                    value={formData.discountRate}
                    onChange={(e) => handleInputChange('discountRate', Number(e.target.value))}
                    placeholder="0.1"
                  />
                  <p className="text-xs text-slate-500">Rate for NPV calculation (0.1 = 10%)</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="riskFactor">Risk Factor *</Label>
                  <Input
                    id="riskFactor"
                    type="number"
                    step="0.01"
                    min="0"
                    max="1"
                    value={formData.riskFactor}
                    onChange={(e) => handleInputChange('riskFactor', Number(e.target.value))}
                    placeholder="0.2"
                  />
                  <p className="text-xs text-slate-500">Market risk assessment (0.2 = 20%)</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="userBase">Target User Base</Label>
                  <Input
                    id="userBase"
                    type="number"
                    min="0"
                    value={formData.userBase}
                    onChange={(e) => handleInputChange('userBase', Number(e.target.value))}
                    placeholder="10000"
                  />
                  <p className="text-xs text-slate-500">Potential users on target blockchain</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tokenSupply">Total Token Supply</Label>
                  <Input
                    id="tokenSupply"
                    type="number"
                    min="1"
                    value={formData.tokenSupply}
                    onChange={(e) => handleInputChange('tokenSupply', Number(e.target.value))}
                    placeholder="1000000"
                  />
                  <p className="text-xs text-slate-500">Number of tokens to be minted</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="usefulLife">Useful Life (Years) *</Label>
                  <Input
                    id="usefulLife"
                    type="number"
                    min="1"
                    max="50"
                    value={formData.usefulLife}
                    onChange={(e) => handleInputChange('usefulLife', Number(e.target.value))}
                    placeholder="5"
                  />
                  <p className="text-xs text-slate-500">Expected revenue-generating lifespan</p>
                </div>
              </div>

              {/* Blockchain Flag */}
              <div className="flex items-center space-x-2 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <input
                  type="checkbox"
                  id="blockchainFlag"
                  checked={formData.blockchainFlag}
                  onChange={(e) => handleInputChange('blockchainFlag', e.target.checked)}
                  className="rounded"
                />
                <Label htmlFor="blockchainFlag" className="text-blue-800">
                  Enable Advanced Blockchain-Specific Metrics
                </Label>
              </div>

              {/* Submit Button */}
              <Button onClick={handleFormSubmit} className="w-full" disabled={isProcessing} size="lg">
                {isProcessing ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing Tokenization...
                  </>
                ) : (
                  <>
                    <Zap className="mr-2 h-4 w-4" />
                    Tokenize Asset 
                  </>
                )}
              </Button>
            </div>
          ) : (
            // Results Display
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                  <h3 className="text-xl font-semibold">Professional Tokenization Results</h3>
                </div>
                <Button onClick={resetForm} variant="outline">
                  Tokenize Another Asset
                </Button>
              </div>

              <Alert className="border-green-200 bg-green-50">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <AlertDescription className="text-green-800">
                  Your digital asset has been successfully tokenized using advanced AI-powered valuation algorithms 
                  including economic modeling, machine learning adjustments, and probabilistic analysis.
                </AlertDescription>
              </Alert>

              {/* Key Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="border-2 border-blue-200 bg-blue-50">
                  <CardContent className="p-4 text-center">
                    <TrendingUp className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                    <p className="text-sm text-blue-700 mb-1">Final Estimated Value</p>
                    <p className="text-2xl font-bold text-blue-900">{results.finalValue}</p>
                  </CardContent>
                </Card>

                <Card className="border-2 border-green-200 bg-green-50">
                  <CardContent className="p-4 text-center">
                    <Activity className="h-8 w-8 text-green-600 mx-auto mb-2" />
                    <p className="text-sm text-green-700 mb-1">Net Present Value</p>
                    <p className="text-2xl font-bold text-green-900">{results.npv}</p>
                  </CardContent>
                </Card>

                <Card className="border-2 border-purple-200 bg-purple-50">
                  <CardContent className="p-4 text-center">
                    <Target className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                    <p className="text-sm text-purple-700 mb-1">Intrinsic Score</p>
                    <p className="text-2xl font-bold text-purple-900">{results.intrinsicScore}</p>
                  </CardContent>
                </Card>
              </div>

              {/* Detailed Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-slate-50 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium text-slate-700">ML Adjusted Value</span>
                    <Badge variant="secondary">Enhanced</Badge>
                  </div>
                  <p className="text-lg font-bold text-blue-600">{results.mlAdjustedValue}</p>
                </div>

                <div className="p-4 bg-slate-50 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium text-slate-700">Token Value</span>
                    <Badge variant="secondary">Blockchain</Badge>
                  </div>
                  <p className="text-lg font-bold text-green-600">{results.tokenValue}</p>
                </div>

                <div className="p-4 bg-slate-50 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium text-slate-700">Amortized Value</span>
                    <Badge variant="outline">Accounting</Badge>
                  </div>
                  <p className="text-lg font-bold text-slate-800">{results.amortizedValue}</p>
                </div>

                <div className="p-4 bg-slate-50 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium text-slate-700">EVM Score</span>
                    <Badge variant="outline">Technical</Badge>
                  </div>
                  <p className="text-lg font-bold text-slate-800">{results.evmScore}</p>
                </div>
              </div>

              {/* Confidence Interval */}
              <Card className="border-orange-200 bg-orange-50">
                <CardHeader>
                  <CardTitle className="text-orange-800 flex items-center space-x-2">
                    <BarChart3 className="h-5 w-5" />
                    <span>90% Confidence Interval</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <p className="text-sm text-orange-700">Low</p>
                      <p className="text-lg font-bold text-orange-900">{results.confidenceLow}</p>
                    </div>
                    <div>
                      <p className="text-sm text-orange-700">Mean</p>
                      <p className="text-lg font-bold text-orange-900">{results.confidenceMean}</p>
                    </div>
                    <div>
                      <p className="text-sm text-orange-700">High</p>
                      <p className="text-lg font-bold text-orange-900">{results.confidenceHigh}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Separator />

              <div className="text-center">
                <p className="text-slate-600 mb-2">
                  Your asset has been professionally valued and is ready for marketplace listing.
                </p>
                <p className="text-sm text-slate-500">
                  The valuation includes economic modeling, machine learning adjustments, and probabilistic analysis.
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}