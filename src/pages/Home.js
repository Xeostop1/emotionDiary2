import { DiaryStateContext } from "../App";

import { useContext, useEffect, useState } from "react";
import MyHeader from './../components/Myheader';
import MyButton from './../components/MyButton';
import DirayList from "./../components/DiaryList";

const Home = () => {
  const diaryList=useContext(DiaryStateContext);
  //월별로 다이어리 따로보기 데이터 조작
  const [data,setData]=useState([]);
  const [curDate,setCurDate]=useState(new Date());
  const headText=`${curDate.getFullYear()}년 ${curDate.getMonth()+1}월`;
  
  useEffect(()=>{
    if(diaryList.length>=1){
      const fisrtDay=new Date(
        curDate.getFullYear(),
        curDate.getMonth(),
        1
      ).getTime();
      
      const lastDay=new Date(
        curDate.getFullYear(),
        curDate.getMonth()+1,
        0
      ).getTime();
      
      setData(diaryList.filter((it)=>  fisrtDay<= it.date && it.date<=lastDay));
    }
},[diaryList, curDate]);



  useEffect(()=>{
    console.log(data);
  },[data]);

  //===+1월
  const increaseMonth=()=>{
    setCurDate(new Date(curDate.getFullYear(), curDate.getMonth()+1, curDate.getDate())
    );
  };

  //===-1월
  const decreaseMonth=()=>{
    setCurDate(new Date(curDate.getFullYear(), curDate.getMonth()-1, curDate.getDate())
    );
  };


  return (
    <div>
      <MyHeader 
      headText={headText}
      leftChild={<MyButton text={"<"} onClick={decreaseMonth}/>}
      rightChild={<MyButton text={">"} onClick={increaseMonth}/>}
      />
      <DirayList diaryList={data}/>
    </div>
  );
};

export default Home;
