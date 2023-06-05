// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// const auth = getAuth(app);
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCwGOLiaTGRO9RxVgRFoOnpyMSWl8G__xE",
  authDomain: "myfirst-app-f2fa1.firebaseapp.com",
  databaseURL: "https://myfirst-app-f2fa1-default-rtdb.firebaseio.com",
  projectId: "myfirst-app-f2fa1",
  storageBucket: "myfirst-app-f2fa1.appspot.com",
  messagingSenderId: "470922876716",
  appId: "1:470922876716:web:0975eb55eb12ce1bf7be89"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;