import mongoose from "mongoose";

const stepSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    historyId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "History",
    },
    name: {
      type: String,
      required: true,
    },
    uri: {
      type: String,
      required: true,
    },
    hash: {
      type: String,
      required: false,
    },
    randomizeProof: {
      type: String,
      required: true,
    },
    public: {
      type: Boolean,
      default: false,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    main_eth_notarization: {
      type: String,
      default: null,
    },
    test_eth_notarization: {
      type: String,
      default: null,
    },
    bitcoin_notarization: {
      type: String,
      default: null,
    },
    ipfs_notarization: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const Step = mongoose.model("Step", stepSchema);

export default Step;
