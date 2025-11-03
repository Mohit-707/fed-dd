import bcrypt from 'bcryptjs'
import { prisma } from '../lib/prisma'
import { LoginRequest, RegisterRequest } from '../types'

export class AuthService {
  static async register(data: RegisterRequest) {
    const { email, password, role, firstName, lastName, phone, address } = data

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email }
    })

    if (existingUser) {
      throw new Error('User with this email already exists')
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 12)

    // Create user
    const user = await prisma.user.create({
      data: {
        email,
        passwordHash,
        role,
        firstName,
        lastName,
        phone,
        address,
      },
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
        createdAt: true,
      }
    })

    return user
  }

  static async login(data: LoginRequest) {
    const { email, password, role } = data

    // Find user
    const user = await prisma.user.findUnique({
      where: { email }
    })

    if (!user) {
      throw new Error('Invalid credentials')
    }

    // Check if user is active
    if (!user.isActive) {
      throw new Error('Account is deactivated')
    }

    // Check role match
    if (user.role !== role) {
      throw new Error('Invalid role selection')
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.passwordHash)
    if (!isValidPassword) {
      throw new Error('Invalid credentials')
    }

    // Return user without password
    const { passwordHash, ...userWithoutPassword } = user
    return userWithoutPassword
  }

  static async getUserById(userId: string) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
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
        createdAt: true,
        updatedAt: true,
      }
    })

    return user
  }

  static async updateProfile(userId: string, data: Partial<RegisterRequest>) {
    const { firstName, lastName, phone, address } = data

    const user = await prisma.user.update({
      where: { id: userId },
      data: {
        ...(firstName && { firstName }),
        ...(lastName && { lastName }),
        ...(phone !== undefined && { phone }),
        ...(address !== undefined && { address }),
      },
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
        createdAt: true,
        updatedAt: true,
      }
    })

    return user
  }

  static async changePassword(userId: string, currentPassword: string, newPassword: string) {
    // Get user with password
    const user = await prisma.user.findUnique({
      where: { id: userId }
    })

    if (!user) {
      throw new Error('User not found')
    }

    // Verify current password
    const isValidPassword = await bcrypt.compare(currentPassword, user.passwordHash)
    if (!isValidPassword) {
      throw new Error('Current password is incorrect')
    }

    // Hash new password
    const newPasswordHash = await bcrypt.hash(newPassword, 12)

    // Update password
    await prisma.user.update({
      where: { id: userId },
      data: { passwordHash: newPasswordHash }
    })

    return { success: true }
  }
}