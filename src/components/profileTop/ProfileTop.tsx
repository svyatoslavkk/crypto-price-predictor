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

  const increaseBalance = async () => {
    try {
      const userDocRef = doc(database, 'Users Data', '2Xm3uwRnmbBUoxMnkzEl');
      const userDocSnapshot = await getDoc(userDocRef);
  
      if (userDocSnapshot.exists()) {
        const updatedBalance = userDocSnapshot.data().balance + 50;
  
        await updateDoc(userDocRef, { balance: updatedBalance });
  
        setFireData(prevData =>
          prevData.map(data =>
            data.uid === user.uid ? { ...data, balance: updatedBalance } : data
          )
        );
      } else {
        console.error('Документ пользователя не найден.');
      }
    } catch (error) {
      console.error('Ошибка обновления баланса:', error);
    }
  };

  const decreaseBalance = async () => {
    try {
      const userDocRef = doc(database, 'Users Data', '2Xm3uwRnmbBUoxMnkzEl');
      const userDocSnapshot = await getDoc(userDocRef);
  
      if (userDocSnapshot.exists()) {
        const updatedBalance = userDocSnapshot.data().balance - 50;
  
        await updateDoc(userDocRef, { balance: updatedBalance });
  
        setFireData(prevData =>
          prevData.map(data =>
            data.uid === user.uid ? { ...data, balance: updatedBalance } : data
          )
        );
      } else {
        console.error('Документ пользователя не найден.');
      }
    } catch (error) {
      console.error('Ошибка обновления баланса:', error);
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
        <img src={exImg} className="large-circle-img" alt="Avatar" />
      </div>
      <div className="username-section">
        {fireData && fireData
        .filter((data: UserData) => data.uid === user?.uid)
        .map((data) => (
          <span key={data.id} className="large-header">{data.userName ? data.userName : 'NO_AUTH'}</span>
        ))}
      </div>
      <div className="buttons">
        <button className="sq-btn">
          <ContentCopyIcon fontSize='small' />
          <span>Copy Username</span>
        </button>
      </div>
      <div className="balance-section">
        <span className="medium-text">Your Balance</span>
        <div className="balance-amount">
          <button onClick={increaseBalance}>
            +50
          </button>
          <button onClick={decreaseBalance}>
            -50
          </button>
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
            <h3 className="stat-value">80%</h3>
            <span className="small-text">Win Rate</span>
          </div>
        </div>
      </div>
    </div>
  )
}