import { Response } from 'express'
import { AuthService } from '../services/AuthService'
import { ApiResponse, LoginRequest, RegisterRequest, AuthenticatedRequest } from '../types'

export class AuthController {
  static async register(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const data: RegisterRequest = req.body

      // Validate required fields
      if (!data.email || !data.password || !data.role || !data.firstName || !data.lastName) {
        res.status(400).json({
          success: false,
          error: 'Missing required fields'
        } as ApiResponse)
        return
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(data.email)) {
        res.status(400).json({
          success: false,
          error: 'Invalid email format'
        } as ApiResponse)
        return
      }

      // Validate password length
      if (data.password.length < 8) {
        res.status(400).json({
          success: false,
          error: 'Password must be at least 8 characters long'
        } as ApiResponse)
        return
      }

      const user = await AuthService.register(data)

      // Set session
      if (req.session) {
        req.session.userId = user.id
        req.session.userRole = user.role
      }

      res.status(201).json({
        success: true,
        data: user
      } as ApiResponse)
    } catch (error) {
      console.error('Registration error:', error)
      res.status(400).json({
        success: false,
        error: error instanceof Error ? error.message : 'Registration failed'
      } as ApiResponse)
    }
  }

  static async login(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const data: LoginRequest = req.body

      // Validate required fields
      if (!data.email || !data.password || !data.role) {
        res.status(400).json({
          success: false,
          error: 'Email, password, and role are required'
        } as ApiResponse)
        return
      }

      const user = await AuthService.login(data)

      // Set session
      if (req.session) {
        req.session.userId = user.id
        req.session.userRole = user.role
      }

      res.json({
        success: true,
        data: user
      } as ApiResponse)
    } catch (error) {
      console.error('Login error:', error)
      res.status(401).json({
        success: false,
        error: error instanceof Error ? error.message : 'Login failed'
      } as ApiResponse)
    }
  }

  static async logout(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      // Destroy session
      req.session?.destroy((err: any) => {
        if (err) {
          console.error('Logout error:', err)
          res.status(500).json({
            success: false,
            error: 'Logout failed'
          } as ApiResponse)
          return
        }

        res.clearCookie('connect.sid')
        res.json({
          success: true,
          message: 'Logged out successfully'
        } as ApiResponse)
      })
    } catch (error) {
      console.error('Logout error:', error)
      res.status(500).json({
        success: false,
        error: 'Logout failed'
      } as ApiResponse)
    }
  }

  static async getProfile(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      if (!req.user) {
        res.status(401).json({
          success: false,
          error: 'User not authenticated'
        } as ApiResponse)
        return
      }

      const user = await AuthService.getUserById(req.user.id)

      if (!user) {
        res.status(404).json({
          success: false,
          error: 'User not found'
        } as ApiResponse)
        return
      }

      res.json({
        success: true,
        data: user
      } as ApiResponse)
    } catch (error) {
      console.error('Get profile error:', error)
      res.status(500).json({
        success: false,
        error: 'Failed to get profile'
      } as ApiResponse)
    }
  }

  static async updateProfile(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      if (!req.user) {
        res.status(401).json({
          success: false,
          error: 'User not authenticated'
        } as ApiResponse)
        return
      }

      const userId = req.user.id
      const data = req.body

      const user = await AuthService.updateProfile(userId, data)

      res.json({
        success: true,
        data: user
      } as ApiResponse)
    } catch (error) {
      console.error('Update profile error:', error)
      res.status(400).json({
        success: false,
        error: error instanceof Error ? error.message : 'Failed to update profile'
      } as ApiResponse)
    }
  }

  static async changePassword(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      if (!req.user) {
        res.status(401).json({
          success: false,
          error: 'User not authenticated'
        } as ApiResponse)
        return
      }

      const userId = req.user.id
      const { currentPassword, newPassword } = req.body

      if (!currentPassword || !newPassword) {
        res.status(400).json({
          success: false,
          error: 'Current password and new password are required'
        } as ApiResponse)
        return
      }

      if (newPassword.length < 8) {
        res.status(400).json({
          success: false,
          error: 'New password must be at least 8 characters long'
        } as ApiResponse)
        return
      }

      const result = await AuthService.changePassword(userId, currentPassword, newPassword)

      res.json({
        success: true,
        data: result
      } as ApiResponse)
    } catch (error) {
      console.error('Change password error:', error)
      res.status(400).json({
        success: false,
        error: error instanceof Error ? error.message : 'Failed to change password'
      } as ApiResponse)
    }
  }

  static async checkAuth(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const user = req.user

      res.json({
        success: true,
        data: {
          authenticated: !!user,
          user: user || null
        }
      } as ApiResponse)
    } catch (error) {
      console.error('Check auth error:', error)
      res.status(500).json({
        success: false,
        error: 'Failed to check authentication status'
      } as ApiResponse)
    }
  }
}