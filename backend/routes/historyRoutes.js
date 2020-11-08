import express from 'express'
const router = express.Router()
import {
  getHistories,
  getHistoryById,
  deleteHistory,
  createHistory,
  updateHistory,
  createHistoryReview,
  getTopHistories,
} from '../controllers/historyController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

router.route('/').get(getHistories).post(protect, admin, createHistory)
router.route('/:id/reviews').post(protect, createHistoryReview)
router.get('/top', getTopHistories)
router
  .route('/:id')
  .get(getHistoryById)
  .delete(protect, admin, deleteHistory)
  .put(protect, admin, updateHistory)

export default router
