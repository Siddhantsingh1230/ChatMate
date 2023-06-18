//  All Inports 
import {useState} from 'react';
import {db,auth} from '../configFirebase.js';
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import TyperDot from './TyperDot.js';
import Cursor from './Cursor.js';
/////////////////////////

const Input=({uploadState})=>{
  const [inputValue,setInputValue]=useState('');
  
  //handling input focus and blur
  const [isInputFocused, setIsInputFocused] = useState(false);

  const handleInputFocus = () => {
    setIsInputFocused(true);
  };

  const handleInputBlur = () => {
    setIsInputFocused(false);
  };
  //saving Msgs to FireStore
  const addMessage = async (text, uid, photoURL) => {
  try {
    const messagesRef = collection(db, "messages");
    const message = {
      text: text,
      uid: uid,
      photoURL: photoURL,
      createdAt: serverTimestamp(),
      type:'text',
      msgImgSrc:''
    };
    await addDoc(messagesRef, message);
    console.log("Message added successfully!");
  } catch (error) {
    console.error("Error adding message:", error);
  }
};
//for removing leading newlines
function removeLeadingNewlines(text) {
  return text.replace(/^\n+/, '');
}
//handling on click for send btn
  const sendMsg=(e)=>{
    setInputValue(removeLeadingNewlines(inputValue));
    if(inputValue.trim()){
    const user=auth.currentUser;
    const { uid, photoURL } = user;
    addMessage(inputValue,uid,photoURL);
    //clearing Input Field After Sending
    }
    setInputValue('');
  }
  
  return(
    <div className="msgInput">
        {inputValue?<TyperDot/>:null}
        <div className="input">
          { !isInputFocused ? <Cursor /> : null}
          <div className="msgBox">
            <textarea
             onFocus={handleInputFocus}
             onBlur={handleInputBlur}
             onChange={(e)=>{setInputValue(e.target.value)}}
              name="input"
              id="input"
              value={inputValue}
              placeholder="Type here..."
            ></textarea>
          </div>
          <img onClick={()=>{          uploadState(true)
          }} id="uploadImg" src="images/clip.png" alt="upload" />
          <img onClick={sendMsg} id="send" src="images/send.png" alt="send" />
        </div>
      </div>
    );
}
export default Input;