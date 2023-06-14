import {useState,useEffect} from 'react';

const ScrollDown=({call})=>{
  
  return (
    <>
    <div onClick={call}  className="scrollDown">
        <img src="images/arrow.png" alt="scroller" />
    </div>
    
    </>
    );
}
export default ScrollDown;



