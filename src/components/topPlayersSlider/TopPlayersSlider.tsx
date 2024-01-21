import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import { useState, useEffect } from "react";
import { collection, getDocs, onSnapshot, QuerySnapshot, DocumentData } from 'firebase/firestore';
import { database } from "../../firebase/firebaseConfig";
import { User } from '../../types/types';

export default function TopPlayersSlider() {
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
      const sortedUsers = userList.sort((a, b) => b.balance - a.balance);

      sortedUsers.forEach((user, index) => {
        user.rank = index + 1;
      });

      setUsers(sortedUsers);
    });

    return () => unsubscribe();
  }, []);

  return(
    <section className="list-column">
      <div className="header-section">
        <h3 className="small-header">Top Players</h3>
        <div></div>
      </div>
      <Splide
        options={ {
          perPage: 4,
          perMove: 1,
          rewind : true,
          height: '8.0rem',
          pagination: false,
          gap    : '0.5rem',
        } }
        aria-labelledby="basic-example-heading"
      >
        {users.sort((a, b) => b.balance - a.balance).map((user: User) => (
          <SplideSlide key={user.uid}>
            <div className="chart-item">
              <div className="visual-info">
                <img className="large-sq-img" src={user.avatar} alt="Profile Image" />
                <div className="position-item">
                  <span className="small-text" style={{color: '#050505', fontWeight: 700}}>{user.rank}</span>
                </div>
              </div>
              <h3 className="small-header">{user.userName}</h3>
              <span className="small-text">${user.balance}</span>
            </div>
          </SplideSlide>
        ))}
      </Splide>
    </section>
  )
}
