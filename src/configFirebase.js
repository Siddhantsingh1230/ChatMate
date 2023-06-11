import { initializeApp } from 'firebase/app';
import { onAuthStateChanged, signOut, getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyBVLZWRT4qXSZEgcsNlsZoYcfFtdheD2mw",
  authDomain: "chatmate-6be73.firebaseapp.com",
  projectId: "chatmate-6be73",
  storageBucket: "chatmate-6be73.appspot.com",
  messagingSenderId: "1077875192816",
  appId: "1:1077875192816:web:cc94b6873dc90b77b46335",
  measurementId: "G-LCJT1WCYXQ"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);

const signInWithGoogle = () => {
signInWithPopup(auth, provider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    // IdP data available using getAdditionalUserInfo(result)
    // ...
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
  });
};
const signOutOfGoogle=()=>{
    signOut(auth).then(() => {
    // Sign-out successful.
    }).catch((error) => {
    // An error happened.
    });
}




export { db,signOutOfGoogle,signInWithGoogle,auth};


