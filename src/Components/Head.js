import Logout from './Logout.js';

const Head =()=>{
  return (
    <div className="head">
        <img src="images/firebase.png" alt="logo" />
        <p>Chat Mate™</p>
        <Logout/>
      </div>
    );
}

export default Head;