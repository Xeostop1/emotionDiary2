//========컨트롤 메뉴
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import MyButton from './MyButton';
import DiaryItem from './DiaryItem';

const SortOptionList=[
    {value:"lastest",   name:"최신순"},
    {value:"oldest",   name:"오래된순"},
];

const filterOptionList=[
    {value:"all",   name:"전부다"},
    {value:"good",   name:"긍정"},
    {value:"bad",   name:"부정"},
];



const ControlMenu=({value, onChange, optionList})=>{
    return(
    <select 
        className='ControlMenu'
        value={value}
        onChange={(e)=>onChange(e.target.value)}>
            {optionList.map((it, idx)=>(
            <option key={idx}  value={it.value}>
                {it.name}
            </option>))}
    </select>
)};


const DirayList=({diaryList})=>{
    const navigate=useNavigate();
    const [sortType, setSortType]=useState("lastest");
    const [filter, setFilter]=useState("all");
    

    //===정렬기준 
    const getProcessedDiaryList =()=>{

        const filterCallback=(it)=>{
            if(filter==="good"){
                return parseInt(it.emotion) <=3;
            }else{
                return parseInt(it.emotion) >3;
            }
        }
        const compare=(a,b)=>{
            if(sortType==="lastest"){
                return parseInt(b.date)-parseInt(a.date);
            }else{
                return parseInt(a.date)-parseInt(b.date);
            }
        };

        const copyList =JSON.parse(JSON.stringify(diaryList));
        const filteredList=filter==="all" ? copyList: copyList.filter((it)=>filterCallback(it));
        const sortedList=filteredList.sort(compare);
        return sortedList;
    };



    return(
    <div className='DiaryList'>
       <div className='menu_wrapper'>
            <div className='left_col'>
                <ControlMenu 
                    value={sortType}
                    onChange={setSortType}
                    optionList={SortOptionList}/>
                <ControlMenu 
                    value={filter}
                    onChange={setFilter}
                    optionList={filterOptionList}/>    
     
            </div>
            <div className='right_col'>
                <MyButton
                type={"positive"}
                text={"새 일기 쓰기"}
                onClick={()=>navigate("/new")} />
            </div>
       </div>
        {getProcessedDiaryList().map((it)=> (
            <DiaryItem key={it.id} {...it}/>
        ))}
    </div>);
};

DirayList.defaultProps={
    diaryList: [],
}
export default DirayList;