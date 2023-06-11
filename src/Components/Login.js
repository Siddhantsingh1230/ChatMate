import "./Login.css";
import {signInWithGoogle} from '../configFirebase.js';

const Login=()=>{
  function btnControl(e){
    ripple(e);
    setTimeout(signInWithGoogle, 1000);
  }
  
  function ripple(e){
    let x = e.clientX - e.target.offsetLeft;
    let y = e.clientY - e.target.offsetTop;
    let ripples = document.createElement('span');
    ripples.style.left = x + 'px';
    ripples.style.top = y + 'px';
    e.target.appendChild(ripples);
    setTimeout(() => {
      ripples.remove()
    },1000);
  }
  
  return (
    <div className="btn-container">
      <a className="login" onClick={btnControl}>Login</a>
    </div>
    );
}
export default Login;