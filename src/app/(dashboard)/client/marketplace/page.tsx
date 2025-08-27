// src/app/(dashboard)/client/marketplace/page.tsx
'use client'
import { useEffect, useState } from 'react'
import { apiClient } from '@/lib/api-config'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Input } from '@/components/ui/input'
import { 
  TrendingUp,
  Search,
  RefreshCw,
  BarChart3,
  DollarSign,
  Activity,
  Star,
  Eye,
  Filter
} from 'lucide-react'
import { MarketPlace } from '@/lib/types/api'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export default function MarketplacePage() {
  const [marketplaceAssets, setMarketplaceAssets] = useState<MarketPlace[]>([])
  const [filteredAssets, setFilteredAssets] = useState<MarketPlace[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState<'value' | 'npv' | 'recent'>('value')

  useEffect(() => {
    fetchMarketplaceAssets()
  }, [])

  useEffect(() => {
    filterAndSortAssets()
  }, [marketplaceAssets, searchTerm, sortBy])

  const fetchMarketplaceAssets = async () => {
    try {
      setIsLoading(true)
      const assets = await apiClient.getMarketPlaces()
      setMarketplaceAssets(assets)
      setError(null)
    } catch (error) {
      console.error('Failed to fetch marketplace assets:', error)
      setError('Failed to load marketplace assets')
    } finally {
      setIsLoading(false)
    }
  }

  const filterAndSortAssets = () => {
    let filtered = [...marketplaceAssets]

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(asset =>
        asset.client?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        asset.id.toString().includes(searchTerm)
      )
    }

    // Sort
    switch (sortBy) {
      case 'value':
        filtered.sort((a, b) => b.value - a.value)
        break
      case 'npv':
        filtered.sort((a, b) => b.npv - a.npv)
        break
      case 'recent':
        filtered.sort((a, b) => b.id - a.id)
        break
    }

    setFilteredAssets(filtered)
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount)
  }

  

  const totalAssets = marketplaceAssets.length
  const totalValue = marketplaceAssets.reduce((sum, asset) => sum + asset.value, 0)
  const averageValue = totalAssets > 0 ? totalValue / totalAssets : 0

  if (isLoading) {
    return (
      <div className="container mx-auto p-4 md:p-6 max-w-6xl">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-slate-200 rounded w-1/3"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-64 bg-slate-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-4 md:p-6 max-w-6xl space-y-6">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div className="flex items-center space-x-2 md:space-x-3">
            <TrendingUp className="h-6 w-6 md:h-8 md:w-8 text-blue-600" />
            <div>
              <h1 className="text-xl md:text-3xl font-bold text-slate-800">Digital Asset Marketplace</h1>
              <p className="text-sm md:text-base text-slate-600">Discover and trade tokenized digital assets</p>
            </div>
          </div>
          <Button onClick={fetchMarketplaceAssets} variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>

      {/* Error Alert */}
      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        <Card>
          <CardContent className="p-4 md:p-6">
            <div className="flex items-center space-x-2 md:space-x-3">
              <Activity className="h-6 w-6 md:h-8 md:w-8 text-blue-600" />
              <div>
                <p className="text-xs md:text-sm text-slate-600">Listed Assets</p>
                <p className="text-lg md:text-2xl font-bold text-slate-800">{totalAssets}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 md:p-6">
            <div className="flex items-center space-x-2 md:space-x-3">
              <DollarSign className="h-6 w-6 md:h-8 md:w-8 text-green-600" />
              <div>
                <p className="text-xs md:text-sm text-slate-600">Total Value</p>
                <p className="text-lg md:text-2xl font-bold text-slate-800">{formatCurrency(totalValue)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 md:p-6">
            <div className="flex items-center space-x-2 md:space-x-3">
              <BarChart3 className="h-6 w-6 md:h-8 md:w-8 text-purple-600" />
              <div>
                <p className="text-xs md:text-sm text-slate-600">Average Value</p>
                <p className="text-lg md:text-2xl font-bold text-slate-800">{formatCurrency(averageValue)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input
            placeholder="Search by asset ID or owner..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={sortBy} onValueChange={(value: 'value' | 'npv' | 'recent') => setSortBy(value)}>
          <SelectTrigger className="w-full md:w-48">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="value">Highest Value</SelectItem>
            <SelectItem value="npv">Highest NPV</SelectItem>
            <SelectItem value="recent">Most Recent</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Marketplace Assets Grid */}
      {filteredAssets.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <TrendingUp className="h-12 w-12 text-slate-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-slate-700 mb-2">
              {totalAssets === 0 ? 'No Assets Listed Yet' : 'No Assets Found'}
            </h3>
            <p className="text-slate-500">
              {totalAssets === 0 
                ? 'Digital assets will appear here once they are tokenized and listed.'
                : 'No assets match your search criteria.'
              }
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAssets.map((asset) => {
            
            return (
              <Card key={asset.id} className="hover:shadow-lg transition-all duration-300 cursor-pointer group">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <CardTitle className="text-lg">Asset #{asset.id}</CardTitle>
                      <p className="text-sm text-slate-600">Owner: {asset.client}</p>
                    </div>
                    
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  {/* Valuation Metrics */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="text-center p-3 bg-blue-50 rounded-lg">
                      <p className="text-xs text-slate-600">Asset Value</p>
                      <p className="text-sm font-bold text-blue-600">{asset.value}</p>
                    </div>
                    <div className="text-center p-3 bg-green-50 rounded-lg">
                      <p className="text-xs text-slate-600">NPV</p>
                      <p className="text-sm font-bold text-green-600">{asset.npv}</p>
                    </div>
                  </div>

                  {/* Intrinsic Score */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600">Intrinsic Score</span>
                      <span className="font-medium">{asset.intrisicScore}</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div 
                        className="bg-purple-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${Math.min(parseFloat(asset.intrisicScore) * 2, 100)}%` }}
                      />
                    </div>
                  </div>

                  {/* EVM */}
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">EVM Score:</span>
                    <span className="font-medium">{asset.evm}</span>
                  </div>

                  {/* Simulation Range */}
                  <div className="text-xs text-slate-500">
                    <span className="font-medium">Simulation Range: </span>
                    {asset.probabilisticSimulation}
                  </div>                 
                </CardContent>
              </Card>
            )
          })}
        </div>
      )}

      {/* Results Summary */}
      {filteredAssets.length > 0 && (
        <div className="text-center text-xs md:text-sm text-slate-600">
          Showing {filteredAssets.length} of {totalAssets} digital assets
          {searchTerm && ` matching "${searchTerm}"`}
        </div>
      )}
    </div>
  )
}