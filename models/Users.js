import mongoose from "mongoose";


const UsersSchema = new mongoose.Schema(
  {
    name: { type: String },
    email: { type: String },
    pass: { type: String }
  },
  { timestamps: true }
);

export default mongoose.models.Users ||
  mongoose.model("Users", UsersSchema);