import asyncHandler from "express-async-handler";
import Step from "../models/stepModel.js";
import Token from "../models/tokenModel.js";
import History from "../models/historyModel.js";

// @desc    Fetch all steps by history ID
// @route   GET /api/history/:historyId/steps
// @access  Public
const getStepsByHistory = asyncHandler(async (req, res) => {
  const steps = await Step.find({ historyId: req.params.historyId });

  if (steps) {
    res.json(steps);
  } else {
    res.status(404);
    throw new Error("Steps not found");
  }
});

// @desc    Fetch single step
// @route   GET /api/steps/:id
// @access  Public
const getStepById = asyncHandler(async (req, res) => {
  const step = await Step.findById(req.params.id);

  if (step) {
    res.json(step);
  } else {
    res.status(404);
    throw new Error("Step not found");
  }
});

// @desc    Delete a step
// @route   DELETE /api/steps/:id
// @access  Private/Admin
const deleteStep = asyncHandler(async (req, res) => {
  const step = await Step.findById(req.params.id);

  if (step && req.user._id.toString() === step.user.toString()) {
    await step.remove();
    res.json({ message: "Step removed" });
  } else {
    res.status(404);
    throw new Error("Step not found");
  }
});

// @desc    Create a step
// @route   POST /api/steps
// @access  Private/Admin
const createStep = asyncHandler(async (req, res) => {
  const history = await History.findById(req.params.id);

  if (!history) {
    res.status(404);
    throw new Error("History not found");
  }

  const step = new Step({
    user: req.user._id,
    name: req.body.name,
    uri: req.body.uri,
    randomizeProof: req.body.randomAlpha,
    historyId: req.params.historyId,
  });

  const createdStep = await step.save();
  res.status(201).json(createdStep);
});

// @desc    Create a step from external service
// @route   POST /api/steps/open/:secret/history/:historyId
// @access  Private/Admin
const createStepOpenAPI = asyncHandler(async (req, res) => {
  const tokenObj = await Token.findOne({secret: req.params.secret });

  if (!tokenObj) {
    res.status(404);
    throw new Error("Token not valid");
  }

  const history = await History.findById(req.params.historyId)

  if (!history) {
    res.status(404);
    throw new Error("History not found");
  }

  const step = new Step({
    user: tokenObj.user,
    name: req.body.name,
    uri: req.body.uri,
    randomizeProof: req.body.randomAlpha,
    historyId: req.params.historyId,
  });

  const createdStep = await step.save();
  res.status(201).json(createdStep);
});

// @desc    Update a step
// @route   PUT /api/steps/:id
// @access  Private/Admin
const updateStep = asyncHandler(async (req, res) => {
  const { name, uri, category } = req.body;

  const step = await Step.findById(req.params.id);

  if (step && req.user._id.toString() === step.user.toString()) {
    step.name = name;
    step.uri = uri;
    step.category = category;

    const updatedStep = await step.save();
    res.json(updatedStep);
  } else {
    res.status(404);
    throw new Error("Step not found");
  }
});

// @desc    Update a step with test eth rinkeby tx link
// @route   PUT /api/steps/rinkeby/:id/
// @access  Private/Admin
const stepEthTestNotarization = asyncHandler(async (req, res) => {
  const { txurl, calchash } = req.body;
  console.log(req.body);
  const step = await Step.findById(req.params.id);

  if (step) {
    step.test_eth_notarization = txurl;
    step.hash = calchash;

    const updatedStep = await step.save();
    res.json(updatedStep);
  } else {
    res.status(404);
    throw new Error("Step not found");
  }
});

// @desc    Update a step with algorand testnet tx link
// @route   PUT /api/steps//algorand/testnet/:id/
// @access  Private/Admin
const stepAlgoTestNotarization = asyncHandler(async (req, res) => {
  const { txurl, calchash } = req.body;
  console.log(req.body);
  const step = await Step.findById(req.params.id);

  if (step) {
    step.test_algo_notarization = txurl;
    step.hash = calchash;

    const updatedStep = await step.save();
    res.json(updatedStep);
  } else {
    res.status(404);
    throw new Error("Step not found");
  }
});

export {
  getStepsByHistory,
  getStepById,
  deleteStep,
  createStep,
  createStepOpenAPI,
  updateStep,
  stepEthTestNotarization,
  stepAlgoTestNotarization,
};
