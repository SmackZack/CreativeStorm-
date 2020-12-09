import express from 'express'
import { authUser, registerUser, getUserProfile,updateUserProfile } from '../Controllers/userController.js'
const router = express.Router()
import { protect } from '../middleware/authMiddleware.js'

router.post('/', registerUser)
router.post('/login', authUser)
router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile)


export default router;