import express from 'express'
const router = express.Router()
import {
  getStepsByHistory,
  getStepById,
  deleteStep,
  createStep,
  updateStep,
} from '../controllers/stepController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

router.route('/history/:historyId/steps').get(getStepsByHistory)
router.route('/history/:historyId').post(protect, admin, createStep)
router
  .route('/:id')
  .get(getStepById)
  .delete(protect, admin, deleteStep)
  .put(protect, admin, updateStep)

export default router
