import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  getAuth,
  onAuthStateChanged,
} from 'firebase/auth';
import { collection, getDocs } from 'firebase/firestore';
import { app, database } from '../firebase/firebaseConfig';
import { User } from '../types/types';

const UserContext = createContext<{
  user: User | null;
  users: User[];
  fireData: User[];
  myData: User | null;
  rankUsers: User[];
  loading: boolean;
  fetchData: () => Promise<void>;
  fetchMyData: () => Promise<void>;
}>({
  user: null,
  users: [],
  fireData: [],
  myData: null,
  rankUsers: [],
  loading: false,
  fetchData: async () => {},
  fetchMyData: async () => {},
});

export const UserProvider: React.FC<any> = ({ children }) => {
  const [user, setUser] = useState<any>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [fireData, setFireData] = useState<any[]>([]);
  const [myData, setMyData] = useState<any>({});
  const [rankUsers, setRankUsers] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const collectionRef = collection(database, 'Users Data');

  const fetchData = async () => {
    try {
      const response = await getDocs(collectionRef);
      setFireData(response.docs.map((data) => ({ ...data.data(), id: data.id })));
    } catch (error) {
      console.error('Error getting data:', error);
    }
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

  const fetchMyData = async () => {
    try {
      if (user && user.uid && users.length > 0) {
        const fetchData = users.find((data) => data?.uid === user.uid);
        if (fetchData) {
          setMyData(fetchData);
        }
        const sortedUsers = users.sort((a, b) => b.balance - a.balance);
        sortedUsers.forEach((user, index) => {
          user.rank = index + 1;
        });
        setRankUsers(sortedUsers);
      }
    } catch (error) {
      console.error("Error fetching my Data", error);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  useEffect(() => {
    if (users.length > 0) {
      fetchMyData();
    }
  }, [users]);

  useEffect(() => {
    let token = sessionStorage.getItem('Token');
    if (token) {
      fetchData();

      const auth = getAuth(app);
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          setUser(user);
        } else {
          setUser(null);
        }
      });

      return () => unsubscribe();
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, users, fireData, myData, rankUsers, loading, fetchData, fetchMyData }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  return useContext(UserContext);
};
