// // lib/firebase.js
// import { initializeApp, getApps, getApp } from "firebase/app";
// import { getAuth } from "firebase/auth";

// const firebaseConfig = {
//   apiKey: "YOUR_API_KEY",
//   authDomain: "your-app.firebaseapp.com",
//   projectId: "your-app-id",
//   storageBucket: "your-app.appspot.com",
//   messagingSenderId: "your-sender-id",
//   appId: "your-app-id",
// };

// const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
// const auth = getAuth(app);

// export { auth };


// Import the functions you need from the SDKs you need
import { initializeApp ,getApps, getApp} from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCl0LwJ_Ubb_HOXMFJLh8SG4PUJCMyXLB0",
  authDomain: "fir-2ad11.firebaseapp.com",
  projectId: "fir-2ad11",
  storageBucket: "fir-2ad11.appspot.com",
  messagingSenderId: "42564608191",
  appId: "1:42564608191:web:9c864d81c5b46256b2260a",
  measurementId: "G-WV21FZM5RB"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig):getApp();
const auth = getAuth(app);
export{auth}
