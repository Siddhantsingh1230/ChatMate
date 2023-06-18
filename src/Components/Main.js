import Head from './Head.js';
import MBody from './MessageBody.js';
import Input from './Input.js';
import Upload from './Upload.js';
import ScrollDown from './ScrollDown.js';
import  { useState, useEffect } from 'react';

const Main=()=>{
 const [uploadState,setUploadState]=useState(false);
 
  return (
    <>
    <div className="wrapper">
      <Head/>
      <MBody/>
      <Input uploadState={setUploadState}/>
      {uploadState&&<Upload uploadState={setUploadState}/>}
     
    </div>
    
    </>
    );
}
export default Main;