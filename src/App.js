import './App.css';
import Login from './Components/Login.js';
import Main from './Components/Main.js';
import { useAuthState } from 'react-firebase-hooks/auth';
import {auth} from './configFirebase.js';
import {useState,useEffect} from 'react';
import Spinner from './Components/Spinner.js' ;

const App=()=> {
  const [user]=useAuthState(auth);
  const [showSpinner, setShowSpinner] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSpinner(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <>{
    showSpinner && !user ? (
        <Spinner/>
      ):
      (user?<Main/>:<Login/>)
    }
    </>
  );
}

export default App;
