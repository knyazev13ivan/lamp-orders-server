import mongoose from "mongoose";

const OrderInHistorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    number: {
      type: Number,
      required: true,
    },
    text: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("OrderInHistory", OrderInHistorySchema);
