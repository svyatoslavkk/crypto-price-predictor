import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import HeaderPanel from '../headerPanel/HeaderPanel';
import ModernBalance from '../modernBalance/ModernBalance';
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

export default function ProfilePanel() {
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

  const userImg = fireData
  .filter((data) => data.uid === user?.uid)
  .map((data) => data.avatar)[0];

  const userUserName = fireData
  .filter((data) => data.uid === user?.uid)
  .map((data) => data.userName)[0];

  const userBalance = fireData
  .filter((data) => data.uid === user?.uid)
  .map((data) => data.balance)[0];

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
    <section className="profile-panel">
      <HeaderPanel 
        userImg={userImg}
        userUserName={userUserName}
      />
      <div className="panel-info">
        <div className="panel-main">
          {fireData && fireData
          .filter((data) => data.uid === user?.uid)
          .map((data) => (
            <img key={data.id} src={data.avatar ? data.avatar : exImg} className="panel-sq-img" alt="Profile Image" />
          ))}
          <div className="panel-darken"></div>
          <div className="panel-username">
            {fireData && fireData
            .filter((data) => data.uid === user?.uid)
            .map((data) => (
              <span key={data.id} className="medium-text">{data.userName ? data.userName : 'NO_AUTH'}</span>
            ))}
            <button className="sq-btn">
              <ArrowOutwardIcon />
            </button>
          </div>
        </div>
        <div className="panel-rank">
          <span className="small-text">Rank</span>
          <div className="panel-ring">
            <span className="large-text">#3</span>
          </div>
        </div>
      </div>
      <ModernBalance userBalance={userBalance} />
    </section>
  )
}