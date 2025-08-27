// src/app/(dashboard)/client/documents/page.tsx - Documents Page
'use client'
import { useEffect, useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { apiClient } from '@/lib/api-config'
import { ClientProject } from '@/lib/types/api'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { 
  FileText, 
  Download, 
  Search, 
  ExternalLink,
  FolderOpen,
  Calendar
} from 'lucide-react'

export default function ClientDocumentsPage() {
  const { user } = useAuth()
  const [projects, setProjects] = useState<ClientProject[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [isLoading, setIsLoading] = useState(true)
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
      setError('Failed to load documents')
    } finally {
      setIsLoading(false)
    }
  }

  const getAllDocuments = () => {
    const allDocs: Array<{
      document: any,
      projectTitle: string,
      projectId: number,
      index: number
    }> = []
    
    projects.forEach(project => {
      if (project.documents && project.documents.length > 0) {
        project.documents.forEach((doc, index) => {
          allDocs.push({
            document: doc,
            projectTitle: project.title,
            projectId: project.id,
            index: index
          })
        })
      }
    })
    
    return allDocs.filter(item =>
      item.projectTitle.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }

  const handleDownload = (documentUrl: string, fileName: string) => {
    const a = document.createElement('a')
    a.href = documentUrl
    a.download = fileName
    a.click()
  }

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-slate-200 rounded w-1/3"></div>
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-24 bg-slate-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  const documents = getAllDocuments()

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800">My Documents</h1>
        <p className="text-slate-600 mt-2">Access and download your project documents</p>
      </div>

      {/* Error Alert */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-800">{error}</p>
          <button 
            onClick={fetchProjects}
            className="mt-2 text-sm text-red-600 hover:text-red-800 underline"
          >
            Try Again
          </button>
        </div>
      )}

      {/* Search */}
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
            <Input
              placeholder="Search documents by project name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Documents List */}
      {documents.length > 0 ? (
        <div className="space-y-4">
          {documents.map((item, index) => (
            <Card key={`${item.projectId}-${item.index}`}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <FileText className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-slate-800">
                        Document {item.index + 1}
                      </h4>
                      <p className="text-sm text-slate-500">{item.projectTitle}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <Badge variant="outline" className="text-xs">
                          Project #{item.projectId}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => window.open(item.document.documentUrl, '_blank')}
                    >
                      <ExternalLink className="h-4 w-4 mr-1" />
                      View
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => handleDownload(
                        item.document.documentUrl, 
                        `${item.projectTitle}-doc-${item.index + 1}`
                      )}
                    >
                      <Download className="h-4 w-4 mr-1" />
                      Download
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="py-12">
            <div className="text-center">
              <FolderOpen className="h-12 w-12 text-slate-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-slate-700 mb-2">No documents found</h3>
              <p className="text-slate-500">
                {searchTerm ? 'No documents match your search' : 'Documents will appear here when they are uploaded to your projects'}
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}