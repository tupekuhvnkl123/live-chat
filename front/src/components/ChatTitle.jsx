import S from "./ChatTitle.module.css";

const ChatTitle = () => {
  return (
    <div className={S.container}>
      <h1>צ&apos;אט לייב</h1>
      <p>נא שימרו על שפה נקייה אשר מכבדת אתכם</p>
      <div className={S.linearColor} />
    </div>
  );
};

export default ChatTitle;
