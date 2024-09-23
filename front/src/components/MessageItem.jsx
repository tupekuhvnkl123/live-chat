import S from "./MessageItem.module.css";

const MessageItem = ({ data, isOwnMessage }) => {
  const { name, message, userColor } = data;

  return (
    <div className={S.container}>
      <div className={`${S.secondaryContainer} ${isOwnMessage && S.myMessage}`}>
        {/* content */}
        <div className={S.contentContainer}>
          <h1>{name}</h1>
          <p>{message}</p>
        </div>
        {/* creator */}
        <div className={S.creatorContainer}>
          <div
            className={S.creator}
            style={{ backgroundColor: userColor || "#7aceff" }}
          >
            <span>{name.charAt(0)}</span>
          </div>
        </div>
      </div>

      {/* seperate line */}
      <hr className={S.seperateLine} />
    </div>
  );
};

export default MessageItem;
