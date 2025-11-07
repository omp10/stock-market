import mongoose from "mongoose";

const stockSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  name: {
    type: String,
    required: true,
    match: /^[A-Z]{1,12}$/,
  },
});

const Stock = mongoose.model("Stock", stockSchema);
export default Stock;
