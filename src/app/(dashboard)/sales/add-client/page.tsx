// src/app/(dashboard)/sales/add-client/page.tsx
'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { apiClient } from '@/lib/api-config'
import { AddClientRequest } from '@/lib/types/sales'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { ArrowLeft, Loader2, UserPlus } from 'lucide-react'
import { toast } from '@/hooks/use-toast'
import Link from 'next/link'

export default function AddClientPage() {
  const [formData, setFormData] = useState<AddClientRequest>({
    clientName: '',
    company: '',
    email: '',
    phone: '',
    password: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsSubmitting(true)

    try {
      await apiClient.addClient(formData)
      
      toast({
        title: "Success",
        description: "Client added successfully!",
      })

      // Reset form
      setFormData({
        clientName: '',
        company: '',
        email: '',
        phone: '',
        password: ''
      })

      // Redirect to clients page
      router.push('/sales/clients')
    } catch (error) {
      console.error('Failed to add client:', error)
      setError(error instanceof Error ? error.message : 'Failed to add client')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (field: keyof AddClientRequest, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  return (
    <div className="p-6">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <Link href="/sales/clients" className="flex items-center text-blue-600 hover:text-blue-800 mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Clients
          </Link>
          <h1 className="text-3xl font-bold text-slate-800">Add New Client</h1>
          <p className="text-slate-600 mt-2">Create a new client account in the system</p>
        </div>

        {/* Add Client Form */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <UserPlus className="h-5 w-5" />
              <span>Client Information</span>
            </CardTitle>
            <CardDescription>
              Fill in the details below to create a new client account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="clientName">Client Name *</Label>
                  <Input
                    id="clientName"
                    value={formData.clientName}
                    onChange={(e) => handleChange('clientName', e.target.value)}
                    placeholder="Enter client's full name"
                    required
                    disabled={isSubmitting}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="company">Company *</Label>
                  <Input
                    id="company"
                    value={formData.company}
                    onChange={(e) => handleChange('company', e.target.value)}
                    placeholder="Enter company name"
                    required
                    disabled={isSubmitting}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  placeholder="Enter email address"
                  required
                  disabled={isSubmitting}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => handleChange('phone', e.target.value)}
                  placeholder="Enter phone number"
                  required
                  disabled={isSubmitting}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password *</Label>
                <Input
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={(e) => handleChange('password', e.target.value)}
                  placeholder="Create password for client"
                  required
                  disabled={isSubmitting}
                />
                <p className="text-sm text-slate-500">
                  This password will be used by the client to log into their dashboard
                </p>
              </div>

              <div className="flex justify-end space-x-2 pt-4">
                <Link href="/sales/clients">
                  <Button type="button" variant="outline" disabled={isSubmitting}>
                    Cancel
                  </Button>
                </Link>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creating Client...
                    </>
                  ) : (
                    <>
                      <UserPlus className="mr-2 h-4 w-4" />
                      Create Client
                    </>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}