// src/app/(dashboard)/pm/create-report/page.tsx - Fixed Create Report for PMs
'use client'
import { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { apiClient } from '@/lib/api-config'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { 
  ArrowLeft, 
  FileText, 
  Loader2,
  AlertCircle,
  Send
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

export default function CreateReportPage() {
  const { user } = useAuth()
  const [projects, setProjects] = useState<PMProject[]>([])
  const [clients, setClients] = useState<ClientInfo[]>([])
  const [selectedProject, setSelectedProject] = useState<string>('')
  const [reportContent, setReportContent] = useState<string>('')
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!selectedProject) {
      setError('Please select a project')
      return
    }

    if (!reportContent.trim()) {
      setError('Please enter report content')
      return
    }

    try {
      setIsSubmitting(true)

      const reportData = {
        report: reportContent,
        projectId: parseInt(selectedProject),
        pmId: user!.id
      }

      await apiClient.submitPMReport(reportData)

      toast({
        title: "Success",
        description: "Report submitted for admin approval",
      })

      // Reset form
      setSelectedProject('')
      setReportContent('')

    } catch (error) {
      console.error('Failed to submit report:', error)
      setError('Failed to submit report')
    } finally {
      setIsSubmitting(false)
    }
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
          <h1 className="text-3xl font-bold text-slate-800">Create Report</h1>
          <p className="text-slate-600 mt-2">Submit a progress report for your project</p>
        </div>

        {/* Report Form */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <FileText className="h-5 w-5" />
              <span>Project Report</span>
            </CardTitle>
            <CardDescription>
              Provide detailed information about project progress
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

              <div className="space-y-2">
                <label className="text-sm font-medium">Report Content *</label>
                <Textarea
                  value={reportContent}
                  onChange={(e) => setReportContent(e.target.value)}
                  placeholder="Provide detailed information about project progress, challenges, achievements, next steps, etc."
                  rows={12}
                  required
                  disabled={isSubmitting}
                />
                <p className="text-xs text-slate-500">
                  Include progress updates, milestones achieved, current challenges, and next steps
                </p>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-medium text-blue-900 mb-2">Report Guidelines</h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Include specific progress updates and metrics</li>
                  <li>• Mention any blockers or challenges faced</li>
                  <li>• Outline completed milestones and deliverables</li>
                  <li>• Provide timeline for upcoming tasks</li>
                  <li>• Note any client communication or feedback</li>
                </ul>
              </div>

              <div className="flex justify-end space-x-2 pt-4">
                <Link href="/pm">
                  <Button type="button" variant="outline" disabled={isSubmitting}>
                    Cancel
                  </Button>
                </Link>
                <Button 
                  type="submit" 
                  disabled={isSubmitting || !selectedProject || !reportContent.trim()}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" />
                      Submit Report
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