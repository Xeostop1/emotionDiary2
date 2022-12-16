import { useParams } from "react-router-dom";

const Diary = () => {
  const { id } = useParams();
  return (
    <div>
      <h1>다이어리</h1>
      다이어리
    </div>
  );
};

export default Diary;
