import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  name: { type: String, required: true },
  message: { type: String, required: true },
  userColor: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

const Message = mongoose.model("Message", messageSchema);

export default Message;
