// src/lib/api-config.ts - Complete updated API Client with new endpoints
import { 
  LoginRequest, 
  LoginResponse, 
  User, 
  CreateUserRequest,
  AddClientRequest,
  SalesClient,
  SalesProjectWithClient,
  FullProjectDetails,
  ClientProject,
  PaymentRequest,
  PaymentResponse,
  MpesaPaymentRequest,
  MpesaPaymentResponse,
  MpesaValidationRequest,
  MpesaValidationResponse,
  ProjectRequest,
  ClientRequestedPayment,
  RequestedProject,
  AdminDocument,
  AdminReport,
  AssignPMRequest,
  PMDocumentRequest,
  PMReportRequest,
  CreateProjectRequest,
  CreateProjectResponse,
  MetricsSummary,
  TodayMetrics,
  ClientPaymentHistory,
  ClientReportDocument,
  PMDocumentResponse,
  AdminDocumentResponse,
  AdminReportResponse,
  StripePaymentValidationResponse,
  TokenRequestDTO,
  TokenRequestResponse, 
  TokenRequest,
  MarketPlace,
  MarketPlaceDTO,
  TokenizationRequest, TokenizationApiResponse
} from '@/lib/types/api'

export const API_BASE_URL = 'https://coltiumbackend-h7gtaphsdwg0djgm.canadacentral-01.azurewebsites.net'
export const MPESA_API_BASE_URL = 'https://coltiummpesa-avfca5fhahg9fwah.canadacentral-01.azurewebsites.net'
export const TOKENIZATION_API_URL = 'https://thetokenizer.onrender.com'

export const API_ENDPOINTS = {
  // Auth
  login: '/api/User/login',
  
  // Admin
  adminUsers: '/api/Admin/users',
  adminCreateUser: '/api/Admin/createuser',
  adminRequestedProjects: '/api/Admin/requestedProjects',
  adminGetPMs: '/api/Admin/getPMs',
  adminAssignPM: '/api/Admin/assignPM',
  adminDocuments: '/api/Admin/documents',
  adminReports: '/api/Admin/reports',
  adminApproveDoc: '/api/Admin/approveDoc',
  adminApproveReport: '/api/Admin/approveReport',
  
  // Sales
  salesAddClient: '/api/Sales/client',
  salesClients: '/api/Sales/clients',
  salesProjects: '/api/Sales/projects',
  salesRequest: '/api/Sales/request',
  salesAssignPM: '/api/Sales/assignPM',
  
  // Projects
  projects: '/api/Project',
  createProject: '/api/Project',
  
  // Client
  clientProjects: '/api/Client/clientProject',
  clientRequests: '/api/Client/requests',
  clientReport: '/api/Client/report',
  clientDocument: '/api/Client/document',
  
  // PM
  pmProjects: '/api/PM',
  pmReport: '/api/PM/report',
  pmDocument: '/api/PM/document',
  
  // Payments
  payment: '/api/Payment',
  validatePayment: '/api/Payment/validate',
  
  // Metrics
  metrics: '/api/Metrics',
  todayMetrics: '/api/Metrics/today',
  clientMetrics: '/api/Metrics',
  
  // Documents
  blobUpload: '/api/Blob/upload',
  
  // Other
  contact: '/api/ConctactPage',
} as const

// M-Pesa specific endpoints
export const MPESA_ENDPOINTS = {
  stkPush: '/stk-push',
  validate: '/validate'
} as const

export const TOKEN_REQUEST_ENDPOINTS = {
  addTokenRequest: '/api/TokenRequest/addTokenRequest',
  getTokenRequests: '/api/TokenRequest/getTokenRequest',
  getClientTokenRequests: '/api/TokenRequest/client',
  validateTokenPayment: '/api/TokenRequest/validatePayment',
  approveTokenRequest: '/api/TokenRequest/approveTokenRequest',
} as const

export const MARKETPLACE_ENDPOINTS = {
  getMarketPlaces: '/api/MarketPlace/getMarketPlaces',
  addMarketPlace: '/api/MarketPlace/addMarketPlace',
} as const


export class ApiClient {
  private baseURL: string
  private mpesaBaseURL: string
  private token: string | null = null

  constructor(baseURL: string = API_BASE_URL, mpesaBaseURL: string = MPESA_API_BASE_URL) {
    this.baseURL = baseURL
    this.mpesaBaseURL = mpesaBaseURL
    if (typeof window !== 'undefined') {
      this.token = localStorage.getItem('auth_token')
    }
  }

  setToken(token: string) {
    this.token = token
    if (typeof window !== 'undefined') {
      localStorage.setItem('auth_token', token)
    }
  }

  clearToken() {
    this.token = null
    if (typeof window !== 'undefined') {
      localStorage.removeItem('auth_token')
    }
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {},
    baseURL?: string
  ): Promise<T> {
    const url = `${baseURL || this.baseURL}${endpoint}`
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...(this.token && { Authorization: `Bearer ${this.token}` }),
        ...options.headers,
      },
      ...options,
    }

    try {
      const response = await fetch(url, config)
      
      if (!response.ok) {
        const errorText = await response.text()
        console.error('API Error Response:', errorText)
        throw new Error(`API Error: ${response.status} - ${errorText || response.statusText}`)
      }

      const contentType = response.headers.get('content-type')
      if (contentType && contentType.includes('application/json')) {
        const jsonResponse = await response.json()
        return jsonResponse
      } else {
        const textResponse = await response.text()
        return textResponse as unknown as T
      }
    } catch (error) {
      console.error('API Request failed:', error)
      throw error
    }
  }

  // Document upload method
  async uploadDocument(
    formData: FormData, 
    onProgress?: (progress: number) => void
  ): Promise<string> {
    const url = `${this.baseURL}${API_ENDPOINTS.blobUpload}`
    
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest()
      
      // Upload progress tracking
      xhr.upload.addEventListener('progress', (e) => {
        if (e.lengthComputable && onProgress) {
          const progress = Math.round((e.loaded / e.total) * 100)
          onProgress(progress)
        }
      })
      
      xhr.addEventListener('load', () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          try {
            const documentUrl = xhr.responseText.trim()
            resolve(documentUrl)
          } catch (error) {
            console.error('Failed to parse upload response:', error)
            reject(new Error('Failed to parse upload response'))
          }
        } else {
          console.error('Upload failed:', xhr.status, xhr.statusText)
          reject(new Error(`Upload failed: ${xhr.status} ${xhr.statusText}`))
        }
      })
      
      xhr.addEventListener('error', () => {
        console.error('Upload network error')
        reject(new Error('Upload network error'))
      })
      
      xhr.open('POST', url)
      
      if (this.token) {
        xhr.setRequestHeader('Authorization', `Bearer ${this.token}`)
      }
      
      xhr.send(formData)
    })
  }

  // Auth methods
  async login(credentials: LoginRequest): Promise<LoginResponse> {
    return this.request<LoginResponse>(API_ENDPOINTS.login, {
      method: 'POST',
      body: JSON.stringify(credentials),
    })
  }

  // Admin methods
  async getUsers(): Promise<User[]> {
    return this.request<User[]>(API_ENDPOINTS.adminUsers)
  }

  async createUser(userData: CreateUserRequest): Promise<string> {
    return this.request<string>(API_ENDPOINTS.adminCreateUser, {
      method: 'POST',
      body: JSON.stringify(userData),
    })
  }

  async getRequestedProjects(): Promise<RequestedProject[]> {
    return this.request<RequestedProject[]>(API_ENDPOINTS.adminRequestedProjects)
  }

  async getPMs(): Promise<User[]> {
    return this.request<User[]>(API_ENDPOINTS.adminGetPMs)
  }

  async assignPMToProject(assignData: AssignPMRequest): Promise<string> {
    return this.request<string>(API_ENDPOINTS.adminAssignPM, {
      method: 'POST',
      body: JSON.stringify(assignData),
    })
  }

  // Documents endpoint - returns detailed format directly
async getAdminDocuments(): Promise<AdminDocumentResponse[]> {
  return this.request<AdminDocumentResponse[]>(API_ENDPOINTS.adminDocuments)
}

// Reports endpoint - returns detailed format directly  
async getAdminReports(): Promise<AdminReportResponse[]> {
  return this.request<AdminReportResponse[]>(API_ENDPOINTS.adminReports)
}

  async approveDocument(documentId: number): Promise<string> {
    return this.request<string>(`${API_ENDPOINTS.adminApproveDoc}/${documentId}`, {
      method: 'PUT',
    })
  }

  async approveReport(reportId: number): Promise<string> {
    return this.request<string>(`${API_ENDPOINTS.adminApproveReport}/${reportId}`, {
      method: 'PUT',
    })
  }

  // Sales methods
  async addClient(clientData: AddClientRequest): Promise<any> {
    return this.request<any>(API_ENDPOINTS.salesAddClient, {
      method: 'POST',
      body: JSON.stringify(clientData),
    })
  }

  async getSalesClients(): Promise<SalesClient[]> {
    return this.request<SalesClient[]>(API_ENDPOINTS.salesClients)
  }

  async getSalesProjects(): Promise<SalesProjectWithClient[]> {
    return this.request<SalesProjectWithClient[]>(API_ENDPOINTS.salesProjects)
  }

  // Sales PM assignment method (used by sales dashboard)
  async assignProjectManager(projectId: number): Promise<string> {
    return this.request<string>(`${API_ENDPOINTS.salesAssignPM}?projectId=${projectId}`, {
      method: 'POST',
    })
  }

  // Legacy method name for backward compatibility
  async assignPMFromSales(projectId: number): Promise<string> {
    return this.assignProjectManager(projectId)
  }

  async getAllProjects(): Promise<FullProjectDetails[]> {
    return this.request<FullProjectDetails[]>(API_ENDPOINTS.projects)
  }

  // UPDATED: Project creation with proper typing and validation
  async createProject(projectData: CreateProjectRequest): Promise<CreateProjectResponse> {
    console.log('Creating project with data:', projectData)
    
    // Validate required fields
    if (!projectData.title || !projectData.clientId || !projectData.salespersonId) {
      throw new Error('Missing required fields: title, clientId, or salespersonId')
    }

    return this.request<CreateProjectResponse>(API_ENDPOINTS.createProject, {
      method: 'POST',
      body: JSON.stringify(projectData),
    })
  }

  // Client methods
  async getClientProjects(email: string): Promise<ClientProject[]> {
    return this.request<ClientProject[]>(`${API_ENDPOINTS.clientProjects}?email=${encodeURIComponent(email)}`)
  }

  async requestProject(requestData: ProjectRequest): Promise<string> {
    return this.request<string>(API_ENDPOINTS.salesRequest, {
      method: 'POST',
      body: JSON.stringify(requestData),
    })
  }

  async getClientRequests(clientId: number): Promise<ClientRequestedPayment[]> {
    return this.request<ClientRequestedPayment[]>(`${API_ENDPOINTS.clientRequests}?clientId=${clientId}`)
  }

  // NEW: Client reports and documents
  async getClientReports(projectId: number): Promise<ClientReportDocument[]> {
    return this.request<ClientReportDocument[]>(`${API_ENDPOINTS.clientReport}/${projectId}`)
  }

  async getClientDocuments(projectId: number): Promise<ClientReportDocument[]> {
    return this.request<ClientReportDocument[]>(`${API_ENDPOINTS.clientDocument}/${projectId}`)
  }

  // PM methods
  async getPMProjects(pmId: number): Promise<FullProjectDetails[]> {
    return this.request<FullProjectDetails[]>(`${API_ENDPOINTS.pmProjects}/${pmId}`)
  }

  async submitPMReport(reportData: PMReportRequest): Promise<string> {
    return this.request<string>(API_ENDPOINTS.pmReport, {
      method: 'POST',
      body: JSON.stringify(reportData),
    })
  }

  async submitPMDocument(documentData: PMDocumentRequest): Promise<PMDocumentResponse[]> {
    return this.request<PMDocumentResponse[]>(API_ENDPOINTS.pmDocument, {
      method: 'POST',
      body: JSON.stringify(documentData),
    })
  }

  // NEW: Metrics methods
  async getMetrics(): Promise<MetricsSummary> {
    return this.request<MetricsSummary>(API_ENDPOINTS.metrics)
  }

  async getTodayMetrics(): Promise<TodayMetrics> {
    return this.request<TodayMetrics>(API_ENDPOINTS.todayMetrics)
  }

  async getClientPaymentHistory(clientId: number): Promise<ClientPaymentHistory[]> {
    return this.request<ClientPaymentHistory[]>(`${API_ENDPOINTS.clientMetrics}/${clientId}`)
  }

  // Payment methods
  async createStripePayment(paymentData: PaymentRequest): Promise<PaymentResponse> {
    return this.request<PaymentResponse>(API_ENDPOINTS.payment, {
      method: 'POST',
      body: JSON.stringify(paymentData),
    })
  }

  // UPDATED: Fixed Stripe payment validation to match Swagger specification
  async validateStripePayment(stripesessionId: string): Promise<StripePaymentValidationResponse> {
  return this.request<StripePaymentValidationResponse>(`${API_ENDPOINTS.validatePayment}?stripesessionId=${encodeURIComponent(stripesessionId)}`, {
    method: 'POST',
  })
}

  // Legacy method kept for backward compatibility
  async validatePayment(paymentId: number): Promise<boolean> {
    console.warn('validatePayment(paymentId) is deprecated. Use validateStripePayment(stripesessionId) instead.')
    return this.request<boolean>(`${API_ENDPOINTS.validatePayment}?id=${paymentId}`)
  }

  // M-Pesa methods with correct endpoints
  async initiateMpesaPayment(paymentData: MpesaPaymentRequest): Promise<MpesaPaymentResponse> {
    return this.request<MpesaPaymentResponse>(MPESA_ENDPOINTS.stkPush, {
      method: 'POST',
      body: JSON.stringify(paymentData),
    }, this.mpesaBaseURL)
  }

  async validateMpesaPayment(checkoutRequestID: string): Promise<MpesaValidationResponse> {
    const validationData: MpesaValidationRequest = {
      checkoutRequestID: checkoutRequestID
    }
    
    return this.request<MpesaValidationResponse>(MPESA_ENDPOINTS.validate, {
      method: 'POST',
      body: JSON.stringify(validationData),
    }, this.mpesaBaseURL)
  }

  // Token Request methods
  async addTokenRequest(tokenRequestData: TokenRequestDTO): Promise<TokenRequestResponse> {
    console.log('Creating token request with data:', tokenRequestData)
    return this.request<TokenRequestResponse>(TOKEN_REQUEST_ENDPOINTS.addTokenRequest, {
      method: 'POST',
      body: JSON.stringify(tokenRequestData),
    })
  }
  async getTokenRequests(): Promise<TokenRequest[]> {
    return this.request<TokenRequest[]>(TOKEN_REQUEST_ENDPOINTS.getTokenRequests)
  }

  async getClientTokenRequests(clientId: number): Promise<TokenRequest[]> {
    return this.request<TokenRequest[]>(`${TOKEN_REQUEST_ENDPOINTS.getClientTokenRequests}${clientId}`)
  }

  async validateTokenPayment(stripeSessionId: string): Promise<boolean> {
    return this.request<boolean>(`${TOKEN_REQUEST_ENDPOINTS.validateTokenPayment}/${encodeURIComponent(stripeSessionId)}`, {
      method: 'PUT',
    })
  }

  async approveTokenRequest(tokenRequestId: number): Promise<boolean> {
    return this.request<boolean>(`${TOKEN_REQUEST_ENDPOINTS.approveTokenRequest}/${tokenRequestId}`, {
      method: 'PUT',
    })
  }

  // MarketPlace methods
  async getMarketPlaces(): Promise<MarketPlace[]> {
    return this.request<MarketPlace[]>(MARKETPLACE_ENDPOINTS.getMarketPlaces)
  }

  async addMarketPlace(marketPlaceData: MarketPlaceDTO): Promise<string> {
    console.log('Adding to marketplace with data:', marketPlaceData)
    return this.request<string>(MARKETPLACE_ENDPOINTS.addMarketPlace, {
      method: 'POST',
      body: JSON.stringify(marketPlaceData),
    })
  }

  async tokenizeAsset(tokenizationData: TokenizationRequest): Promise<TokenizationApiResponse> {
    const url = `${TOKENIZATION_API_URL}/tokenize`
    
    console.log('Tokenizing asset with data:', tokenizationData)
    
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(tokenizationData),
      })

      if (!response.ok) {
        const errorText = await response.text()
        console.error('Tokenization API Error Response:', errorText)
        throw new Error(`Tokenization API Error: ${response.status} - ${errorText || response.statusText}`)
      }

      const result: TokenizationApiResponse = await response.json()
      console.log('Tokenization result:', result)
      
      // Validate the response structure
      if (!result.success || !result.data) {
        throw new Error('Invalid tokenization response: ' + JSON.stringify(result))
      }
      
      return result
    } catch (error) {
      console.error('Tokenization request failed:', error)
      throw error
    }
  }
}

export const apiClient = new ApiClient()