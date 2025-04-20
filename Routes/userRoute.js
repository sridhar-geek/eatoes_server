import express from 'express'
const router = express.Router()

import { logout } from '../Controllers/userController.js'

router.get('/logout', logout)

export default router;