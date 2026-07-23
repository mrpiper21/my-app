import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// Optionally import the services that you want to use
// import {...} from 'firebase/database';
// import {...} from 'firebase/firestore';
// import {...} from 'firebase/functions';
// import {...} from 'firebase/storage';

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDIJoOXCH9GfZiXIevwzOinKC8Xx5sdDJE",
  authDomain: "caesar-70239.firebaseapp.com",
  databaseURL: "https://caesar-70239-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "caesar-70239",
  storageBucket: "caesar-70239.firebasestorage.app",
  messagingSenderId: "555299674162",
  appId: "1:555299674162:web:7feb926a260b5fc1c4042b",
  measurementId: "G-GLG23ZMBEB"
};

export  const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase
