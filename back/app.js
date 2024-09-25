import express from "express";
import http from "http";
import { Server as socketIo } from "socket.io";
import cors from "cors";
import mongoose from "mongoose";
import Message from "./models/Message.js";
import dotenv from "dotenv";
import { violentWordsList } from "./utils/violent-filter.js";

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

const COOLDOWN_PERIOD = 10 * 1000; // 10 seconds
const userLastMessageTime = {};

const violentLanguage = (message) => {
  return violentWordsList.some((word) => message.includes(word));
};

io.on("connection", (socket) => {
  socket.on("sendMessage", async (messageData) => {
    const { name, message, userId } = messageData;

    const currentTime = Date.now();
    const lastMessageTime = userLastMessageTime[userId] || 0;
    const inCooldown = currentTime - lastMessageTime < COOLDOWN_PERIOD;
    if (
      !name.trim() ||
      !message.trim() ||
      !userId ||
      violentLanguage(message) ||
      inCooldown
    ) {
      return; //! add error handling
    }

    try {
      const newMessage = new Message(messageData);
      await newMessage.save();
      io.emit("receiveMessage", messageData);

      userLastMessageTime[userId] = currentTime;
    } catch (error) {
      console.error("Error saving message:", error);
    }
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
