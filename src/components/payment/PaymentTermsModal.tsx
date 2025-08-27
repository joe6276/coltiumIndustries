"use client"

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, X, Shield, DollarSign, Clock, FileText } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'

interface PaymentTermsModalProps {
  isOpen: boolean
  onClose: () => void
  onAccept: () => void
  projectData: any
}

const PaymentTermsModal: React.FC<PaymentTermsModalProps> = ({ 
  isOpen, 
  onClose, 
  onAccept, 
  projectData 
}) => {
  const [acceptedTerms, setAcceptedTerms] = useState(false)
  const [confirmedConsultation, setConfirmedConsultation] = useState(false)

  const handleProceed = () => {
    if (acceptedTerms && confirmedConsultation) {
      onAccept()
    }
  }

  if (!isOpen) return null

  const keyTerms = [
    {
      icon: DollarSign,
      title: "Payment Terms",
      description: "Full payment required upfront before project initiation. No work begins without confirmed payment."
    },
    {
      icon: FileText,
      title: "Scope Lock-In", 
      description: "Project scope is finalized after payment. Any changes require separate approval and additional costs."
    },
    {
      icon: Shield,
      title: "Intellectual Property",
      description: "You own final deliverables upon payment. Coltium retains proprietary frameworks and methodologies."
    },
    {
      icon: Clock,
      title: "Timeline & Support",
      description: "Delivery estimates may vary due to complexity. Includes 14-day complimentary post-delivery support."
    }
  ]

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-2 sm:p-4 bg-black bg-opacity-50 overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="bg-white rounded-lg sm:rounded-2xl shadow-2xl w-full max-w-4xl my-4 sm:my-8 min-h-fit"
      >
        {/* Header - Fixed */}
        <div className="bg-primary text-white p-4 sm:p-6 flex items-center justify-between sticky top-0 z-10">
          <div className="min-w-0 flex-1">
            <h2 className="text-lg sm:text-2xl font-bold truncate">Terms & Conditions</h2>
            <p className="text-blue-100 mt-1 text-xs sm:text-sm">Custom Project Engagement Agreement v1.0</p>
          </div>
          <button 
            onClick={onClose} 
            className="p-1 sm:p-2 hover:bg-white/10 rounded-lg transition-colors ml-2 flex-shrink-0"
          >
            <X className="h-5 w-5 sm:h-6 sm:w-6" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-4 sm:p-6 space-y-4 sm:space-y-6 max-h-[calc(100vh-200px)] overflow-y-auto">
          {/* Project Summary */}
          <div className="bg-gray-50 rounded-lg p-4 sm:p-6">
            <h3 className="font-semibold text-gray-900 mb-3 sm:mb-4 flex items-center text-sm sm:text-base">
              <FileText className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
              Project Request Summary
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-xs sm:text-sm">
              <div>
                <span className="font-medium text-gray-700">Title:</span>
                <div className="text-gray-900 break-words">{projectData?.title}</div>
              </div>
              <div>
                <span className="font-medium text-gray-700">Type:</span>
                <div className="text-gray-900">{projectData?.projectType}</div>
              </div>
              <div>
                <span className="font-medium text-gray-700">Budget Range:</span>
                <div className="text-gray-900">{projectData?.budget}</div>
              </div>
              <div>
                <span className="font-medium text-gray-700">Timeline:</span>
                <div className="text-gray-900">{projectData?.timeline}</div>
              </div>
              <div className="sm:col-span-2">
                <span className="font-medium text-gray-700">Contact:</span>
                <div className="text-gray-900 break-words">
                  {projectData?.contactName} ({projectData?.contactEmail})
                </div>
              </div>
            </div>
          </div>

          {/* Key Terms Overview */}
          <div>
            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 sm:mb-4">Key Terms Overview</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4">
              {keyTerms.map((term, index) => {
                const Icon = term.icon
                return (
                  <div key={index} className="border border-gray-200 rounded-lg p-3 sm:p-4 hover:border-primary/30 transition-colors">
                    <div className="flex items-start space-x-2 sm:space-x-3">
                      <Icon className="h-5 w-5 sm:h-6 sm:w-6 text-primary mt-0.5 sm:mt-1 flex-shrink-0" />
                      <div className="min-w-0">
                        <h4 className="font-semibold text-gray-900 mb-1 text-sm sm:text-base">{term.title}</h4>
                        <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">{term.description}</p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Important Notice */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 sm:p-4">
            <h4 className="font-semibold text-yellow-800 mb-2 flex items-center text-sm sm:text-base">
              ⚠️ Pre-Payment Requirements
            </h4>
            <div className="text-yellow-700 text-xs sm:text-sm space-y-2 leading-relaxed">
              <p>
                <strong>Payment is required upfront</strong> to secure your project slot and begin development. 
                This ensures dedicated resource allocation and project priority.
              </p>
              <p>
                After payment, you'll receive a detailed project proposal, timeline, and team assignment within 24-48 hours.
              </p>
            </div>
          </div>

          {/* Detailed Terms */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 text-xs sm:text-sm">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2 sm:mb-3 text-sm sm:text-base">Payment & Refunds</h4>
              <ul className="space-y-1 sm:space-y-2 text-gray-600 leading-relaxed">
                <li>• Full payment required before project initiation</li>
                <li>• No refunds once development phase begins</li>
                <li>• All applicable taxes are client responsibility</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-2 sm:mb-3 text-sm sm:text-base">Delivery & Timeline</h4>
              <ul className="space-y-1 sm:space-y-2 text-gray-600 leading-relaxed">
                <li>• Timelines are estimates based on project complexity</li>
                <li>• Client delays don't extend our delivery commitments</li>
                <li>• 14-day complimentary support post-delivery</li>
                <li>• Force majeure events may affect schedules</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-2 sm:mb-3 text-sm sm:text-base">Intellectual Property</h4>
              <ul className="space-y-1 sm:space-y-2 text-gray-600 leading-relaxed">
                <li>• Client owns final deliverables upon full payment</li>
                <li>• Coltium retains proprietary tools and frameworks</li>
                <li>• Portfolio rights reserved unless NDA specified</li>
                <li>• Open-source components retain original licenses</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-2 sm:mb-3 text-sm sm:text-base">Legal & Liability</h4>
              <ul className="space-y-1 sm:space-y-2 text-gray-600 leading-relaxed">
                <li>• Governed by Delaware state law, USA</li>
                <li>• Liability limited to project amount paid</li>
                <li>• 24-month confidentiality period applies</li>
                <li>• Disputes resolved through arbitration</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Footer - Fixed */}
        <div className="border-t bg-gray-50 p-4 sm:p-6 sticky bottom-0">
          <div className="space-y-3 sm:space-y-4">
            <div className="flex items-start space-x-2 sm:space-x-3">
              <Checkbox
                checked={confirmedConsultation}
                onCheckedChange={setConfirmedConsultation}
                className="mt-1 flex-shrink-0"
              />
              <div className="min-w-0">
                <label className="text-xs sm:text-sm font-medium text-gray-900 cursor-pointer">
                  Pre-Agreement Confirmation *
                </label>
                <p className="text-xs sm:text-sm text-gray-600 mt-1 leading-relaxed">
                  I understand this is a custom project request requiring upfront payment. 
                  Detailed project scope and timeline will be provided after payment confirmation.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-2 sm:space-x-3">
              <Checkbox
                checked={acceptedTerms}
                onCheckedChange={setAcceptedTerms}
                className="mt-1 flex-shrink-0"
              />
              <div className="min-w-0">
                <label className="text-xs sm:text-sm font-medium text-gray-900 cursor-pointer">
                  Terms & Conditions Agreement *
                </label>
                <p className="text-xs sm:text-sm text-gray-600 mt-1 leading-relaxed">
                  I have read and agree to the Terms & Conditions of Project Engagement v1.0
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-between gap-3 mt-4 sm:mt-6">
            <Button 
              variant="outline" 
              onClick={onClose}
              className="w-full sm:w-auto order-2 sm:order-1"
              size="sm"
            >
              <ArrowLeft className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
              Back to Project Details
            </Button>
            <Button 
              onClick={handleProceed} 
              disabled={!acceptedTerms || !confirmedConsultation}
              className="w-full sm:w-auto sm:min-w-[180px] order-1 sm:order-2"
              size="sm"
            >
              Proceed to Payment
              <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4 ml-2" />
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default PaymentTermsModal