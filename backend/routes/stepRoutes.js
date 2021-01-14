import express from 'express'
const router = express.Router()
import {
  getStepsByHistory,
  getStepById,
  deleteStep,
  createStep,
  updateStep,
  stepEthTestNotarization
} from '../controllers/stepController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

router.route('/history/:historyId/steps').get(getStepsByHistory)
router.route('/history/:historyId').post(protect, createStep)
router.route('/rinkeby/:id/').put(protect, admin, stepEthTestNotarization)
router
  .route('/:id')
  .get(getStepById)
  .delete(protect, deleteStep)
  .put(protect, updateStep)

export default router
