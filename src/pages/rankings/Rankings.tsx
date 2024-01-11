import SideBar from "../../components/sideBar/SideBar";
import { useState, useEffect } from 'react';
import { collection, getDocs, onSnapshot, QuerySnapshot, DocumentData } from 'firebase/firestore';
import { database } from "../../firebase/firebaseConfig";
import TopButtons from "../../components/topButtons/TopButtons";
import SimpleLoader from "../../components/loaders/simpleLoader/SimpleLoader";

interface User {
  id: string;
  userName: string;
  email: string;
  rank: number;
  balance: string;
}

export default function Rankings() {
  const exImg = 'https://www.aipromptsgalaxy.com/wp-content/uploads/2023/06/subrat_female_avatar_proud_face_Aurora_a_25-year-old_girl_with__fd0e4c59-bb7e-4636-9258-6690ec6a71e7.png';
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const collectionRef = collection(database, 'Users Data');

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
  }, [collectionRef]);

  const pageTitle = "Rankings";

  const loadingUI = Array.from({ length: 5 }, (_, index) => (
    <li className="rank-item">
      <SimpleLoader />
      <div className="flex-info">
        <img src={exImg} className="medium-sq-img" alt="Avatar" style={{opacity: 0}} />
        <div className="text-items-column" style={{opacity: 0}}>
          <h3 className="medium-text">Text</h3>
          <h3 className="medium-header">#Rank</h3>
        </div>
      </div>
      <div className="text-items-column">
        <h3 className="small-header"  style={{opacity: 0}}>$Balance</h3>
        <button className="sq-btn-mod" style={{opacity: 0}}>
          <span className="tiny-color-text">View Profile</span>
        </button>
      </div>
    </li>
  ));

  return (
    <div className="rankings">
      <TopButtons pageTitle={pageTitle} />
      <ul className="list-column">
        {loading && loadingUI}
        {users.sort((a, b) => parseInt(b.balance, 10) - parseInt(a.balance, 10)).map((user: User) => (
          <li key={user.id} className="rank-item">
            <div className="flex-info">
              <img src={exImg} className="medium-sq-img" alt="Avatar" />
              <div className="text-items-column">
                <h3 className="medium-text">{user.userName}</h3>
                <h3 className="medium-header">#{user.rank}</h3>
              </div>
            </div>
            <div className="text-items-column">
              <h3 className="small-header" style={{textAlign: 'right'}}>${user.balance}</h3>
              <button className="sq-btn-mod">
                <span className="tiny-color-text">View Profile</span>
              </button>
            </div>
          </li>
        ))}
      </ul>
      <SideBar />
    </div>
  )
}