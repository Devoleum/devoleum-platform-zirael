import express from 'express'
const router = express.Router()
import {
  getSteps,
  getStepById,
  deleteStep,
  createStep,
  updateStep,
} from '../controllers/stepController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

router.route('/history/:historyId').get(getSteps).post(protect, admin, createStep)
router
  .route('/:id')
  .get(getStepById)
  .delete(protect, admin, deleteStep)
  .put(protect, admin, updateStep)

export default router
