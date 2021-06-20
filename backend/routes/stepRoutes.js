import express from 'express'
const router = express.Router()
import {
  getStepsByHistory,
  getStepById,
  deleteStep,
  createStep,
  updateStep,
  createStepOpenAPI,
  stepEthTestNotarization,
  stepAlgoTestNotarization,
  stepAlgoMainNotarization
} from '../controllers/stepController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

router.route('/history/:historyId/steps').get(getStepsByHistory)
router.route('/history/:historyId').post(protect, createStep)
router.route('/rinkeby/:id/').put(protect, admin, stepEthTestNotarization)
router.route('/algorand/testnet/:id/').put(protect, admin, stepAlgoTestNotarization)
router.route('/algorand/mainnet/:id/').put(protect, admin, stepAlgoMainNotarization)
router.route('/open/:secret/history/:historyId').post(createStepOpenAPI)
router
  .route('/:id')
  .get(getStepById)
  .delete(protect, deleteStep)
  .put(protect, updateStep)

export default router
