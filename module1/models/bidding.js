import mongoose from "mongoose";

const bidSchema = new mongoose.Schema({
  name: { type: String, required: true },
  amount: { type: Number, required: true },
  timestamp: { type: Date, default: Date.now }
});

export default mongoose.model("Bid", bidSchema);
