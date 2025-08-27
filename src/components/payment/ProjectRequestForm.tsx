//src/components/payment/ProjectRequestForm.tsx
"use client"

import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { ArrowLeft, ArrowRight, FileText } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useAuth } from '@/contexts/AuthContext'
import { api } from '@/lib/api'

const PROJECT_TYPES = [
  'Hardware Design',
  'Embedded Systems', 
  'Software Development',
  'AI/ML Integration',
  'Web/Mobile App',
  'IoT Product',
  'Electronics R&D',
  'Custom Tooling'
]

const BUDGET_RANGES = [
  'Under $5,000',
  '$5,000 - $15,000', 
  '$15,000 - $50,000',
  '$50,000 - $100,000',
  'Above $100,000',
  'To be discussed'
]

// Updated schema to match API requirements exactly
const projectSchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters'),
  projectType: z.string().min(1, 'Please select a project type'),
  description: z.string().min(20, 'Description must be at least 20 characters'),
  budget: z.string().min(1, 'Please select a budget range'),
  timeline: z.string().min(1, 'Timeline is required'),
  requirement: z.string().optional().default(''), // Ensure it's always a string
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().optional().default(''), // Ensure it's always a string
})

type ProjectFormData = z.infer<typeof projectSchema>

interface ProjectRequestFormProps {
  onSubmit: (data: any) => void
  onCancel: () => void
}

const ProjectRequestForm: React.FC<ProjectRequestFormProps> = ({ onSubmit, onCancel }) => {
  const { user } = useAuth()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<ProjectFormData>({
    resolver: zodResolver(projectSchema),
    mode: 'onChange',
    defaultValues: {
      email: user?.email || '',
      requirement: '',
      phone: ''
    }
  })

  const handleFormSubmit = async (data: ProjectFormData) => {
    try {
      if (!user?.token) {
        throw new Error('Authentication required')
      }

     

      // Create project payload matching the API schema exactly
      const projectPayload = {
        title: data.title,
        projectType: data.projectType,
        description: data.description,
        budget: data.budget,
        timeline: data.timeline,
        requirement: data.requirement || '', // Ensure it's never undefined
        name: data.name,
        email: data.email,
        phone: data.phone || '', // Ensure it's never undefined
        userId: parseInt(user.id.toString()), // Ensure it's a number
        preAgreement: true, // Set to true since they're proceeding
        tc: true // Set to true since they're proceeding
      }


      const response = await api.createProject(projectPayload, user.token)
      
      
      // Handle different possible response formats
      if (response) {
        // Check if response has the expected format: { userId: number, projectId: number }
        if (response.projectId && response.userId) {
          onSubmit({
            ...data,
            projectId: response.projectId,
            userId: response.userId
          })
        }
        // Handle case where response might just be the projectId (number)
        else if (typeof response === 'number') {
          onSubmit({
            ...data,
            projectId: response,
            userId: user.id
          })
        }
        // Handle case where response has projectId but no userId
        else if (response.projectId) {
          onSubmit({
            ...data,
            projectId: response.projectId,
            userId: user.id
          })
        }
        // Try to extract projectId from any property that might contain it
        else if (response.id) {
          onSubmit({
            ...data,
            projectId: response.id,
            userId: user.id
          })
        }
        else {
          console.error('Unexpected response format - no recognizable project ID:', response)
          // Still try to proceed if the API call was successful
          onSubmit({
            ...data,
            projectId: Date.now(), // Temporary fallback
            userId: user.id
          })
        }
      } else {
        console.error('Empty response from server')
        throw new Error('Empty response from server')
      }
    } catch (error: any) {
      console.error('Error creating project:', error)
      
      // Show more specific error message
      let errorMessage = 'Failed to create project. Please try again.'
      if (error.message) {
        errorMessage = error.message
      }
      
      alert(errorMessage)
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="bg-primary text-white p-6">
          <div className="flex items-center space-x-3">
            <FileText className="h-8 w-8" />
            <div>
              <h2 className="text-2xl font-bold">Custom Project Request</h2>
              <p className="text-blue-100 mt-1">Tell us about your custom project requirements</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit(handleFormSubmit)} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Project Title *
              </label>
              <Input
                {...register('title')}
                placeholder="E.g., Custom IoT Sensor Development"
                className={errors.title ? 'border-red-300' : ''}
              />
              {errors.title && (
                <p className="text-red-600 text-sm mt-1">{errors.title.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Project Type *
              </label>
              <select
                {...register('projectType')}
                className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary ${
                  errors.projectType ? 'border-red-300' : 'border-gray-300'
                }`}
              >
                <option value="">Select project type</option>
                {PROJECT_TYPES.map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
              {errors.projectType && (
                <p className="text-red-600 text-sm mt-1">{errors.projectType.message}</p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Project Description *
            </label>
            <Textarea
              {...register('description')}
              rows={4}
              placeholder="Describe your project requirements, goals, and expected outcomes in detail..."
              className={errors.description ? 'border-red-300' : ''}
            />
            {errors.description && (
              <p className="text-red-600 text-sm mt-1">{errors.description.message}</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Budget Range *
              </label>
              <select
                {...register('budget')}
                className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary ${
                  errors.budget ? 'border-red-300' : 'border-gray-300'
                }`}
              >
                <option value="">Select budget range</option>
                {BUDGET_RANGES.map((range) => (
                  <option key={range} value={range}>{range}</option>
                ))}
              </select>
              {errors.budget && (
                <p className="text-red-600 text-sm mt-1">{errors.budget.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Preferred Timeline *
              </label>
              <Input
                {...register('timeline')}
                placeholder="E.g., 3-4 months"
                className={errors.timeline ? 'border-red-300' : ''}
              />
              {errors.timeline && (
                <p className="text-red-600 text-sm mt-1">{errors.timeline.message}</p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Technical Requirements & Features
            </label>
            <Textarea
              {...register('requirement')}
              rows={4}
              placeholder="List specific technical requirements, features, compliance needs, preferred technologies, etc."
            />
          </div>

          <div className="border-t pt-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Contact Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name *
                </label>
                <Input
                  {...register('name')}
                  placeholder="Your full name"
                  className={errors.name ? 'border-red-300' : ''}
                />
                {errors.name && (
                  <p className="text-red-600 text-sm mt-1">{errors.name.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <Input
                  type="email"
                  {...register('email')}
                  placeholder="your.email@company.com"
                  className={errors.email ? 'border-red-300' : ''}
                />
                {errors.email && (
                  <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <Input
                  {...register('phone')}
                  placeholder="+254 712 345 678"
                />
              </div>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-medium text-blue-900 mb-2">💡 What happens next?</h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Review and accept terms and conditions</li>
              <li>• Make secure payment to initiate project</li>
              <li>• Receive detailed project proposal within 24-48 hours</li>
              <li>• Project kickoff with dedicated team assignment</li>
            </ul>
          </div>

          <div className="flex justify-between pt-6 border-t">
            <Button type="button" variant="outline" onClick={onCancel}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Creating Project...' : 'Next: Review Terms'}
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ProjectRequestForm