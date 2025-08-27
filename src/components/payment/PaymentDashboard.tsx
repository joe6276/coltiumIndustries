"use client"
import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Eye, CreditCard, CheckCircle, Clock, ArrowLeft, DollarSign, FileText, Users, Calendar, LogOut } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import ProjectRequestForm from './ProjectRequestForm'
import PaymentTermsModal from './PaymentTermsModal'
import PaymentCheckout from './PaymentCheckout'
import { api } from '@/lib/api'

interface Project {
  id: number
  title: string
  projectType: string
  description: string
  budget: string
  timeline: string
  requirement: string
  name: string
  email: string
  phone: string
  userId: number
  preAgreement: boolean
  tc: boolean
}

const PaymentDashboard = () => {
  const { user, logout } = useAuth()
  const router = useRouter()
  const [currentView, setCurrentView] = useState('dashboard')
  const [currentRequest, setCurrentRequest] = useState<any>(null)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!user) {
      router.push('/login')
      return
    }
    loadProjects()
  }, [user, router])

  const loadProjects = async () => {
    if (!user?.token) return
    
    try {
      setLoading(true)
      const projectsData = await api.getProjects(user.token)
      setProjects(projectsData || [])
    } catch (error) {
      console.error('Error loading projects:', error)
      setError('Failed to load projects')
    } finally {
      setLoading(false)
    }
  }

  const handleCreateProject = () => {
    setCurrentRequest(null)
    setSelectedProject(null)
    setCurrentView('create')
  }

  const handleProjectSubmit = (projectData: any) => {
    setCurrentRequest(projectData)
    setSelectedProject(null)
    setCurrentView('terms')
  }

  const handleTermsAccept = () => {
    setCurrentView('checkout')
  }

  const handlePaymentSuccess = async () => {
    await loadProjects() // Reload projects after successful payment
    setCurrentView('dashboard')
    setCurrentRequest(null)
    setSelectedProject(null)
  }

  // Handle payment for existing pending project
  const handlePayExistingProject = (project: Project) => {
    
    // Convert the project data to the format expected by PaymentCheckout
    const projectData = {
      title: project.title,
      projectType: project.projectType,
      description: project.description,
      budget: project.budget,
      timeline: project.timeline,
      requirement: project.requirement,
      name: project.name,
      email: project.email,
      phone: project.phone,
      projectId: project.id, // Use the existing project ID
      userId: project.userId
    }

    setCurrentRequest(projectData)
    setSelectedProject(project)
    setCurrentView('checkout') // Skip terms modal for existing projects
  }

  // Handle viewing project details
  const handleViewProject = (project: Project) => {
    setSelectedProject(project)
    setCurrentView('view-project')
  }

  const getStatusIcon = (project: Project) => {
    // Since API doesn't have status field, we'll determine based on creation
    return <Clock className="h-4 w-4 text-yellow-500" />
  }

  const getPaymentStatusBadge = (project: Project) => {
    // Default to unpaid until payment is processed
    return (
      <span className="px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
        Pending Payment
      </span>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-primary text-white shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Payment Dashboard</h1>
              <p className="text-blue-100 mt-1">Welcome back, {user?.email}</p>
            </div>
            <div className="flex items-center space-x-4">
              {currentView !== 'dashboard' && (
                <Button 
                  variant="outline" 
                  onClick={() => setCurrentView('dashboard')}
                  className="text-white border-white hover:bg-white hover:text-primary"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Dashboard
                </Button>
              )}
              <Button 
                variant="outline" 
                onClick={logout}
                className="text-white border-white hover:bg-white hover:text-primary"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <AnimatePresence mode="wait">
          {currentView === 'dashboard' && (
            <motion.div 
              key="dashboard" 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              {/* Error Message */}
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <p className="text-red-800">{error}</p>
                </div>
              )}

              {/* Quick Actions */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                  className="bg-white rounded-lg shadow-sm border p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center space-x-3 mb-4">
                    <DollarSign className="h-8 w-8 text-blue-600" />
                    <div>
                      <h3 className="text-lg font-semibold">Subscription Plans</h3>
                      <p className="text-sm text-gray-600">Monthly & yearly plans</p>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-4">
                    Choose from our flexible subscription plans for ongoing technology solutions and support.
                  </p>
                  <Link href="/subscription">
                    <Button className="w-full">
                      <DollarSign className="h-4 w-4 mr-2" />
                      View Subscription Plans
                    </Button>
                  </Link>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="bg-white rounded-lg shadow-sm border p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center space-x-3 mb-4">
                    <FileText className="h-8 w-8 text-purple-600" />
                    <div>
                      <h3 className="text-lg font-semibold">Custom Project</h3>
                      <p className="text-sm text-gray-600">One-time development</p>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-4">
                    Request a custom development project with dedicated team and one-time payment.
                  </p>
                  <Button 
                    onClick={handleCreateProject}
                    className="w-full"
                    variant="outline"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Request Custom Project
                  </Button>
                </motion.div>
              </div>

              {/* Statistics Cards */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white rounded-lg shadow-sm border p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total Projects</p>
                      <p className="text-2xl font-bold text-gray-900">{projects.length}</p>
                    </div>
                    <FileText className="h-8 w-8 text-purple-500" />
                  </div>
                </div>
                <div className="bg-white rounded-lg shadow-sm border p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Pending Payment</p>
                      <p className="text-2xl font-bold text-gray-900">{projects.length}</p>
                    </div>
                    <Clock className="h-8 w-8 text-yellow-500" />
                  </div>
                </div>
                <div className="bg-white rounded-lg shadow-sm border p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Completed</p>
                      <p className="text-2xl font-bold text-gray-900">0</p>
                    </div>
                    <CheckCircle className="h-8 w-8 text-green-500" />
                  </div>
                </div>
                <div className="bg-white rounded-lg shadow-sm border p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total Investment</p>
                      <p className="text-2xl font-bold text-gray-900">$0</p>
                    </div>
                    <DollarSign className="h-8 w-8 text-green-500" />
                  </div>
                </div>
              </div>

              {/* Projects List */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white rounded-lg shadow-sm border overflow-hidden"
              >
                <div className="p-6 border-b">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-xl font-bold text-gray-900">Your Projects</h2>
                      <p className="text-gray-600">Manage your custom development projects</p>
                    </div>
                    <Button onClick={handleCreateProject}>
                      <Plus className="h-4 w-4 mr-2" />
                      New Project
                    </Button>
                  </div>
                </div>

                {projects.length === 0 ? (
                  <div className="p-12 text-center">
                    <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No projects yet</h3>
                    <p className="text-gray-600 mb-6">Get started by creating your first custom project</p>
                    <Button onClick={handleCreateProject}>
                      <Plus className="h-4 w-4 mr-2" />
                      Create Your First Project
                    </Button>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-sm font-medium text-gray-900">Project Details</th>
                          <th className="px-6 py-3 text-left text-sm font-medium text-gray-900">Type</th>
                          <th className="px-6 py-3 text-left text-sm font-medium text-gray-900">Status</th>
                          <th className="px-6 py-3 text-left text-sm font-medium text-gray-900">Budget</th>
                          <th className="px-6 py-3 text-left text-sm font-medium text-gray-900">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {projects.map((project, index) => (
                          <motion.tr 
                            key={project.id} 
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="hover:bg-gray-50 transition-colors"
                          >
                            <td className="px-6 py-4">
                              <div>
                                <div className="font-medium text-gray-900">{project.title}</div>
                                <div className="text-sm text-gray-600 max-w-xs truncate">
                                  {project.description}
                                </div>
                                <div className="text-xs text-gray-500 mt-1">
                                  Timeline: {project.timeline}
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <span className="px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                                {project.projectType}
                              </span>
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex items-center space-x-2">
                                {getStatusIcon(project)}
                                {getPaymentStatusBadge(project)}
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <span className="font-medium text-gray-900">{project.budget}</span>
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex space-x-2">
                                <Button 
                                  size="sm" 
                                  variant="outline" 
                                  title="View Details"
                                  onClick={() => handleViewProject(project)}
                                >
                                  <Eye className="h-4 w-4" />
                                </Button>
                                <Button 
                                  size="sm" 
                                  className="bg-green-600 hover:bg-green-700" 
                                  title="Complete Payment"
                                  onClick={() => handlePayExistingProject(project)}
                                >
                                  <CreditCard className="h-4 w-4 mr-1" />
                                  Pay Now
                                </Button>
                              </div>
                            </td>
                          </motion.tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </motion.div>
            </motion.div>
          )}

          {/* View Project Details */}
          {currentView === 'view-project' && selectedProject && (
            <motion.div 
              key="view-project" 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-4xl mx-auto"
            >
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="bg-primary text-white p-6">
                  <h2 className="text-2xl font-bold">Project Details</h2>
                  <p className="text-blue-100 mt-1">Review your project information</p>
                </div>

                <div className="p-6 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Project Title</label>
                      <div className="p-3 bg-gray-50 rounded-lg">{selectedProject.title}</div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Project Type</label>
                      <div className="p-3 bg-gray-50 rounded-lg">{selectedProject.projectType}</div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                    <div className="p-3 bg-gray-50 rounded-lg">{selectedProject.description}</div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Budget Range</label>
                      <div className="p-3 bg-gray-50 rounded-lg">{selectedProject.budget}</div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Timeline</label>
                      <div className="p-3 bg-gray-50 rounded-lg">{selectedProject.timeline}</div>
                    </div>
                  </div>

                  {selectedProject.requirement && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Technical Requirements</label>
                      <div className="p-3 bg-gray-50 rounded-lg">{selectedProject.requirement}</div>
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Contact Name</label>
                      <div className="p-3 bg-gray-50 rounded-lg">{selectedProject.name}</div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                      <div className="p-3 bg-gray-50 rounded-lg">{selectedProject.email}</div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                      <div className="p-3 bg-gray-50 rounded-lg">{selectedProject.phone || 'Not provided'}</div>
                    </div>
                  </div>

                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <div className="flex items-center">
                      <Clock className="h-5 w-5 text-yellow-600 mr-2" />
                      <div>
                        <h4 className="font-medium text-yellow-800">Payment Pending</h4>
                        <p className="text-sm text-yellow-700 mt-1">
                          Complete payment to initiate project development and receive detailed proposal.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between pt-6 border-t">
                    <Button variant="outline" onClick={() => setCurrentView('dashboard')}>
                      <ArrowLeft className="h-4 w-4 mr-2" />
                      Back to Dashboard
                    </Button>
                    <Button 
                      onClick={() => handlePayExistingProject(selectedProject)}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      <CreditCard className="h-4 w-4 mr-2" />
                      Complete Payment
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {currentView === 'create' && (
            <motion.div 
              key="create" 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <ProjectRequestForm
                onSubmit={handleProjectSubmit}
                onCancel={() => setCurrentView('dashboard')}
              />
            </motion.div>
          )}

          {currentView === 'terms' && (
            <PaymentTermsModal
              isOpen={true}
              onClose={() => setCurrentView('create')}
              onAccept={handleTermsAccept}
              projectData={currentRequest}
            />
          )}

          {currentView === 'checkout' && (
            <motion.div 
              key="checkout" 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <PaymentCheckout
                projectData={currentRequest}
                onSuccess={handlePaymentSuccess}
                onCancel={() => {
                  // If coming from existing project, go back to dashboard
                  // If coming from new project, go back to terms
                  if (selectedProject) {
                    setCurrentView('dashboard')
                  } else {
                    setCurrentView('terms')
                  }
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  )
}

export default PaymentDashboard