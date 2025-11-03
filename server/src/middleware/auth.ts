import { Request, Response, NextFunction } from 'express'
import { AuthenticatedRequest } from '../types'

export const requireAuth = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  if (!req.session?.userId) {
    return res.status(401).json({
      success: false,
      error: 'Authentication required'
    })
  }
  next()
}

export const requireRole = (roles: string[]) => {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    if (!req.session?.userId) {
      return res.status(401).json({
        success: false,
        error: 'Authentication required'
      })
    }

    if (!req.session?.userRole || !roles.includes(req.session.userRole)) {
      return res.status(403).json({
        success: false,
        error: 'Insufficient permissions'
      })
    }

    next()
  }
}

export const setUserFromSession = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  if (req.session?.userId) {
    try {
      const { prisma } = await import('../lib/prisma')
      const user = await prisma.user.findUnique({
        where: { id: req.session.userId },
        select: {
          id: true,
          email: true,
          role: true,
          firstName: true,
          lastName: true,
          phone: true,
          address: true,
          isVerified: true,
          isActive: true,
        }
      })

      if (user && user.isActive) {
        req.user = user
      }
    } catch (error) {
      console.error('Error fetching user from session:', error)
    }
  }
  next()
}