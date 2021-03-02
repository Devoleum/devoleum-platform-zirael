import express from 'express'
const router = express.Router()
import {
  authUser,
  registerUser,
  getUserProfile,
  getUserMerchantProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
} from '../controllers/userController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

router.route('/')
  .get(protect, admin, getUsers)
  .post(registerUser)
router.post('/login', authUser)
router
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile)
router
  .route('/:id')
  .delete(protect, admin, deleteUser)
  .get(protect, admin, getUserById)
  .put(protect, admin, updateUser)

router.route('/merchant/:id').get(getUserMerchantProfile)

export default router
