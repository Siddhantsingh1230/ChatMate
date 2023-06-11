import { signOutOfGoogle } from '../configFirebase.js';

 const Logout =()=>{
   return (
      <div onClick={signOutOfGoogle} className="logout">
          <img src="images/logout.png" alt="logout" />
      </div>
     );
 }
 export default Logout;