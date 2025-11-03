export type UserRole = 'ADMIN' | 'DONOR' | 'RECIPIENT' | 'LOGISTICS'

export interface User {
  id: string
  email: string
  role: UserRole
  firstName: string
  lastName: string
  phone?: string
  address?: string
  isVerified: boolean
  isActive: boolean
  createdAt: string
  updatedAt?: string
}

export interface LoginRequest {
  email: string
  password: string
  role: UserRole
}

export interface RegisterRequest {
  email: string
  password: string
  role: UserRole
  firstName: string
  lastName: string
  phone?: string
  address?: string
}

export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  loading: boolean
  login: (data: LoginRequest) => Promise<ApiResponse<User>>
  register: (data: RegisterRequest) => Promise<ApiResponse<User>>
  logout: () => Promise<void>
  checkAuth: () => Promise<void>
}

export interface AuthState {
  user: User | null
  isAuthenticated: boolean
  loading: boolean
}