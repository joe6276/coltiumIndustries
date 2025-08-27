// src/lib/types/api.ts 
export interface LoginRequest {
  email: string
  password: string
}

export interface LoginResponse {
  role: string
  id: number
  email: string
  token: string
  clientId: number
}

export interface User {
  id: number
  name: string
  email: string
  phone: string
  role: number
}

export interface CreateUserRequest {
  name: string
  email: string
  phone: string
  password: string
  role: number
}

// Admin specific types
export interface RequestedProject {
  id: number
  title: string
  client: {
    id: number
    clientName: string
    company: string
    email: string
    phone: string
    projects: string[]
  } | null
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

export interface AdminDocument {
  id: number
  projectId: number
  pmId: number
  documentURL: string
  isApproved: boolean
}

export interface AdminReport {
  projectId: number
  documentURL: string
}

export interface AssignPMRequest {
  userId: number
  projectId: number
}
export interface AdminDocumentResponse {
  id: number
  documentUrl: string  // Note: API response uses 'documentUrl'
  title: string
  description: string
  timeline: string
  pm: string
  pmEmail: string
}

// Reports API response - /api/Admin/reports  
export interface AdminReportResponse {
  id: number
  report: string  // The actual report content
  title: string
  description: string
  timeline: string
  pm: string
  pmEmail: string
}

// PM specific types
export interface PMReportRequest {
  report: string
  projectId: number
  pmId: number
}

export interface PMDocumentRequest {
  projectId: number
  documentURL: string
}

export interface PMDocumentResponse {
  id: number
  documentUrl: string
  title: string
  description: string
  timeline: string
  pm: string
  pmEmail: string
}

// Sales Types
export interface AddClientRequest {
  clientName: string
  company: string
  email: string
  phone: string
  password: string
}

export interface SalesClient {
  id: number
  email: string
}

export interface Document {
  id?: number
  documentUrl: string
}

export interface ProjectDocument {
  documentUrl: string
}

export interface SalesProject {
  title: string
  description: string
  status: string
  pricing: number
  paidPercentage: number
  requestedPercentage: number
  id: number
  timeline: string
  documents: Document[]
}

export interface SalesProjectWithClient {
  clientName: string
  clientId: number
  company: string
  email: string
  phone: string

  project: SalesProject[]
}

export interface CreateProjectRequest {
  title: string
  clientId: number
  percentage: number
  salespersonId: number
  description: string
  pricing: number
  timeline: string
  documents: ProjectDocument[]
}

export interface CreateProjectResponse {
  userId: number
  projectId: number
}

export interface FullProjectDetails {
  id: number
  title: string
  client: {
    id: number
    clientName: string
    company: string
    email: string
    phone: string
    projects: string[]
  }
  clientId: number
  description: string
  pricing: number
  salespersonId: number
  timeline: string
  status: string
  paidPercentage: number
  percentage: number
  pmId: number
  documents: {
    id: number
    documentUrl: string
  }[]
}


export interface FullProject {
  id: number
  title: string
  client: {
    id: number
    clientName: string
    company: string
    email: string
    phone: string
    password: string
    projects: string[]
  }
  clientId: number
  description: string
  pricing: string
  timeline: string
  documents: Document[]
}

// Sales API methods interface - needs to be added
export interface SalesApiMethods {
  addClient: (clientData: AddClientRequest) => Promise<any>
  getClients: () => Promise<SalesClient[]>
  getProjects: () => Promise<SalesProjectWithClient[]>
  getAllProjects: () => Promise<FullProject[]>
  createProject: (projectData: CreateProjectRequest) => Promise<CreateProjectResponse>
}

// Client Types
export interface ClientProject {
  title: string
  description: string
  status: string
  pricing: number
  clientId: number  
  requestedPercentage: number
  paidPercentage: number
  id: number
  timeline: string
  documents: Array<{
    documentUrl: string
  }>
   reportDocuments: Array<{  
    documentUrl: string
  }>
}

export interface ProjectRequest {
  clientId: number
  amount: number
}

export interface ClientRequestedPayment {
  id: number
  clientId: number
  amount: number
}

// Payment Types
export interface PaymentRequest {
  stripeSessionUrl: string
  stripeSessionId: string
  approvedUrl: string
  cancelUrl: string
  description: string
  userId: number
  name: string
  amount: number
  project: number
}

export interface PaymentResponse {
  stripeSessionUrl: string
  stripeSessionId: string
  approvedUrl: string
  cancelUrl: string
  description: string
  userId: number
  name: string
  amount: number
  project: number
}

// M-Pesa Types
export interface MpesaPaymentRequest {
  phone: string
  amount: string
  projectId: string
}
export interface StripePaymentValidationResponse {
  id: number
  stripeSessionUrl: string
  stripeSessionId: string
  paymentIntentId: string
  userId: number
  amount: number
  discount: number | null
  description: string
  name: string
  quantity: number
  projectId: number
}
export interface MpesaPaymentResponse {
  success?: boolean
  message?: string
  checkoutRequestId?: string
  responseCode?: string
  merchantRequestID?: string
  checkoutRequestID?: string
  customerMessage?: string
}

export interface MpesaValidationRequest {
  checkoutRequestID: string
}

export interface MpesaValidationResponse {
  success?: boolean
  status?: string
  message?: string
  resultCode?: string
  resultDesc?: string
  merchantRequestID?: string
  checkoutRequestID?: string
  amount?: number
  mpesaReceiptNumber?: string
  transactionDate?: string
  phoneNumber?: string
}

export interface MetricsSummary {
  totalAmount: number
  totalPaid: number
  totalUnpaid: number
  averagePaidPercentage: number
}

export interface TodayMetrics {
  totalProjects: number
  totalAmount: number
  totalPaid: number
  totalUnpaid: number
  averagePaidPercentage: number
}

export interface ClientPaymentHistory {
  projectTitle: string
  amount: number
  paymentMethod: string
}
// PM Document submission type
export interface PMDocumentRequest {
  projectId: number
  documentURL: string
}

// PM Document response type
export interface PMDocumentResponse {
  id: number
  documentUrl: string
  title: string
  description: string
  timeline: string
  pm: string
  pmEmail: string
}

// Admin Document type
export interface AdminDocument {
  id: number
  projectId: number
  pmId: number
  documentURL: string
  isApproved: boolean
}

// Admin Report type
export interface AdminReport {
  projectId: number
  documentURL: string
}

// Client Report/Document type (they seem to return the same structure)
export interface ClientReportDocument {
  id: number
  report: string
  projectId: number
  pmId: number
  isApproved: boolean
}




// Backend .NET enum mapping
export enum Role {
  Admin = 0,
  SalesPerson = 1,
  ProjectManager = 2,
  Client = 3
}

export const ApiRoleToInternal = {
  'Admin': 'admin',
  'SalesPerson': 'sales',
  'ProjectManager': 'pm',
  'Client': 'client'
} as const

export type RoleName = 'admin' | 'sales' | 'pm' | 'client'

// Payment status types
export type PaymentMethod = 'stripe' | 'mpesa'
export type PaymentStatus = 'pending' | 'completed' | 'failed' | 'cancelled'

export interface PaymentHistory {
  id: string
  projectId: number
  amount: number
  method: PaymentMethod
  status: PaymentStatus
  date: Date
  description: string
  transactionId?: string
}

export interface TokenRequestDTO {
  clientId: number
  projectId: number
}

export interface TokenRequestResponse {
  url: string
  stripeSessionId: string
}

export interface TokenRequest {
  id: number
  client: {
    id: number
    clientName: string
    company: string
    email: string
    phone: string
    projects: any[]
    tokenRequests: string[]
    marketPlaces: any[]
  } | null
  clientId: number
  project: {
    id: number
    title: string
    client: string
    clientId: number
    description: string
    pricing: number
    salespersonId: number
    createdTime: string
    timeline: string
    status: string
    paidPercentage: number
    percentage: number
    pmId: number
    documents: any[]
    reports: any[]
    tokenRequests: string[]
  } | null
  projectId: number
  stripeSessionId: string
  paymentIntentId: string
  isApproved: boolean
}

export interface MarketPlace {
  id: number
  intrisicScore: string
  npv: number
  evm: number
  probabilisticSimulation: string
  assetValuation: number
  value: number
  client: string
  clientId: number
}

export interface MarketPlaceDTO {
  intrisicScore: string
  npv: number
  evm: number
  probabilisticSimulation: string
  assetValuation: number
  value: number
  clientId: number
}

// src/lib/types/tokenization.ts
export interface TokenizationRequest {
  blockchain_flag: boolean
  content: string
  development_cost: number
  discount_rate: number
  expected_revenue: number
  project_type: string
  risk_factor: number
  stage_completion: number
  token_supply: number
  useful_life: number
  user_base: number
}

export interface TokenizationApiResponse {
  data: {
    accounting: {
      amortized_value: number
    }
    economics: {
      npv: number
    }
    evm: {
      cpi: number
      eac: number
      ev: number
    }
    final_estimated_value: number
    intrinsic_score: number
    ml_adjusted: number
    probabilistic: {
      confidence_interval_90: {
        high: number
        low: number
      }
      mean: number
    }
    tokenomics: number
  }
  success: boolean
}

export interface TokenizationFormData {
  content: string
  projectType: string
  developmentCost: number
  stageCompletion: number
  expectedRevenue: number
  discountRate: number
  riskFactor: number
  userBase: number
  tokenSupply: number
  usefulLife: number
  blockchainFlag: boolean
}

export interface ProcessedTokenizationResults {
  // Processed and formatted results for easier display
  intrinsicScore: number
  npv: number
  finalValue: number
  amortizedValue: number
  mlAdjustedValue: number
  tokenValue: number
  evmScore: number
  confidenceHigh: number
  confidenceLow: number
  confidenceMean: number
  cpi: number
  eac: number
  ev: number
}