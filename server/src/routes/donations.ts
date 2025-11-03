import { Router } from 'express'

const router = Router()

// TODO: Implement donation routes
router.get('/', (req, res) => {
  res.json({ success: true, message: 'Donation routes - Coming soon' })
})

export default router