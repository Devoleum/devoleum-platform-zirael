import mongoose from "mongoose";

const tokenSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    secret: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Token = mongoose.model("Token", tokenSchema);

export default Token;
