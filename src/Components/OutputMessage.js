import PropTypes from 'prop-types';
const OutputMessage=({msg,src,type,msgImgSrc,imgViewSrc,showImg})=>{
  return(
    <div className="msgContainerO">
          <div className={"msgOutgoing "+ (type=='img'?' imgP0':'') }>
            <div className="msgs">
              { type=='img'?
                 (<img onClick={()=>{
                   imgViewSrc(msgImgSrc);
                   showImg(true);
                 }}  class="imgMsg" src={msgImgSrc} alt="imagemsg" />)
                 :(<p>{msg}</p>)
              }
            </div>
          </div>
          <div class="dpImageO">
              <img src={src} alt="dp" />
            </div>
        </div>
    );
}

OutputMessage.defaultProps={
  msgImgSrc:''
};
export default OutputMessage;