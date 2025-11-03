import { ApiResponse, LoginRequest, RegisterRequest } from '../types/auth'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'

class ApiService {
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${API_BASE_URL}${endpoint}`

    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      credentials: 'include',
      ...options,
    }

    try {
      const response = await fetch(url, config)
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || `HTTP error! status: ${response.status}`)
      }

      return data
    } catch (error) {
      console.error('API request failed:', error)
      throw error
    }
  }

  // Auth endpoints
  async login(data: LoginRequest): Promise<ApiResponse> {
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  }

  async register(data: RegisterRequest): Promise<ApiResponse> {
    return this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  }

  async logout(): Promise<ApiResponse> {
    return this.request('/auth/logout', {
      method: 'POST',
    })
  }

  async getProfile(): Promise<ApiResponse> {
    return this.request('/auth/profile')
  }

  async checkAuth(): Promise<ApiResponse<{ authenticated: boolean; user: any }>> {
    return this.request('/auth/check')
  }

  async updateProfile(data: Partial<RegisterRequest>): Promise<ApiResponse> {
    return this.request('/auth/profile', {
      method: 'PUT',
      body: JSON.stringify(data),
    })
  }

  async changePassword(data: { currentPassword: string; newPassword: string }): Promise<ApiResponse> {
    return this.request('/auth/change-password', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  }

  // Health check
  async healthCheck(): Promise<ApiResponse> {
    return this.request('/health')
  }
}

export const apiService = new ApiService()
export default apiService