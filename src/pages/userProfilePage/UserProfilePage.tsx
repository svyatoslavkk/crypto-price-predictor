import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { collection, getDocs, onSnapshot, QuerySnapshot, DocumentData } from 'firebase/firestore';
import { database } from "../../firebase/firebaseConfig";
import ProfileFullScreen from '../../components/profileFullScreen/ProfileFullScreen';
import { User } from "../../types/types";

export default function UserProfilePage() {
  const { uid, rank } = useParams();
  const [user, setUser] = useState<User>();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const collectionRef = collection(database, 'Users Data');
  const navigate = useNavigate();
  console.log("rank", rank);

  const getUsers = async () => {
    try {
      const snapshot = await getDocs(collectionRef);
      const userList = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as User));
      const myData = userList
      .filter((data) => data.uid === uid)[0];
      console.log("myData", myData);
      setUsers(userList);
      setUser(myData);
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

  useEffect(() => {
    if (selectedUser) {
      navigate(`/${selectedUser.uid}`);
    }
  }, [navigate, selectedUser]);

  return (
    <div className="user-profile-page">
      <ProfileFullScreen 
        user={user}
        rank={rank}
        onClose={() => setSelectedUser(null)} 
      />
    </div>
  )
}