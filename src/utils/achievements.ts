import checkIcon from '../assets/check-mark.png';
import { useState, useEffect } from 'react';
import {
  getAuth,
  onAuthStateChanged,
} from 'firebase/auth';
import { 
  collection, 
  getDocs,
} from 'firebase/firestore';
import { app, database } from '../firebase/firebaseConfig';

export const achievements = [
  {
    image: checkIcon,
    header: "Novice Trader",
    description: "Make your first successful prediction.",
    condition: (winBets: number) => winBets > 0,
    achieved: false,
  },
  {
    image: checkIcon,
    header: "Accurate Forecast",
    description: "Successfully predict 3 times in a row.",
    condition: (winBets: number) => false, 
    achieved: false,
  },
  {
    image: checkIcon,
    header: "Master of Trends",
    description: "Successfully predict 5 times in a row.",
    condition: (winBets: number) => false, 
    achieved: false,
  },
  {
    image: checkIcon,
    header: "Relentless Predictor",
    description: "Successfully predict 8 times in a row.",
    condition: (winBets: number) => false, 
    achieved: false,
  },
  {
    image: checkIcon,
    header: "Best of the Best",
    description: "Successfully predict 12 times in a row.",
    condition: (winBets: number) => false, 
    achieved: false,
  },
]