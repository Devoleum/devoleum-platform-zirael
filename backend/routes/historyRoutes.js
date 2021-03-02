import express from 'express'
const router = express.Router()
import {
  getHistories,
  getHistoriesByMerchant,
  getHistoryById,
  deleteHistory,
  createHistory,
  updateHistory,
  createHistoryReview,
  getTopHistories,
  getPublicHistories
} from '../controllers/historyController.js'
import { protect } from '../middleware/authMiddleware.js'

router.route('/').get(getHistories).post(protect, createHistory)
router.route('/public').get(getPublicHistories)
router.route('/merchant/:merchantId').get(getHistoriesByMerchant)
router.route('/:id/reviews').post(protect, createHistoryReview)
router.get('/top', getTopHistories)
router
  .route('/:id')
  .get(getHistoryById)
  .delete(protect, deleteHistory)
  .put(protect, updateHistory)

export default router
