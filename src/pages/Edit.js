import { useSearchParams } from "react-router-dom";

const Edit = () => {
  //===쿼리
  const [searchParams, setSearchParams] = useSearchParams();
  const id = searchParams.get("id");
  const mode = searchParams.get("mode");

  return (
    <div>
      <h1>수정페이지입니다</h1>
    </div>
  );
};

export default Edit;
