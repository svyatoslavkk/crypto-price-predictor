import { useState, useEffect } from 'react';
import { useDebounce } from 'use-debounce';
import { collection, getDocs, onSnapshot, QuerySnapshot, DocumentData } from 'firebase/firestore';
import { database } from "../../firebase/firebaseConfig";
import { User } from '../../types/types';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';

export default function HeaderPanel({ userImg, userUserName }) {
  const exImg = 'https://www.aipromptsgalaxy.com/wp-content/uploads/2023/06/subrat_female_avatar_proud_face_Aurora_a_25-year-old_girl_with__fd0e4c59-bb7e-4636-9258-6690ec6a71e7.png';
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearchQuery] = useDebounce(searchQuery, 500);
  const collectionRef = collection(database, 'Users Data');

  const handleInputChange = (e: any) => {
    setSearchQuery(e.target.value);
  };

  const filteredUsers = users.filter((user) =>
    user.userName.toLowerCase().includes(debouncedSearchQuery.toLowerCase())
  );

  const clearSearchQuery = () => {
    setSearchQuery('');
  };

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

  return (
    <>
      <header className="header-panel-right">
        <div className="modern-input-block">
          <label className="modern-input-section">
            <input 
              className="modern-input" 
              placeholder="seacrhing..." 
              value={searchQuery}
              onChange={handleInputChange}
            />
            <button className="modern-circle-btn">
              <SearchIcon />
            </button>
            <button className="clear-icon" onClick={clearSearchQuery}>
              <ClearIcon />
            </button>
          </label>
          {debouncedSearchQuery.length >= 3 && (
            <ul className="explore-results">
              {filteredUsers.map((user: User) => (
                <li key={user.id} className="flex-info">
                  <img src={user.avatar} className="small-sq-img" alt="Profile Img" />
                  <span className="small-text">{user.userName}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="flex-info">
          <span className="medium-text">{userUserName}</span>
          <img src={userImg} className="medium-circle-img" alt="Profile Image" />
        </div>
      </header>
    </>
  )
}