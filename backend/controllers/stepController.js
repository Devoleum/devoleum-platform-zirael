import asyncHandler from 'express-async-handler'
import Step from '../models/stepModel.js'

// @desc    Fetch all steps by history ID
// @route   GET /api/:historyId/steps
// @access  Public
const getSteps = asyncHandler(async (req, res) => {
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

  const count = await Step.countDocuments({ ...keyword })
  const steps = await Step.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1))

  res.json({ steps, page, pages: Math.ceil(count / pageSize) })
})

// @desc    Fetch single step
// @route   GET /api/steps/:id
// @access  Public
const getStepById = asyncHandler(async (req, res) => {
  const step = await Step.findById(req.params.id)

  if (step) {
    res.json(step)
  } else {
    res.status(404)
    throw new Error('Step not found')
  }
})

// @desc    Delete a step
// @route   DELETE /api/steps/:id
// @access  Private/Admin
const deleteStep = asyncHandler(async (req, res) => {
  const step = await Step.findById(req.params.id)

  if (step) {
    await step.remove()
    res.json({ message: 'Step removed' })
  } else {
    res.status(404)
    throw new Error('Step not found')
  }
})

// @desc    Create a step
// @route   POST /api/steps
// @access  Private/Admin
const createStep = asyncHandler(async (req, res) => {
  const step = new Step({
    user: req.user._id,
    name: 'Sample name',
    uri: 'JSON link',
    historyId: req.params.historyId
  })

  const createdStep = await step.save()
  res.status(201).json(createdStep)
})

// @desc    Update a step
// @route   PUT /api/steps/:id
// @access  Private/Admin
const updateStep = asyncHandler(async (req, res) => {
  const {
    name,
    uri,
    category,
  } = req.body

  const step = await Step.findById(req.params.id)

  if (step) {
    step.name = name
    step.uri = uri
    step.category = category

    const updatedStep = await step.save()
    res.json(updatedStep)
  } else {
    res.status(404)
    throw new Error('Step not found')
  }
})



export {
  getSteps,
  getStepById,
  deleteStep,
  createStep,
  updateStep,
}
