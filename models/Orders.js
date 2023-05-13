import mongoose from "mongoose";

const OrdersSchema = new mongoose.Schema(
  {
    customer: {
      type: String,
      maxlength: 60,
      required: true,
    },
    address: {
      type: String,
      maxlength: 200,
      required: true,
    },
    total: {
      type: Number,
      required: true,
    },
    status: {
      type: Number,
      default: 0,
    },
    method: {
      type: Number,
      required: true,
    }
  },
  { timestamps: true }
);

export default mongoose.models.Orders || mongoose.model("Orders", OrdersSchema);
