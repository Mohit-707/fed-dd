import { Router } from 'express'

const router = Router()

// TODO: Implement logistics routes
router.get('/', (req, res) => {
  res.json({ success: true, message: 'Logistics routes - Coming soon' })
})

export default router