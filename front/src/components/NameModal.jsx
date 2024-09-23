import S from "./NameModal.module.css";
import sendIcon from "../assets/send.svg";

const NameModal = ({ onChange, onSubmit, value }) => {
  return (
    <div className={S.container}>
      <div className={S.content}>
        <h1>שם מלא</h1>
        <div className={S.inputContainer}>
          <button className={S.button} onClick={onSubmit}>
            <img src={sendIcon} alt="Send Icon" />
          </button>
          <input
            className={S.input}
            type="text"
            value={value}
            onChange={onChange}
            placeholder="שם מלא"
            onKeyDown={({ key }) => {
              if (key === "Enter") {
                onSubmit();
              }
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default NameModal;
