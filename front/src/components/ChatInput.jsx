import { useEffect, useState } from "react";
import S from "./ChatInput.module.css";
import sendIcon from "../assets/send.svg";
import { violentWordsList } from "../utils/violent-filter";

const COOLDOWN_PERIOD = 10 * 1000; // 10 seconds

const ChatInput = ({ onSubmit }) => {
  const [message, setMessage] = useState("");
  const [showWarning, setShowWarning] = useState(false);
  const [lastMessageTime, setLastMessageTime] = useState(null);
  const [timeLeft, setTimeLeft] = useState(0);

  const violentLanguage = () => {
    return violentWordsList.some((word) => message.includes(word));
  };

  const submitHandler = () => {
    const currentTime = Date.now();

    if (violentLanguage()) {
      setShowWarning(true);
      setTimeout(() => {
        setShowWarning(false);
      }, [2000]);
      return;
    }

    if (!message.trim()) return;

    if (!lastMessageTime || currentTime - lastMessageTime >= COOLDOWN_PERIOD) {
      setLastMessageTime(currentTime);
      onSubmit(message, () => setMessage(""));
    }
  };

  useEffect(() => {
    if (lastMessageTime) {
      const interval = setInterval(() => {
        const remainingTime = COOLDOWN_PERIOD - (Date.now() - lastMessageTime);
        setTimeLeft(Math.max(0, Math.ceil(remainingTime / 1000)));
        if (remainingTime <= 0) {
          clearInterval(interval);
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [lastMessageTime]);

  return (
    <div className={S.container}>
      {showWarning && <p className={S.warningText}>!הקפד על שפה בוטה</p>}
      <div className={S.inputContainer}>
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
          placeholder={timeLeft > 0 ? `חכה ${timeLeft} שניות` : "כתיבת תגובה"}
          value={message}
          onChange={({ target }) => setMessage(target.value)}
        />
      </div>
    </div>
  );
};

export default ChatInput;
