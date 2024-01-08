import SideBar from "../../components/sideBar/SideBar";
import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { database } from "../../firebase/firebaseConfig";
import TopButtons from "../../components/topButtons/TopButtons";

interface User {
  id: string;
  userName: string;
  email: string;
  balance: string;
}

export default function Rankings() {
  const exImg = 'https://www.aipromptsgalaxy.com/wp-content/uploads/2023/06/subrat_female_avatar_proud_face_Aurora_a_25-year-old_girl_with__fd0e4c59-bb7e-4636-9258-6690ec6a71e7.png';
  const [users, setUsers] = useState<User[]>([]);

  const getUsers = async () => {
    const collectionRef = collection(database, 'Users Data');
    
    try {
      const snapshot = await getDocs(collectionRef);
      const userList = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as User));
      setUsers(userList);
    } catch (error) {
      console.error('Error getting users:', error);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="rankings">
      <TopButtons />
      <h2 className="large-header">Rankings: Predictors' Hall of Fame</h2>
      <ul className="list-column">
        {users.map((user: User, i) => (
          <li key={user.id} className="rank-item">
            <div className="flex-info">
              <img src={exImg} className="medium-sq-img" alt="Avatar" />
              <div className="text-items-column">
                <h3 className="medium-text">{user.userName}</h3>
                <h3 className="medium-header">#{i + 1}</h3>
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