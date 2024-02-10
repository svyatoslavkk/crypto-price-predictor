import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import TopButtons from '../topButtons/TopButtons';
import { useEffect, useState } from "react";
import { collection, getDocs, onSnapshot, QuerySnapshot, DocumentData } from 'firebase/firestore';
import { database } from "../../firebase/firebaseConfig";
import CasinoIcon from '@mui/icons-material/Casino';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import { useUserContext } from '../../context/UserContext';
import { User } from '../../types/types';

export default function ProfileTop() {
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

  const myCurrRank = users
  .filter((data) => data.uid === user?.uid)
  .map((data) => data.rank)[0];

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

  const pageTitle = '';

  return (
    <div className="profile-top">
      <TopButtons pageTitle={pageTitle} />
      <div className="avatar-section">
        {fireData && fireData
        .filter((data: User) => data.uid === user?.uid)
        .map((data: User) => (
          <img key={data.id} src={data.avatar ? data.avatar : exImg} className="large-circle-img" alt="Avatar" />
        ))}
      </div>
      <div className="username-section">
        {fireData && fireData
        .filter((data: User) => data.uid === user?.uid)
        .map((data: User) => (
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
          .filter((data: User) => data.uid === user?.uid)
          .map((data: User) => (
            <h3 key={data.id} className="large-header">${data.balance ? data.balance.toFixed(2) : '0.00'}</h3>
          ))}
        </div>
        <div className="stats-info">
          <div className="stat">
            <ShowChartIcon fontSize="small" sx={{ color: '#f0de69' }} />
            <h3 className="small-header">#{myCurrRank}</h3>
            <span className="small-text">Rank</span>
          </div>
          <div className="stat">
            <EmojiEventsIcon fontSize="small" sx={{ color: '#f0de69' }} />
            {fireData && fireData
              .filter((data: User) => data.uid === user?.uid)
              .map((data: User) => {
                const winRate = (data.winBets / data.totalBets) * 100;
                return (
                  <h3 key={data.id} className="small-header">{data.totalBets !== 0 ? winRate.toFixed(0) : 0}%</h3>
                );
            })}
            <span className="small-text">Win Rate</span>
          </div>
          <div className="stat">
            <CasinoIcon fontSize="small" sx={{ color: '#f0de69' }} />
            {fireData && fireData
            .filter((data: User) => data.uid === user?.uid)
            .map((data: User) => (
              <h3 key={data.id} className="small-header">{data.totalBets !== undefined ? data.totalBets : '-'}</h3>
            ))}
            <span className="small-text">Total bets</span>
          </div>
        </div>
      </div>
    </div>
  )
}