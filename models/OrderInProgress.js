import mongoose from "mongoose";

const OrderInProgressSchema = new mongoose.Schema(
  {
    order: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'OrderInLine',
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
    // lamp: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: 'Lamp',
    //   required: true,
    // },
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
