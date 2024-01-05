import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDLdtrqm6cQml9IUiq3Wfh9ffQ0w8bGe0k",
  authDomain: "bull-bear-prediction-44800.firebaseapp.com",
  projectId: "bull-bear-prediction-44800",
  storageBucket: "bull-bear-prediction-44800.appspot.com",
  messagingSenderId: "514041414697",
  appId: "1:514041414697:web:27b9ad02f5979f407f0838"
};

export const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);
