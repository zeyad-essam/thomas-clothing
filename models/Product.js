import mongoose from "mongoose";

const product = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  slug: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  images: {
    type: mongoose.Schema.Types.Array,
    required: true,
  },
  color: {
    type: Object,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  availableSizes: {
    type: mongoose.SchemaTypes.Array,
    required: true,
  },
  details: {
    type: String,
    required: true,
  },
});

export default mongoose.model("Product", product);
