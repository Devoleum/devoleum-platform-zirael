import asyncHandler from 'express-async-handler'
import History from '../models/historyModel.js'

// @desc    Fetch all histories
// @route   GET /api/histories
// @access  Public
const getHistories = asyncHandler(async (req, res) => {
  const pageSize = 10
  const page = Number(req.query.pageNumber) || 1

  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: 'i',
        },
      }
    : {}

  const count = await History.countDocuments({ ...keyword })
  const histories = await History.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1))

  res.json({ histories, page, pages: Math.ceil(count / pageSize) })
})

// @desc    Fetch histories by merchantId
// @route   GET /api/histories/merchant/:merchantId
// @access  Public
const getHistoriesByMerchant = asyncHandler(async (req, res) => {
  const histories = await History.find({user: req.params.merchantId}); 

  if (histories) {
    res.json(histories)
  } else {
    res.status(404)
    throw new Error('Histories not found')
  }
})

// @desc    Fetch single history
// @route   GET /api/histories/:id
// @access  Public
const getHistoryById = asyncHandler(async (req, res) => {
  const history = await History.findById(req.params.id)

  if (history) {
    res.json(history)
  } else {
    res.status(404)
    throw new Error('History not found')
  }
})

// @desc    Delete a history
// @route   DELETE /api/histories/:id
// @access  Private/Admin
const deleteHistory = asyncHandler(async (req, res) => {
  const history = await History.findById(req.params.id)

  if (history && req.user._id.toString() === history.user.toString()) {
    await history.remove()
    res.json({ message: 'History removed' })
  } else {
    res.status(404)
    throw new Error('History not found or not authorized')
  }
})

// @desc    Create a history
// @route   POST /api/histories
// @access  Private/Admin
const createHistory = asyncHandler(async (req, res) => {
  const history = new History({
    user: req.user._id,
    name: req.body.name || 'Sample name',
    uri: req.body.uri || 'JSON link',
    category: req.body.category || 'Sample category',
    numReviews: 0,
  })

  const createdHistory = await history.save()
  res.status(201).json(createdHistory)
})

// @desc    Update a history
// @route   PUT /api/histories/:id
// @access  Private/Admin
const updateHistory = asyncHandler(async (req, res) => {
  const {
    name,
    uri,
    category,
  } = req.body

  const history = await History.findById(req.params.id)

  console.log(typeof(history.user), typeof(req.user._id))

  if (history && req.user._id.toString() === history.user.toString()) {
    history.name = name
    history.uri = uri
    history.category = category

    const updatedHistory = await history.save()
    res.json(updatedHistory)
  } else {
    res.status(404)
    throw new Error('History not found or not authorized')
  }
})

// @desc    Create new review
// @route   POST /api/histories/:id/reviews
// @access  Private
const createHistoryReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body

  const history = await History.findById(req.params.id)

  if (history) {
    const alreadyReviewed = history.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    )

    if (alreadyReviewed) {
      res.status(400)
      throw new Error('History already reviewed')
    }

    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    }

    history.reviews.push(review)

    history.numReviews = history.reviews.length

    history.rating =
      history.reviews.reduce((acc, item) => item.rating + acc, 0) /
      history.reviews.length

    await history.save()
    res.status(201).json({ message: 'Review added' })
  } else {
    res.status(404)
    throw new Error('History not found')
  }
})

// @desc    Get top rated histories
// @route   GET /api/histories/top
// @access  Public
const getTopHistories = asyncHandler(async (req, res) => {
  const histories = await History.find({}).sort({ rating: -1 }).limit(3)

  res.json(histories)
})

export {
  getHistories,
  getHistoriesByMerchant,
  getHistoryById,
  deleteHistory,
  createHistory,
  updateHistory,
  createHistoryReview,
  getTopHistories,
}
