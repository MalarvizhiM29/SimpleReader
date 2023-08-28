import mongoose from "mongoose";
const { Schema } = mongoose;

const MyPostSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  access: {
    type: String,
    enum: ["Free", "Gold", "Silver"],
    required: true,
  },
});

export default mongoose.model("MyPost", MyPostSchema);
