// src/app/(dashboard)/pm/upload-document/page.tsx - Fixed Document Upload for PMs
'use client'
import { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { apiClient } from '@/lib/api-config'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Progress } from '@/components/ui/progress'
import { 
  ArrowLeft, 
  Upload, 
  FileText, 
  Loader2,
  CheckCircle,
  AlertCircle,
  X
} from 'lucide-react'
import { toast } from '@/hooks/use-toast'
import Link from 'next/link'

interface PMProject {
  id: number
  title: string
  client: {
    id: number
    clientName: string
    company: string
    email: string
    phone: string
    projects: string[]
  } | null // Make client nullable to match API response
  clientId: number
  description: string
  pricing: number
  timeline: string
  status: string
  paidPercentage: number
  percentage: number
  pmId: number
  documents: Array<{
    id: number
    documentUrl: string
  }>
}

interface ClientInfo {
  id: number
  email: string
}

interface UploadedDocument {
  file: File
  url: string
  uploading: boolean
  progress: number
  error?: string
}

export default function UploadDocumentPage() {
  const { user } = useAuth()
  const [projects, setProjects] = useState<PMProject[]>([])
  const [clients, setClients] = useState<ClientInfo[]>([])
  const [selectedProject, setSelectedProject] = useState<string>('')
  const [uploadedDocument, setUploadedDocument] = useState<UploadedDocument | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLoadingProjects, setIsLoadingProjects] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    if (user?.id) {
      fetchData()
    }
  }, [user])

  const fetchData = async () => {
    try {
      setIsLoadingProjects(true)
      const [projectsData, clientsData] = await Promise.all([
        apiClient.getPMProjects(user!.id),
        apiClient.getSalesClients() // Fetch clients to get client info
      ])
      setProjects(projectsData)
      setClients(clientsData)
    } catch (error) {
      console.error('Failed to fetch projects:', error)
      setError('Failed to load projects')
    } finally {
      setIsLoadingProjects(false)
    }
  }

  const getClientInfo = (project: PMProject) => {
    // If project has client object, use it
    if (project.client) {
      return project.client
    }
    
    // Otherwise, try to find client in the clients list
    const clientFromList = clients.find(c => c.id === project.clientId)
    
    // Return fallback client info
    return {
      id: project.clientId,
      clientName: clientFromList?.email.split('@')[0] || `Client-${project.clientId}`,
      company: 'Unknown Company',
      email: clientFromList?.email || `client-${project.clientId}@unknown.com`,
      phone: 'N/A',
      projects: []
    }
  }

  const handleFileUpload = async (file: File) => {
    const maxSize = 10 * 1024 * 1024 // 10MB
    
    if (file.size > maxSize) {
      toast({
        title: "File too large",
        description: "File must be smaller than 10MB",
        variant: "destructive",
      })
      return
    }

    const newDocument: UploadedDocument = {
      file,
      url: '',
      uploading: true,
      progress: 0
    }

    setUploadedDocument(newDocument)

    try {
      const formData = new FormData()
      formData.append('file', file)

      const uploadedUrl = await apiClient.uploadDocument(formData, (progress) => {
        setUploadedDocument(prev => 
          prev ? { ...prev, progress } : null
        )
      })

      setUploadedDocument(prev => 
        prev ? { ...prev, uploading: false, url: uploadedUrl, progress: 100 } : null
      )

      toast({
        title: "Upload successful",
        description: `${file.name} uploaded successfully`,
      })

    } catch (error) {
      console.error('Upload failed:', error)
      
      setUploadedDocument(prev => 
        prev ? { ...prev, uploading: false, error: 'Upload failed', progress: 0 } : null
      )

      toast({
        title: "Upload failed",
        description: `Failed to upload ${file.name}`,
        variant: "destructive",
      })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!selectedProject) {
      setError('Please select a project')
      return
    }

    if (!uploadedDocument || !uploadedDocument.url) {
      setError('Please upload a document')
      return
    }

    try {
      setIsSubmitting(true)

      const documentData = {
        projectId: parseInt(selectedProject),
        documentURL: uploadedDocument.url
      }

      await apiClient.submitPMDocument(documentData)

      toast({
        title: "Success",
        description: "Document submitted for admin approval",
      })

      // Reset form
      setSelectedProject('')
      setUploadedDocument(null)

    } catch (error) {
      console.error('Failed to submit document:', error)
      setError('Failed to submit document')
    } finally {
      setIsSubmitting(false)
    }
  }

  const removeDocument = () => {
    setUploadedDocument(null)
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  return (
    <div className="p-6">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <Link href="/pm" className="flex items-center text-blue-600 hover:text-blue-800 mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Link>
          <h1 className="text-3xl font-bold text-slate-800">Upload Document</h1>
          <p className="text-slate-600 mt-2">Submit project documents for admin approval</p>
        </div>

        {/* Upload Form */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Upload className="h-5 w-5" />
              <span>Document Submission</span>
            </CardTitle>
            <CardDescription>
              Select a project and upload your document
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
                <label className="text-sm font-medium">Select Project *</label>
                <Select 
                  value={selectedProject} 
                  onValueChange={setSelectedProject}
                  disabled={isSubmitting || isLoadingProjects}
                >
                  <SelectTrigger>
                    <SelectValue placeholder={isLoadingProjects ? "Loading projects..." : "Select a project"} />
                  </SelectTrigger>
                  <SelectContent>
                    {projects.map((project) => {
                      const clientInfo = getClientInfo(project)
                      return (
                        <SelectItem key={project.id} value={project.id.toString()}>
                          {project.title} - {clientInfo.clientName}
                        </SelectItem>
                      )
                    })}
                  </SelectContent>
                </Select>
              </div>

              {/* File Upload */}
              <div className="space-y-4">
                <label className="text-sm font-medium">Upload Document *</label>
                
                {!uploadedDocument ? (
                  <div className="border-2 border-dashed border-slate-300 rounded-lg p-8 text-center">
                    <Upload className="h-8 w-8 text-slate-400 mx-auto mb-4" />
                    <p className="text-sm text-slate-500 mb-4">
                      Choose a file to upload
                    </p>
                    <label className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 cursor-pointer">
                      <Upload className="h-4 w-4 mr-2" />
                      Browse Files
                      <input
                        type="file"
                        className="hidden"
                        accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png"
                        onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0])}
                        disabled={isSubmitting}
                      />
                    </label>
                    <p className="text-xs text-slate-400 mt-2">
                      Supports: PDF, DOC, DOCX, TXT, JPG, PNG (Max 10MB)
                    </p>
                  </div>
                ) : (
                  <div className="border rounded-lg p-4">
                    <div className="flex items-center space-x-3">
                      <FileText className="h-8 w-8 text-blue-600" />
                      <div className="flex-1">
                        <p className="font-medium">{uploadedDocument.file.name}</p>
                        <p className="text-sm text-slate-500">
                          {formatFileSize(uploadedDocument.file.size)}
                        </p>
                        
                        {uploadedDocument.uploading && (
                          <div className="mt-2">
                            <Progress value={uploadedDocument.progress} className="h-1" />
                            <p className="text-xs text-blue-600 mt-1">
                              Uploading... {uploadedDocument.progress}%
                            </p>
                          </div>
                        )}
                        
                        {uploadedDocument.url && !uploadedDocument.error && (
                          <div className="flex items-center mt-1">
                            <CheckCircle className="h-4 w-4 text-green-600 mr-1" />
                            <p className="text-xs text-green-600">Upload complete</p>
                          </div>
                        )}
                        
                        {uploadedDocument.error && (
                          <div className="flex items-center mt-1">
                            <AlertCircle className="h-4 w-4 text-red-600 mr-1" />
                            <p className="text-xs text-red-600">{uploadedDocument.error}</p>
                          </div>
                        )}
                      </div>
                      
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={removeDocument}
                        disabled={uploadedDocument.uploading}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex justify-end space-x-2 pt-4">
                <Link href="/pm">
                  <Button type="button" variant="outline" disabled={isSubmitting}>
                    Cancel
                  </Button>
                </Link>
                <Button 
                  type="submit" 
                  disabled={
                    isSubmitting || 
                    !selectedProject || 
                    !uploadedDocument?.url ||
                    uploadedDocument.uploading
                  }
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <FileText className="mr-2 h-4 w-4" />
                      Submit Document
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