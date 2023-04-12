import mongoose from "mongoose";

const message = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    userName: {
      type: String,
      required: true,
    },
    object: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Message", message);
