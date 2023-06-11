import MsgIn from './InputMessage';
import MsgOut from './OutputMessage';
import { useState,useEffect,useRef } from 'react';
import { query, orderBy, collection, onSnapshot } from "firebase/firestore";
import {auth,db} from '../configFirebase.js'

const MessageBody=()=>{
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = auth.currentUser.uid;
  const messagesContainerRef = useRef(null);
  
  const scrollToBottom = () => {
    if (messagesContainerRef.current) {
      const container = messagesContainerRef.current;
      container.scrollTo(0, container.scrollHeight);
    }
  };
  
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
    <div ref={messagesContainerRef} id="messageBody" className="messageBody">
      {
          messages.map((message, index) => (
            <>
            {
            message.uid===user?
            <MsgOut key={index} msg={message.text} src={message.photoURL}/>
            :<MsgIn key={index} msg={message.text} src={message.photoURL}/>
            }
            </>
            
          ))
      }
    </div>
  );
 
}

export default MessageBody;




