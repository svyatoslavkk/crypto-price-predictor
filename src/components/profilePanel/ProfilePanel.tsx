import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import HeaderPanel from '../headerPanel/HeaderPanel';
import ModernBalance from '../modernBalance/ModernBalance';
import { useState, useEffect } from 'react';
import { collection, getDocs, onSnapshot, QuerySnapshot, DocumentData } from 'firebase/firestore';
import { database } from "../../firebase/firebaseConfig";
import { useUserContext } from '../../context/UserContext';

interface User {
  id: string;
  userName: string;
  avatar: string;
  email: string;
  rank: number;
  balance: string;
}

export default function ProfilePanel() {
  const exImg = 'https://www.aipromptsgalaxy.com/wp-content/uploads/2023/06/subrat_female_avatar_proud_face_Aurora_a_25-year-old_girl_with__fd0e4c59-bb7e-4636-9258-6690ec6a71e7.png';
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const collectionRef = collection(database, 'Users Data');
  const { user, fireData, fetchData } = useUserContext();

  const getUsers = async () => {
    try {
      const snapshot = await getDocs(collectionRef);
      const userList = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as User));
      setUsers(userList);
    } catch (error) {
      console.error('Error getting users:', error);
    } finally {
      setLoading(false);
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

  const myCurrRank = users
  .filter((data) => data.uid === user?.uid)
  .map((data) => data.rank)[0];
  console.log("myCurrRank", myCurrRank)

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    getUsers();
  }, []);

  useEffect(() => {
    const unsubscribe = onSnapshot(collectionRef, (snapshot: QuerySnapshot<DocumentData>) => {
      const userList = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as User));
      const sortedUsers = userList.sort((a, b) => parseInt(b.balance, 10) - parseInt(a.balance, 10));

      sortedUsers.forEach((user, index) => {
        user.rank = index + 1;
      });

      setUsers(sortedUsers);
    });

    return () => unsubscribe();
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
            <span className="large-text">#{myCurrRank}</span>
          </div>
        </div>
      </div>
      <ModernBalance userBalance={userBalance} />
    </section>
  )
}