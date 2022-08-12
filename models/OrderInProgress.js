import mongoose from "mongoose";

const OrderInProgressSchema = new mongoose.Schema(
  {
    order: {
      type: Object,
      required: true,
    },
    locksmith: {
      type: Object,
      default: {}
    },
    painter: {
      type: Object,
      default: {}
    },
    millwright: {
      type: Object,
      default: {}
    },
    isPause: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("OrderInProgress", OrderInProgressSchema);
