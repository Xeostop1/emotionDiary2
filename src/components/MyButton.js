const MyButton = ({ text, type, onClick }) => {
  const btnType = ["positive", "negative"].includes(type) ? type : "default";
  return (
    <button
      onClick={onClick}
      className={["MyButton", `MyButton_${type}`].join(" ")}
    >
      {text}
    </button>
  );
};

MyButton.defaultProps = {
  type: "default",
};
export default MyButton;
