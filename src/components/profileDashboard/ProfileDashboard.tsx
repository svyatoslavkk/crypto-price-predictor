import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import { useState, useEffect } from "react";
import {
  getAuth,
  onAuthStateChanged,
} from 'firebase/auth';
import { 
  collection, 
  getDocs,
} from 'firebase/firestore';
import { app, database } from "../../firebase/firebaseConfig";

export default function ProfileDashboard() {
  const [fireData, setFireData] = useState<any[]>([]);
  const [user, setUser] = useState<any>(null);
  const auth = getAuth(app);
  const collectionRef = collection(database, 'Users Data');

  const exImg = 'https://www.aipromptsgalaxy.com/wp-content/uploads/2023/06/subrat_female_avatar_proud_face_Aurora_a_25-year-old_girl_with__fd0e4c59-bb7e-4636-9258-6690ec6a71e7.png';

  const getData = async () => {
    try {
      const response = await getDocs(collectionRef);
      setFireData(response.docs.map((data) => ({ ...data.data(), id: data.id })));
      console.log("FIREDATA", fireData);
    } catch (error) {
      console.error('Error getting data:', error);
    }
  };

  useEffect(() => {
    let token = sessionStorage.getItem('Token');
    if (token) {
      getData();

      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          setUser(user);
        } else {
          setUser(null);
        }
      });

      return () => unsubscribe();
    }
  }, []);

  return (
    <div className="double-window">
      <div className="mini-window">
        <div className="top">
          <h3 className="small-text">Balance</h3>
          <div></div>
        </div>
        {fireData && fireData
        .filter((data) => data.uid === user?.uid)
        .map((data) => (
          <h3 key={data.id} className="small-header">${data.balance ? data.balance.toFixed(2) : '0.00'}</h3>
        ))
        }
        <div className="percentage-progress">
          <ArrowCircleUpIcon fontSize='small' />
          <span>23.30%</span>
        </div>
      </div>
      <div className="mini-window">
        <div className="top">
          <h3 className="small-text">Profile</h3>
          <div></div>
        </div>
        <img src={exImg} className="medium-circle-img" alt="Avatar" />
        {fireData && fireData
        .filter((data) => data.uid === user?.uid)
        .map((data) => (
          <span key={data.id} className="small-header">{data.userName ? data.userName : 'NO_AUTH'}</span>
        ))
        }
      </div>
    </div>
  )
}