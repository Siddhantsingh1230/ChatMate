import {useEffect} from 'react';
const ImageView=({close,src})=>{
  useEffect(()=>{
    document.getElementById("imgBg").style.backgroundImage=`url('${src}')`;
  },[]);
  
  return (
    <>
    <div className="imgViewContainer">
      <div onClick={()=>{close(false)}} className="closeBtn"><p>X</p></div>
      <div id="imgBg" className="imgBg"></div>
    </div>
    </>
    );
}
export default ImageView;