
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth"
const firebaseConfig = {
  apiKey: "AIzaSyDdMxWjJdjwfaIV8DTiZ4aERJMtkXBJDms",
  authDomain: "v-tube-4ce24.firebaseapp.com",
  projectId: "v-tube-4ce24",
  storageBucket: "v-tube-4ce24.appspot.com",
  messagingSenderId: "479795459377",
  appId: "1:479795459377:web:df5daf23c523153e786c10"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const provider = new GoogleAuthProvider();
export default app;