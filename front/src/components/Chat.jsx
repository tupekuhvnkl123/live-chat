import { useEffect, useState } from "react";
import S from "./Chat.module.css";
import ChatInput from "./ChatInput";
import NameModal from "./NameModal";
import socket from "../utils/socket";
import {
  getUserId,
  getUserName,
  getUserColor,
  setUserName,
} from "../utils/localStorageUtils";
import MessagesList from "./MessagesList";

const Chat = () => {
  const [name, setName] = useState(getUserName() || "");
  const [isNameModalOpen, setIsNameModalOpen] = useState(!name);

  useEffect(() => {
    const localStorageName = getUserName();
    if (!localStorageName) {
      setIsNameModalOpen(true);
    } else if (!name) {
      setName(localStorageName);
    }
  }, []);

  const handleMessageSend = (message, callback) => {
    const messageData = {
      name,
      message,
      userId: getUserId(),
      userColor: getUserColor(),
    };
    socket.emit("sendMessage", messageData);
    if (callback) {
      callback();
    }
  };

  const handleNameSubmit = () => {
    if (name.trim()) {
      setUserName(name);
      setIsNameModalOpen(false);
    }
  };

  return (
    <div className={S.container}>
      <h1>Welcome</h1>
      <MessagesList />
      <ChatInput onSubmit={handleMessageSend} />
      {isNameModalOpen && (
        <NameModal
          value={name}
          onSubmit={handleNameSubmit}
          onChange={({ target }) => setName(target.value)}
        />
      )}
    </div>
  );
};

export default Chat;
