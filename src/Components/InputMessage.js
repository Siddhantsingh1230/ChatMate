const InputMessage=({msg,src})=>{
  return (
    <div className="msgContainerI">
         <div class="dpImageI">
           <img src={src} alt="dp" />
         </div>
          <div className="msgIncoming">
            <div className="msgs">
              <p>{msg}</p>
            </div>
          </div>
          
    </div>
    );
}
export default InputMessage;