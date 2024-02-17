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
  myData: User | null;
  rankUsers: User[];
  loading: boolean;
  myDataLoading: boolean;
  showProfile: boolean;
  setShowProfile: any;
  chosenUser: User | null;
  fetchData: (uid: string) => Promise<void>;
  fetchMyData: () => Promise<void>;
  fetchUserData: (uid: string) => Promise<void>;
}>({
  user: null,
  users: [],
  myData: null,
  rankUsers: [],
  loading: false,
  myDataLoading: false,
  showProfile: false,
  setShowProfile: false,
  chosenUser: null,
  fetchData: async () => {},
  fetchMyData: async () => {},
  fetchUserData: async () => {},
});

export const UserProvider: React.FC<any> = ({ children }) => {
  const [user, setUser] = useState<any>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [myData, setMyData] = useState<any>({});
  const [rankUsers, setRankUsers] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const [myDataLoading, setMyDataLoading] = useState(true);
  const [showProfile, setShowProfile] = useState(false);
  const [chosenUser, setChosenUser] = useState(null);
  const collectionRef = collection(database, 'Users Data');

  const fetchData = async (uid: string) => {
    try {
      const snapshot = await getDocs(collectionRef);
      const data = snapshot.docs.find(doc => doc.data().uid === uid)?.data();
      if (data) {
        setMyData(data);
      }
    } catch (error) {
      console.error('Error getting data:', error);
    }
  };

  const getUsers = async () => {
    try {
      const snapshot = await getDocs(collectionRef);
      const userList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as User));
      setUsers(userList);
    } catch (error) {
      console.error('Error getting users:', error);
    }
  };

  const fetchMyData = async () => {
    try {
      const snapshot = await getDocs(collectionRef);
      const userList = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as User));
      const sortedUsers = userList.sort((a, b) => b.balance - a.balance);
      sortedUsers.forEach((user, index) => {
        user.rank = index + 1;
      });
      setRankUsers(sortedUsers);
    } catch (error) {
      console.error("Error fetching my Data", error);
    }
  };

  const fetchUserData = async (uid: string) => {
    try {
      const snapshot = await getDocs(collectionRef);
      const data = snapshot.docs.find(doc => doc.data().uid === uid)?.data();
      setChosenUser(data);
    } catch (error) {
      console.error('Error getting chosen user\'s data:', error);
    }
  }

  useEffect(() => {
    let token = sessionStorage.getItem('Token');
    if (token) {
      const auth = getAuth(app);
      const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        if (currentUser) {
          setUser(currentUser);
          Promise.all([fetchData(currentUser.uid), getUsers(), fetchMyData()])
            .then(() => {
              setMyDataLoading(false);
              setLoading(false);
            })
            .catch(error => console.error('Error fetching data:', error));
        } else {
          setUser(null);
          setLoading(false);
          setMyDataLoading(false);
        }
      });
  
      return () => unsubscribe();
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, users, myData, rankUsers, loading, myDataLoading, showProfile, setShowProfile, chosenUser, fetchData, fetchMyData, fetchUserData }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  return useContext(UserContext);
};
