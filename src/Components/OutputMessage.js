const OutputMessage=({msg,src})=>{
  return(
    <div className="msgContainerO">
          <div className="msgOutgoing">
            <div className="msgs">
              <p>{msg}
              </p>
            </div>
          </div>
          <div class="dpImageO">
              <img src={src} alt="dp" />
            </div>
        </div>
    );
}
export default OutputMessage;