import express from "express";
import http from "http";
import { Server as socketIo } from "socket.io";
import cors from "cors";
import mongoose from "mongoose";
import Message from "./models/Message.js";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const server = http.createServer(app);
const io = new socketIo(server, {
  cors: {
    origin: "*",
  },
});

app.use(cors());
app.use(express.json());

app.get("/messages", async (req, res) => {
  try {
    const messages = await Message.find().sort({ timestamp: 1 });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

io.on("connection", (socket) => {
  socket.on("sendMessage", async (messageData) => {
    try {
      const newMessage = new Message(messageData);
      await newMessage.save();

      io.emit("receiveMessage", messageData);
    } catch (error) {
      console.error("Error saving message:", error);
    }
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
