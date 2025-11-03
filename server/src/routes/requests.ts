import { Router } from 'express'

const router = Router()

// TODO: Implement request routes
router.get('/', (req, res) => {
  res.json({ success: true, message: 'Request routes - Coming soon' })
})

export default router