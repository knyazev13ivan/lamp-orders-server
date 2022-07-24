import mongoose from "mongoose";

const LampSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    locksmith: {
      type: Array,
      default: [],
      required: true,
    },
    painter: {
      type: Array,
      default: [],
    },
    millwright: {
      type: Array,
      default: [],
    },
  },
);

export default mongoose.model("Lamp", LampSchema);
