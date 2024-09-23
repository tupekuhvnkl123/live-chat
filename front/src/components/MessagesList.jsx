import MessageItem from "./MessageItem";
import { getUserId } from "../utils/localStorageUtils";
import S from "./MessagesList.module.css";
import { useEffect, useRef, useState } from "react";
import socket from "../utils/socket";
import { useQuery } from "@tanstack/react-query";
import { fetchMessages } from "../utils/api";
import HashLoader from "react-spinners/HashLoader";

const MessagesList = () => {
  const { data: initialMessages = [], isLoading } = useQuery({
    queryKey: ["messages"],
    queryFn: fetchMessages,
  });
  const [messages, setMessages] = useState(initialMessages);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (!!initialMessages.length && !messages.length) {
      setMessages(initialMessages);
    }
  }, [initialMessages]);

  useEffect(() => {
    const receiveMessage = (messageData) => {
      setMessages((prevMessages) => [...prevMessages, messageData]);
    };

    socket.on("receiveMessage", receiveMessage);

    return () => {
      socket.off("receiveMessage", receiveMessage);
    };
  }, []);

  if (isLoading) {
    return (
      <div>
        <HashLoader color={"#02043a"} />
      </div>
    );
  }

  return (
    <ul className={S.messagesList}>
      {messages.map((msg, index) => (
        <MessageItem
          key={index}
          data={msg}
          isOwnMessage={msg.userId === getUserId()}
        />
      ))}
      <div ref={messagesEndRef} />
    </ul>
  );
};

export default MessagesList;
