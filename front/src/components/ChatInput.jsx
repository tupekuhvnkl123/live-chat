import { useState } from "react";
import S from "./ChatInput.module.css";
import sendIcon from "../assets/send.svg";

const ChatInput = ({ onSubmit }) => {
  const [message, setMessage] = useState("");

  const submitHandler = () => onSubmit(message, () => setMessage(""));

  return (
    <div className={S.container}>
      <button className={S.button} onClick={submitHandler}>
        <img src={sendIcon} alt="Send Icon" />
      </button>
      <input
        onKeyDown={({ key }) => {
          if (key === "Enter") {
            submitHandler();
          }
        }}
        type="text"
        className={S.input}
        placeholder="כתיבת תגובה"
        value={message}
        onChange={({ target }) => setMessage(target.value)}
      />
    </div>
  );
};

export default ChatInput;
