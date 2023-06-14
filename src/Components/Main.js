import Head from './Head.js';
import MBody from './MessageBody.js';
import Input from './Input.js';
import ScrollDown from './ScrollDown.js';
import  { useState, useEffect } from 'react';

const Main=()=>{

  return (
    <>
    <div className="wrapper">
      <Head/>
      <MBody/>
      <Input/>
    </div>
    </>
    );
}
export default Main;