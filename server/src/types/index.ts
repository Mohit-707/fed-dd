import { Request as ExpressRequest, Response } from 'express'
import { User, UserRole } from '@prisma/client'

export interface AuthenticatedRequest extends ExpressRequest {
  user?: User
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

export interface PaginationParams {
  page?: number
  limit?: number
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
}

export interface PaginationResponse<T> {
  data: T[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
    hasNext: boolean
    hasPrev: boolean
  }
}