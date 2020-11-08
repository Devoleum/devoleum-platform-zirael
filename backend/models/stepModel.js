import mongoose from 'mongoose'

const stepSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    history: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'History',
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
    main_eth_notarization: {
      type: String,
      required: false,
    },
    test_eth_notarization: {
      type: String,
      required: false,
    },
    bitcoin_notarization: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
)

const Step = mongoose.model('Step', stepSchema)

export default Step
