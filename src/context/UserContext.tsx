import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  getAuth,
  onAuthStateChanged,
} from 'firebase/auth';
import { collection, getDocs } from 'firebase/firestore';
import { app, database } from '../firebase/firebaseConfig';

const UserContext = createContext<{
  user: any;
  fireData: any[];
  fetchData: () => Promise<void>;
} | undefined>(undefined);

interface UserData {
  avatar: string;
  userName: string;
  balance: number;
  uid: string;
}

export const UserProvider: React.FC<any> = ({ children }) => {
  const [user, setUser] = useState<any>(null);
  const [fireData, setFireData] = useState<any[]>([]);
  const collectionRef = collection(database, 'Users Data');

  const fetchData = async () => {
    try {
      const response = await getDocs(collectionRef);
      setFireData(response.docs.map((data) => ({ ...data.data(), id: data.id })));
    } catch (error) {
      console.error('Error getting data:', error);
    }
  };

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
    <UserContext.Provider value={{ user, fireData, fetchData }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  return useContext(UserContext);
};
