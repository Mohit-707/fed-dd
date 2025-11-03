import { Router } from 'express'

const router = Router()

// TODO: Implement admin routes
router.get('/', (req, res) => {
  res.json({ success: true, message: 'Admin routes - Coming soon' })
})

export default router