import { ref,uploadBytes, getDownloadURL } from 'firebase/storage';
import {db,storage,auth} from '../configFirebase.js';
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useState } from 'react';


const Upload =({uploadState})=>{
  const [file,setFile]=useState(null);
  const [imageState,setImageState] = useState(false);
      function selectImage() {
        var input = document.createElement("input");
        input.type = "file";
        input.accept = "image/*";
        input.onchange = function (event) {
          var reader = new FileReader();
          reader.onload = function () {
            setImageState(true);
            document.getElementById(
              "imgFile"
            ).style.backgroundImage = `url('${reader.result}')`;
            document.getElementById('upload').style.display="block";
            
          };
          setFile(event.target.files[0]);
          reader.readAsDataURL(event.target.files[0]);
        };
        input.click();
      }
      function expandImage() {
        if(imageState){
        var imageContainer = document.getElementById("imgFile");
        imageContainer.classList.toggle("expanded");
        }
      }
      function uploadImage(){
          let url=uploadPhotoToStorage(file);
          setImageState(false);
          
      }
      function exit(){
        uploadState(false);
        setImageState(false);
      }
      // Function to upload photo to Firebase Storage and retrieve the download URL
async function uploadPhotoToStorage(file) {
  try {
    // Generate a unique file name for the uploaded photo
    const user = auth.currentUser;
    const fileName = `${user.uid}_${file.name}`;
    
    // Create a storage reference with the desired folder name
    const storageRef = ref(storage, `ImageMessages/${fileName}`);
  
    // Upload the file to the storage reference
     const snapshot = await uploadBytes(storageRef, file);
    // Get the download URL of the uploaded file
    const downloadURL = await getDownloadURL(snapshot.ref);
    addMessage(downloadURL,user.uid,user.photoURL);
     uploadState(false);
    // Return the download url
    return downloadURL;
  } catch (error) {
    // Handle any errors that occur during the upload process
    console.error('Error uploading photo:', error);
    alert(error);
  }
}

const addMessage = async (ImgSrc,uid, photoURL) => {
  try {
    const messagesRef = collection(db, "messages");
    const message = {
      text: '',
      uid: uid,
      photoURL: photoURL,
      createdAt: serverTimestamp(),
      type:'img',
      msgImgSrc:ImgSrc
    };
    await addDoc(messagesRef, message);
    console.log("Message added successfully!");
  } catch (error) {
    console.error("Error adding message:", error);
  }
};

  return (
    <div class="fileUploadContainer">
      <div onClick={()=>{expandImage()}} id="imgFile" class="imgFile">
      </div>
      <div class="btnContainer">
        <div onClick={()=>{selectImage()}} class="actionBtn">Select</div>
        <div onClick={()=>{uploadImage()}} id="upload" class="actionBtn">Upload</div>
      </div>
      <div onClick={exit} class="backBtn">
        <p>{'<'}</p>
      </div>
    </div>
    );
}
export default Upload;



