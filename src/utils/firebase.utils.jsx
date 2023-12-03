// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyAAixjYv3pRGaFGzVKBxc8GIkEveir9TVc",
  authDomain: "blog-93322.firebaseapp.com",
  projectId: "blog-93322",
  storageBucket: "blog-93322.appspot.com",
  messagingSenderId: "130298674693",
  appId: "1:130298674693:web:ea99c8fd52d259be1c666c",
  measurementId: "G-1QX510BN2P",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//google auth

const Provider = new GoogleAuthProvider();

const auth = getAuth();

export const authWihGoogle = async () => {
  let user = null;
 
  await signInWithPopup(auth, Provider).then((result)=>{user = result.user}).catch((err)=>console.log(err));

  return user;
};
