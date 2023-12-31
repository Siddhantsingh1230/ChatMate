import MsgIn from './InputMessage';
import MsgOut from './OutputMessage';
import ScrollDown from './ScrollDown';
import ImageView from './ImageView.js';
import { useState,useEffect,useRef } from 'react';
import { query, orderBy, collection, onSnapshot } from "firebase/firestore";
import {auth,db} from '../configFirebase.js'

const MessageBody=()=>{
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showArrow, setShowArrow] = useState(false);
  const [showViewImageState,setShowViewImageState]=useState(false);
  const[viewImageSrc,setViewImageSrc]=useState(null);
  
  const user = auth.currentUser.uid;
  const messagesContainerRef = useRef(null);
  //for rapid scroll
  const scrollToBottom = () => {
    if (messagesContainerRef.current) {
      const container = messagesContainerRef.current;
      container.scrollTo(0, container.scrollHeight);
    }
  };
  
  //for smooth scrolling 
  const scrollToBottomSmooth = () => {
  if (messagesContainerRef.current) {
    const container = messagesContainerRef.current;
    container.scrollTo({
      top: container.scrollHeight,
      behavior: 'smooth'
    });
  }
};
///
  const handleScroll=(e)=>{
    if(e.currentTarget.scrollTop<20){
      setShowArrow(true );
    }
    else{
      setShowArrow(false);
    }
  }

///
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  useEffect(() => {
    const messagesRef = collection(db, "messages");
    const messagesQuery = query(messagesRef, orderBy("createdAt"));
    const unsubscribe = onSnapshot(messagesQuery, (snapshot) => {
      const updatedMessages = snapshot.docs.map((doc) => doc.data());
      setMessages(updatedMessages);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);
  
  if (loading) {
    return <div>Loading...</div>;
  }
  //Scroll to Bottom as soon as new msg is added
  return (
    <>
    <div ref={messagesContainerRef} id="messageBody" className="messageBody"
      onScroll={handleScroll}
    >
      {
          messages.map((message, index) => (
            <>
            {
            message.uid===user?
            <MsgOut type={message.type} 
            msgImgSrc={message.msgImgSrc}
            imgViewSrc={setViewImageSrc} 
            showImg={setShowViewImageState} 
              key={index} msg={message.text} src={message.photoURL}/>
            :<MsgIn type={message.type} 
            msgImgSrc={message.msgImgSrc}
            imgViewSrc={setViewImageSrc}
            showImg={setShowViewImageState} 
              key={index} msg={message.text} src={message.photoURL}/>
            }
            </>
            
          ))
      }
    </div>
    {showArrow&&(<ScrollDown call={scrollToBottomSmooth}/>)}
     {
      showViewImageState&&
      <ImageView close={setShowViewImageState} src={viewImageSrc}/>
      }
    </>
  );
 
}
export default MessageBody;







