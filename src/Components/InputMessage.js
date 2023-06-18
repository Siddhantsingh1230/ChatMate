import PropTypes from 'prop-types';
const InputMessage=({msg,src,type,msgImgSrc,imgViewSrc,showImg})=>{
  return (
    <div className="msgContainerI">
         <div class="dpImageI">
           <img src={src} alt="dp" />
         </div>
          <div className={"msgIncoming "+(type=='img'?' imgP0':'') }>
            <div className="msgs">
              { type=='img'?
                 (<img onClick={()=>{
                   imgViewSrc(msgImgSrc);
                   showImg(true);
                 }} class="imgMsg" src={msgImgSrc} alt="imagemsg" />)
                 :(<p>{msg}</p>)
              }
            </div>
          </div>
          
    </div>
    );
}

InputMessage.defaultProps={
  msgImgSrc:''
}
export default InputMessage;