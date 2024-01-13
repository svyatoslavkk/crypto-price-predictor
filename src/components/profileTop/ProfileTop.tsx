import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import TopButtons from '../topButtons/TopButtons';
import { useState, useEffect } from "react";
import {
  getAuth,
  onAuthStateChanged,
} from 'firebase/auth';
import { 
  collection, 
  getDocs,
  doc,
  updateDoc,
  getDoc
} from 'firebase/firestore';
import { app, database } from '../../firebase/firebaseConfig';

export interface UserData {
  avatar: string;
  userName: string;
  balance: number;
  uid: string;
}

export default function ProfileTop() {
  const exImg = 'https://www.aipromptsgalaxy.com/wp-content/uploads/2023/06/subrat_female_avatar_proud_face_Aurora_a_25-year-old_girl_with__fd0e4c59-bb7e-4636-9258-6690ec6a71e7.png';
  const [user, setUser] = useState<any>(null);
  const [fireData, setFireData] = useState<any[]>([]);
  const auth = getAuth(app);
  const collectionRef = collection(database, 'Users Data');

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
    <div className="profile-top">
      <TopButtons />
      <div className="avatar-section">
        {fireData && fireData
        .filter((data: UserData) => data.uid === user?.uid)
        .map((data) => (
          <img key={data.id} src={data.avatar ? data.avatar : exImg} className="large-circle-img" alt="Avatar" />
        ))}
      </div>
      <div className="username-section">
        {fireData && fireData
        .filter((data: UserData) => data.uid === user?.uid)
        .map((data) => (
          <span key={data.id} className="large-header">{data.userName ? data.userName : 'NO_AUTH'}</span>
        ))}
      </div>
      <button className="sq-btn">
        <ContentCopyIcon fontSize='small' />
        <span>Copy Username</span>
      </button>
      <div className="balance-section">
        <span className="medium-text">Your Balance</span>
        <div className="balance-amount">
          {fireData && fireData
          .filter(data => data.uid === user?.uid)
          .map((data) => (
            <h3 key={data.id} className="large-header">${data.balance ? data.balance.toFixed(2) : '0.00'}</h3>
          ))}
          <div className="percentage-progress">
            <ArrowCircleUpIcon fontSize='small' />
            <span>23.30%</span>
          </div>
        </div>
        <div className="stats-info">
          <div className="stat">
            <h3 className="stat-value">#1</h3>
            <span className="small-text">Rank</span>
          </div>
          <div className="stat">
            {fireData && fireData
              .filter(data => data.uid === user?.uid)
              .map((data) => {
                const winRate = (data.winBets / data.totalBets) * 100;
                return (
                  <h3 key={data.id} className="stat-value">{data.totalBets !== 0 ? winRate.toFixed(0) : 0}%</h3>
                );
            })}
            <span className="small-text">Win Rate</span>
          </div>
          <div className="stat">
            {fireData && fireData
            .filter(data => data.uid === user?.uid)
            .map((data) => (
              <h3 key={data.id} className="stat-value">{data.totalBets !== undefined ? data.totalBets : '-'}</h3>
            ))}
            <span className="small-text">Total bets</span>
          </div>
        </div>
      </div>
    </div>
  )
}