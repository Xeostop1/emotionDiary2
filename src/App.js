import React, { useReducer, useRef,useEffect } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import New from "./pages/New";
import Edit from "./pages/Edit";
import Diary from "./pages/Diary";
//import { dummy } from "./util/dummy";



//=====reducer 스위치문=====
const reducer = (state, action) => {
  let newState = [];
  switch (action.type) {
    case "INIT": {
      return action.data;
    }
    case "CREATE": {
      newState = [action.data, ...state];
      break;
    }
    case "REMOVE": {
      newState = state.filter((it) => it.id !== action.targetId);
      break;
    }
    case "EDIT": {
      newState = state.map((it) =>
        it.id === action.data.id ? { ...action.data } : it
      );
      break;
    }
    default:
      return state;
  }
  localStorage.setItem("diary", JSON.stringify(newState));
  return newState;
};

//======export Context
export const DiaryStateContext = React.createContext();
export const DiaryDispatchContext = React.createContext();

//====App=========
function App() {
  
  useEffect(()=>{
    const localDate=localStorage.getItem("diary");
    if(localDate){
      const diaryList= JSON.parse(localDate).sort((a,b)=>parseInt(b.id)-parseInt(a.id));
      // console.log(diaryList);  // console.log(dataId);
      if(diaryList.length>=1){
      dataId.current=parseInt(diaryList[0].id)+1;
      dispatch({type:"INIT", data:diaryList})}
    }
  },[]);

//더미데이터 넣는 곳
  const [data, dispatch] = useReducer(reducer, []);
  //수정사항
  const dataId = useRef(0);
  //=======dispatch함수
  //crate
  const onCreate = (date, content, emotion) => {
    dispatch({
      type: "CREATE",
      data: {
        id: dataId.current,
        date: new Date(date).getTime(),
        content,
        emotion,
      },
    });
    dataId.current += 1;
  };
  //remove
  const onRemove = (targetId) => {
    dispatch({
      type: "REMOVE",
      targetId,
    });
  };
  //edit
  const onEdit = (targetId, date, content, emotion) => {
    dispatch({
      type: "EDIT",
      data: {
        id: targetId,
        date: new Date(date).getTime(),
        content,
        emotion,
      },
    });
  };

  return (
    <DiaryStateContext.Provider value={data}>
      <DiaryDispatchContext.Provider value={{ onCreate, onEdit, onRemove }}>
        <BrowserRouter>
          <div className="App">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/new" element={<New />} />
              <Route path="/edit/:id" element={<Edit />} />
              <Route path="/diary/:id" element={<Diary />} />
            </Routes>
          </div>
        </BrowserRouter>
      </DiaryDispatchContext.Provider>
    </DiaryStateContext.Provider>
  );
}

export default App;