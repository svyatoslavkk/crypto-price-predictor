import SideBar from "../../components/sideBar/SideBar";
import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { database } from "../../firebase/firebaseConfig";

interface User {
  id: string;
  userName: string;
  email: string;
}

export default function Rankings() {
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
    <div>
      <h2>Rankings</h2>
      <div>
        <h2>User List</h2>
        <ul>
          {users.map((user: User) => (
            <li key={user.id}>
              <strong>{user.userName}</strong> - {user.email}
            </li>
          ))}
        </ul>
      </div>
      <SideBar />
    </div>
  )
}