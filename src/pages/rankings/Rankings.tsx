import SideBar from "../../components/sideBar/SideBar";
import { useState, useEffect } from 'react';
import { collection, getDocs, onSnapshot, QuerySnapshot, DocumentData } from 'firebase/firestore';
import { database } from "../../firebase/firebaseConfig";
import TopButtons from "../../components/topButtons/TopButtons";
import ProfilePanel from "../../components/profilePanel/ProfilePanel";
import ProfileFullScreen from "../../components/profileFullScreen/ProfileFullScreen";
import { User } from "../../types/types";

export default function Rankings() {
  const exImg = 'https://www.aipromptsgalaxy.com/wp-content/uploads/2023/06/subrat_female_avatar_proud_face_Aurora_a_25-year-old_girl_with__fd0e4c59-bb7e-4636-9258-6690ec6a71e7.png';
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
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
  }, []);

  const pageTitle = "Rankings";

  return (
    <div className="screen-container">
      <SideBar />
      <div className="rankings">
        <TopButtons pageTitle={pageTitle} />
        <ul className="list-column">
          {loading ? (
            <>
              {[...Array(11)].map((_, index) => (
                <li key={index} className="rank-item-loading">
                  <div className="card__image"></div>
                </li>
              ))}
            </>
          ) : (
            <>
              {users.sort((a, b) => b.balance - a.balance).map((user: User) => (
                <li key={user.uid} className="rank-item">
                  <div className="flex-info">
                    <img src={user.avatar} className="medium-sq-img" alt="Avatar" />
                    <div className="text-items-column">
                      <h3 className="medium-text">{user.userName}</h3>
                      <h3 className="medium-header">#{user.rank}</h3>
                    </div>
                  </div>
                  <div className="text-items-column">
                    <h3 className="small-header" style={{textAlign: 'right'}}>${user.balance}</h3>
                    <button className="sq-btn-mod" onClick={() => setSelectedUser(user)}>
                      <span className="tiny-color-text">View Profile</span>
                    </button>
                  </div>
                </li>
              ))}
            </>
          )}
        </ul>
      </div>
      <ProfilePanel />
      {selectedUser && (
        <>
          <ProfileFullScreen user={selectedUser} onClose={() => setSelectedUser(null)} />
          <div className="overlap" onClick={() => setSelectedUser(null)}></div>
        </>
      )}
    </div>
  )
}