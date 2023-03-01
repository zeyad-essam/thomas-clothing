import mongoose from "mongoose";

const subscriber = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Subscriber", subscriber);
