import { Router } from 'express'
import { AuthController } from '../controllers/AuthController'
import { requireAuth, setUserFromSession } from '../middleware/auth'

const router = Router()

// Apply user session middleware to all routes
router.use(setUserFromSession)

// Public routes
router.post('/register', AuthController.register)
router.post('/login', AuthController.login)
router.post('/logout', AuthController.logout)

// Protected routes
router.get('/profile', requireAuth, AuthController.getProfile)
router.put('/profile', requireAuth, AuthController.updateProfile)
router.post('/change-password', requireAuth, AuthController.changePassword)
router.get('/check', AuthController.checkAuth)

export default router