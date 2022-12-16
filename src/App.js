import React, { useReducer, useRef } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import New from "./pages/New";
import Edit from "./pages/Edit";
import Diary from "./pages/Diary";

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
  return newState;
};

//======export Context
export const DiaryStateContext = React.createContext();
export const DiaryDispatchContext = React.createContext();

//==더미데이터 
const dummy=[
  {
    id: 1,
    emotion: 1,
    content: "오늘의 일기 1번",
    date: 1670484246888,
  },
  {
    id: 2,
    emotion: 2,
    content: "오늘의 일기 2번",
    date: 1670484246889,
  },
  {
    id: 3,
    emotion: 3,
    content: "오늘의 일기 3번",
    date: 1670484246890,
  },
  {
    id: 4,
    emotion: 4,
    content: "오늘의 일기 4번",
    date: 1670484246891,
  },
  {
    id: 5,
    emotion: 5,
    content: "오늘의 일기 5번",
    date: 1670484246892,
  },
];


//====App=========
function App() {
  
  const [data, dispatch] = useReducer(reducer, dummy);
  const dataId = useRef(0);
  //=======dispatch함수
  //crate
  const onCreate = (date, content, emoiton) => {
    dispatch({
      type: "CREATE",
      data: {
        id: dataId.current,
        date: new Date(date).getTime(),
        content,
        emoiton,
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
  const onEdit = (targetId, date, content, emoiton) => {
    dispatch({
      type: "EDIT",
      data: {
        id: targetId,
        date: new Date(date).getTime(),
        content,
        emoiton,
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
              <Route path="/edit" element={<Edit />} />
              <Route path="/diary/:id" element={<Diary />} />
            </Routes>
          </div>
        </BrowserRouter>
      </DiaryDispatchContext.Provider>
    </DiaryStateContext.Provider>
  );
}

export default App;
