import { initializeApp } from "firebase/app";
import { getAuth} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage} from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyCOVlsFRj7GKc9_n6iLRO9NcoGp759JSA0",
  authDomain: "chat-58184.firebaseapp.com",
  projectId: "chat-58184",
  storageBucket: "chat-58184.appspot.com",
  messagingSenderId: "399045275946",
  appId: "1:399045275946:web:2fad2bba0b68de8e816e53"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore()