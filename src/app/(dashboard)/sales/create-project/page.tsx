// src/app/(dashboard)/sales/create-project/page.tsx 
'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { apiClient } from '@/lib/api-config'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Progress } from '@/components/ui/progress'
import { 
  ArrowLeft, 
  Loader2, 
  FolderPlus, 
  Upload, 
  X, 
  FileText, 
  CheckCircle,
  AlertCircle,
  DollarSign,
  User
} from 'lucide-react'
import { toast } from '@/hooks/use-toast'
import Link from 'next/link'
import { CreateProjectRequest, SalesClient } from '@/lib/types/api'

interface UploadedDocument {
  file: File
  url: string
  uploading: boolean
  progress: number
  error?: string
}

export default function CreateProjectPage() {
  const { user } = useAuth()
  const [formData, setFormData] = useState<CreateProjectRequest>({
    title: '',
    clientId: 0,
    percentage: 0,
    salespersonId: 0, // Add salespersonId field
    description: '',
    pricing: 0,
    timeline: '',
    documents: []
  })
  const [clients, setClients] = useState<SalesClient[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLoadingClients, setIsLoadingClients] = useState(true)
  const [error, setError] = useState('')
  const [uploadedDocuments, setUploadedDocuments] = useState<UploadedDocument[]>([])
  const [isDragOver, setIsDragOver] = useState(false)
  const router = useRouter()

  // Set salesperson ID when user is loaded
  useEffect(() => {
    if (user?.id) {
      setFormData(prev => ({
        ...prev,
        salespersonId: user.id
      }))
    }
  }, [user])

  useEffect(() => {
    fetchClients()
  }, [])

  const fetchClients = async () => {
    try {
      setIsLoadingClients(true)
      const clientsData = await apiClient.getSalesClients()
      setClients(clientsData)
    } catch (error) {
      console.error('Failed to fetch clients:', error)
      setError('Failed to load clients')
    } finally {
      setIsLoadingClients(false)
    }
  }

  // Calculate upfront payment amount
  const calculateUpfrontAmount = () => {
    return (formData.pricing * formData.percentage) / 100
  }

  const handleFileUpload = async (files: FileList | File[]) => {
    const fileArray = Array.from(files)
    const maxFiles = 10
    const maxSize = 10 * 1024 * 1024 // 10MB
    
    if (uploadedDocuments.length + fileArray.length > maxFiles) {
      toast({
        title: "Too many files",
        description: `Maximum ${maxFiles} documents allowed`,
        variant: "destructive",
      })
      return
    }

    for (const file of fileArray) {
      if (file.size > maxSize) {
        toast({
          title: "File too large",
          description: `${file.name} is larger than 10MB`,
          variant: "destructive",
        })
        continue
      }

      // Add file to upload queue
      const newDocument: UploadedDocument = {
        file,
        url: '',
        uploading: true,
        progress: 0
      }

      setUploadedDocuments(prev => [...prev, newDocument])

      try {
        // Upload file using FormData
        const formData = new FormData()
        formData.append('file', file)

        // Upload with progress tracking
        const uploadPromise = apiClient.uploadDocument(formData, (progress) => {
          setUploadedDocuments(prev => 
            prev.map(doc => 
              doc.file === file 
                ? { ...doc, progress } 
                : doc
            )
          )
        })

        const uploadedUrl = await uploadPromise

        // Update document with successful upload
        setUploadedDocuments(prev => 
          prev.map(doc => 
            doc.file === file 
              ? { ...doc, uploading: false, url: uploadedUrl, progress: 100 }
              : doc
          )
        )

        toast({
          title: "Upload successful",
          description: `${file.name} uploaded successfully`,
        })
      } catch (error) {
        console.error('Upload failed:', error)
        
        // Update document with error
        setUploadedDocuments(prev => 
          prev.map(doc => 
            doc.file === file 
              ? { ...doc, uploading: false, error: 'Upload failed', progress: 0 }
              : doc
          )
        )

        toast({
          title: "Upload failed",
          description: `Failed to upload ${file.name}`,
          variant: "destructive",
        })
      }
    }
  }

  const removeDocument = (index: number) => {
    setUploadedDocuments(prev => prev.filter((_, i) => i !== index))
  }

  const retryUpload = (index: number) => {
    const doc = uploadedDocuments[index]
    if (doc && doc.error) {
      handleFileUpload([doc.file])
      removeDocument(index)
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
    
    const files = e.dataTransfer.files
    if (files.length > 0) {
      handleFileUpload(files)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    // Validate required fields
    if (!user?.id) {
      setError('User not authenticated. Please log in again.')
      return
    }

    if (!formData.title || !formData.clientId || !formData.description || !formData.pricing || !formData.timeline) {
      setError('Please fill in all required fields')
      return
    }

    setIsSubmitting(true)

    // Check if any uploads are still in progress
    const stillUploading = uploadedDocuments.some(doc => doc.uploading)
    if (stillUploading) {
      setError('Please wait for all documents to finish uploading')
      setIsSubmitting(false)
      return
    }

    // Check for upload errors
    const hasErrors = uploadedDocuments.some(doc => doc.error)
    if (hasErrors) {
      setError('Please resolve upload errors before submitting')
      setIsSubmitting(false)
      return
    }

    try {
      // Prepare documents array with uploaded URLs
      const documents = uploadedDocuments
        .filter(doc => doc.url)
        .map(doc => ({ documentUrl: doc.url }))

      // Ensure salespersonId is set to current user
      const projectData: CreateProjectRequest = {
        ...formData,
        salespersonId: user.id, // Ensure this is always the current user's ID
        documents
      }

      console.log('Creating project with data:', projectData)
      
      const response = await apiClient.createProject(projectData)
      
      toast({
        title: "Success",
        description: `Project created successfully! Project ID: ${response.projectId}`,
      })

      // Reset form
      setFormData({
        title: '',
        clientId: 0,
        percentage: 0,
        salespersonId: user.id, // Keep the salesperson ID
        description: '',
        pricing: 0,
        timeline: '',
        documents: []
      })
      setUploadedDocuments([])

      // Redirect to projects page
      router.push('/sales/projects')
    } catch (error) {
      console.error('Failed to create project:', error)
      setError(error instanceof Error ? error.message : 'Failed to create project')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (field: keyof CreateProjectRequest, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  // Show loading if user is not yet loaded
  if (!user) {
    return (
      <div className="p-6">
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardContent className="p-8 text-center">
              <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
              <p>Loading user information...</p>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <Link href="/sales/projects" className="flex items-center text-blue-600 hover:text-blue-800 mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Projects
          </Link>
          <h1 className="text-3xl font-bold text-slate-800">Create New Project</h1>
          <p className="text-slate-600 mt-2">Set up a new project for your client</p>
        </div>

        {/* Salesperson Info Card */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <User className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="font-medium text-slate-800">Salesperson</p>
                <p className="text-sm text-slate-600">{user.email} (ID: {user.id})</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Create Project Form */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <FolderPlus className="h-5 w-5" />
              <span>Project Details</span>
            </CardTitle>
            <CardDescription>
              Fill in the project information below
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <Label htmlFor="title">Project Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => handleChange('title', e.target.value)}
                  placeholder="Enter project title"
                  required
                  disabled={isSubmitting}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="clientId">Select Client *</Label>
                <Select 
                  value={formData.clientId.toString()} 
                  onValueChange={(value) => handleChange('clientId', parseInt(value))}
                  disabled={isSubmitting || isLoadingClients}
                >
                  <SelectTrigger>
                    <SelectValue placeholder={isLoadingClients ? "Loading clients..." : "Select a client"} />
                  </SelectTrigger>
                  <SelectContent>
                    {clients.map((client) => (
                      <SelectItem key={client.id} value={client.id.toString()}>
                        {client.email} (ID: {client.id})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {clients.length === 0 && !isLoadingClients && (
                  <p className="text-sm text-amber-600">
                    No clients found. <Link href="/sales/add-client" className="underline">Add a client first</Link>
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleChange('description', e.target.value)}
                  placeholder="Describe the project scope and objectives"
                  rows={4}
                  required
                  disabled={isSubmitting}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="pricing">Total Project Price (USD) *</Label>
                  <Input
                    id="pricing"
                    type="number"
                    step="0.01"
                    value={formData.pricing}
                    onChange={(e) => handleChange('pricing', parseFloat(e.target.value) || 0)}
                    placeholder="50000"
                    required
                    disabled={isSubmitting}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="timeline">Timeline *</Label>
                  <Input
                    id="timeline"
                    value={formData.timeline}
                    onChange={(e) => handleChange('timeline', e.target.value)}
                    placeholder="3 months"
                    required
                    disabled={isSubmitting}
                  />
                </div>
              </div>

              {/* Upfront Payment Section */}
              <div className="space-y-4 p-4 bg-slate-50 rounded-lg border">
                <div className="flex items-center space-x-2">
                  <DollarSign className="h-5 w-4 text-green-600" />
                  <Label className="text-base font-medium">Upfront Payment Settings</Label>
                </div>
                <p className="text-sm text-slate-600">
                  Set the percentage of the total project price that must be paid before work begins
                </p>
                
                <div className="space-y-2">
                  <Label htmlFor="percentage">Upfront Payment Percentage (%)</Label>
                  <Input
                    id="percentage"
                    type="number"
                    min="0"
                    max="100"
                    value={formData.percentage}
                    onChange={(e) => handleChange('percentage', parseInt(e.target.value) || 0)}
                    placeholder="30"
                    disabled={isSubmitting}
                  />
                  <div className="text-sm text-slate-600">
                    <p>
                      <span className="font-medium">Upfront Amount: </span>
                      ${calculateUpfrontAmount().toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </p>
                    <p>
                      <span className="font-medium">Remaining Amount: </span>
                      ${(formData.pricing - calculateUpfrontAmount()).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </p>
                  </div>
                </div>
                {formData.percentage > 0 && (
                  <div className="p-3 bg-blue-50 border border-blue-200 rounded">
                    <p className="text-sm text-blue-800">
                      <strong>Note:</strong> The client will need to pay ${calculateUpfrontAmount().toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ({formData.percentage}%) before the project can begin.
                    </p>
                  </div>
                )}
              </div>

              {/* Document Upload Section */}
              <div className="space-y-4">
                <Label>Project Documents (Optional)</Label>
                
                {/* Upload Area */}
                <div
                  className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
                    isDragOver 
                      ? 'border-blue-400 bg-blue-50' 
                      : 'border-slate-300 hover:border-slate-400'
                  }`}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                >
                  <Upload className="h-8 w-8 text-slate-400 mx-auto mb-2" />
                  <p className="text-sm text-slate-500 mb-2">
                    Drag and drop files here, or{' '}
                    <label className="text-blue-600 hover:text-blue-800 cursor-pointer underline">
                      browse
                      <input
                        type="file"
                        multiple
                        className="hidden"
                        accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png,.zip"
                        onChange={(e) => e.target.files && handleFileUpload(e.target.files)}
                        disabled={isSubmitting}
                      />
                    </label>
                  </p>
                  <p className="text-xs text-slate-400">
                    Supports: PDF, DOC, DOCX, TXT, JPG, PNG, ZIP (Max 10MB each, 10 files total)
                  </p>
                </div>

                {/* Uploaded Documents List */}
                {uploadedDocuments.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="font-medium text-slate-700">Uploaded Documents ({uploadedDocuments.length}/10)</h4>
                    <div className="space-y-2 max-h-60 overflow-y-auto">
                      {uploadedDocuments.map((doc, index) => (
                        <div key={index} className="flex items-center space-x-3 p-3 bg-slate-50 rounded border">
                          <FileText className="h-5 w-5 text-slate-400 flex-shrink-0" />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-slate-700 truncate">
                              {doc.file.name}
                            </p>
                            <p className="text-xs text-slate-500">
                              {formatFileSize(doc.file.size)}
                            </p>
                            
                            {/* Upload Progress */}
                            {doc.uploading && (
                              <div className="mt-1">
                                <Progress value={doc.progress} className="h-1" />
                                <p className="text-xs text-blue-600 mt-1">Uploading... {doc.progress}%</p>
                              </div>
                            )}
                            
                            {/* Success State */}
                            {!doc.uploading && doc.url && !doc.error && (
                              <div className="flex items-center mt-1">
                                <CheckCircle className="h-3 w-3 text-green-600 mr-1" />
                                <p className="text-xs text-green-600">Upload complete</p>
                              </div>
                            )}
                            
                            {/* Error State */}
                            {doc.error && (
                              <div className="flex items-center mt-1">
                                <AlertCircle className="h-3 w-3 text-red-600 mr-1" />
                                <p className="text-xs text-red-600">{doc.error}</p>
                              </div>
                            )}
                          </div>
                          
                          <div className="flex items-center space-x-1">
                            {/* Retry Button for Failed Uploads */}
                            {doc.error && (
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => retryUpload(index)}
                                className="h-6 px-2 text-xs"
                              >
                                Retry
                              </Button>
                            )}
                            
                            {/* Remove Button */}
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => removeDocument(index)}
                              className="h-6 w-6 p-0 hover:bg-red-100"
                              disabled={doc.uploading}
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="flex justify-end space-x-2 pt-4">
                <Link href="/sales/projects">
                  <Button type="button" variant="outline" disabled={isSubmitting}>
                    Cancel
                  </Button>
                </Link>
                <Button 
                  type="submit" 
                  disabled={
                    isSubmitting || 
                    clients.length === 0 || 
                    uploadedDocuments.some(doc => doc.uploading || doc.error) ||
                    !formData.title ||
                    !formData.clientId ||
                    !formData.description ||
                    !formData.pricing ||
                    !formData.timeline
                  }
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creating Project...
                    </>
                  ) : (
                    <>
                      <FolderPlus className="mr-2 h-4 w-4" />
                      Create Project
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