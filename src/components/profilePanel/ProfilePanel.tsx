import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import HeaderPanel from '../headerPanel/HeaderPanel';
import ModernBalance from '../modernBalance/ModernBalance';
import ModernWinrate from '../modernWinrate/ModernWinrate';
import { useState, useEffect } from 'react';
import { collection, getDocs, onSnapshot, QuerySnapshot, DocumentData } from 'firebase/firestore';
import { database } from "../../firebase/firebaseConfig";
import { useUserContext } from '../../context/UserContext';
import { User } from '../../types/types';
import { Link } from 'react-router-dom';

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

  const myTotalBets = users
  .filter((data) => data.uid === user?.uid)
  .map((data) => data.totalBets)[0];

  const myWinBets = users
  .filter((data) => data.uid === user?.uid)
  .map((data) => data.winBets)[0];

  const myWinrate = myWinBets / myTotalBets * 100;

  const myCurrRank = users
  .filter((data) => data.uid === user?.uid)
  .map((data) => data.rank)[0];

  const loadingUI = (
    <div className="panel-info">
      <div className="panel-main">
        <div className="panel-main-loading">
          <div className="card__image"></div>
        </div>
        {fireData && fireData
        .filter((data: User) => data.uid === user?.uid)
        .map((data: User) => (
          <img key={data.id} src={data.avatar ? data.avatar : exImg} className="panel-sq-img" alt="Profile Image" style={{opacity: 0}} />
        ))}
        <div className="panel-username" style={{opacity: 0}}>
          {fireData && fireData
          .filter((data: User) => data.uid === user?.uid)
          .map((data: User) => (
            <span key={data.id} className="medium-text">{data.userName ? data.userName : 'NO_AUTH'}</span>
          ))}
          <Link to="/profile">
            <button className="sq-btn">
              <ArrowOutwardIcon />
            </button>
          </Link>
        </div>
      </div>
      <div className="panel-rank">
        <div className="panel-main-loading">
          <div className="card__image"></div>
        </div>
        <span className="small-text" style={{opacity: 0}}>Rank</span>
        <div className="panel-ring" style={{opacity: 0}}>
          <span className="extra-large-text">#{myCurrRank}</span>
        </div>
      </div>
    </div>
  );

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    getUsers();
  }, []);

  useEffect(() => {
    const unsubscribe = onSnapshot(collectionRef, (snapshot: QuerySnapshot<DocumentData>) => {
      const userList = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as User));
      const sortedUsers = userList.sort((a, b) => b.balance - a.balance);

      sortedUsers.forEach((user, index) => {
        user.rank = index + 1;
      });

      setUsers(sortedUsers);
    });

    return () => unsubscribe();
  }, []);

  return (
    <section className="profile-panel">
      <HeaderPanel />
      {loading && loadingUI}
      {!loading && (
      <div className="panel-info">
        <div className="panel-main">
          {fireData && fireData
          .filter((data: User) => data.uid === user?.uid)
          .map((data: User) => (
            <img key={data.id} src={data.avatar ? data.avatar : exImg} className="panel-sq-img" alt="Profile Image" />
          ))}
          <div className="panel-darken"></div>
          <div className="panel-username">
            {fireData && fireData
            .filter((data: User) => data.uid === user?.uid)
            .map((data: User) => (
              <span key={data.id} className="medium-text">{data.userName ? data.userName : 'NO_AUTH'}</span>
            ))}
            <Link to="/profile">
              <button className="sq-btn">
                <ArrowOutwardIcon />
              </button>
            </Link>
          </div>
        </div>
        <div className="panel-rank">
          <span className="small-text">Rank</span>
          <div className="panel-ring">
            <span className="extra-large-text">#{myCurrRank}</span>
          </div>
        </div>
      </div>
      )}
      <ModernBalance />
      <ModernWinrate myWinrate={myWinrate} />
    </section>
  )
}
