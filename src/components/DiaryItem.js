const DiaryItem=({id, emotion, content, date})=>{
    return(
        <div className="DiaryItem">
            <div className={["emotion_img_wrapper", `emotion_img_wrapper_${emotion}`].join(" ")}>
                <img src={process.env.PUBLIC_URL+ `assets/emotion${emotion}.png`}/>
            </div>
            <div className="info_wrapper">
                <div className="diary_date">여기부터시작</div>
                <div className="diary_content_preview"></div>
            </div>
            <div></div>
        </div>
    );
}

export default DiaryItem;