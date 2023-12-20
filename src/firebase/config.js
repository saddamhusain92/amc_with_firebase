import { initializeApp } from "firebase/app";
import {getFirestore} from '@firebase/firestore'
import { getAuth } from "firebase/auth";
import {collection} from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyAFpVXF0VflNTV8LendeRg4Ht9Z3x_g6wQ",
  authDomain: "abhilasha-marketing-2023-4d7fa.firebaseapp.com",
  projectId: "abhilasha-marketing-2023-4d7fa",
  storageBucket: "abhilasha-marketing-2023-4d7fa.appspot.com",
  messagingSenderId: "1066754172992",
  appId: "1:1066754172992:web:3c949208ca217d9d3d97a5",
  measurementId: "G-MJV88558WQ"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
 export const db = getFirestore(app)
 export const userscollectionRef = collection(db, "Users");
 export const teamcollectionRef = collection(db, "teamRoot");
 export const refercollectionRef = collection(db, "referalcode");