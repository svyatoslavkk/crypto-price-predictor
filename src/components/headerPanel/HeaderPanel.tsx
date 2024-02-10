import { useState, useEffect } from 'react';
import { useDebounce } from 'use-debounce';
import { collection, getDocs, onSnapshot, QuerySnapshot, DocumentData } from 'firebase/firestore';
import { database } from "../../firebase/firebaseConfig";
import { User } from '../../types/types';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import ProfileFullScreen from '../profileFullScreen/ProfileFullScreen';

export default function HeaderPanel() {
  const [users, setUsers] = useState<User[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearchQuery] = useDebounce(searchQuery, 500);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
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

  return (
    <>
      <header className="header-panel-right">
        <div className="modern-input-block">
          <label className="modern-input-section">
            <input 
              className="modern-input" 
              placeholder="seacrhing players..." 
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
                <li key={user.id} className="flex-between">
                  <div className="flex-info">
                    <img src={user.avatar} className="small-sq-img" alt="Profile Img" />
                    <span className="small-text">{user.userName}</span>
                  </div>
                  <button className="sq-btn-mod" onClick={() => setSelectedUser(user)}>
                    <span className="tiny-color-text">View Profile</span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </header>
      {selectedUser && (
        <>
          <ProfileFullScreen user={selectedUser} onClose={() => setSelectedUser(null)} />
          <div className="overlap" onClick={() => setSelectedUser(null)}></div>
        </>
      )}
    </>
  )
}