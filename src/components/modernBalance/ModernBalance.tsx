import InfoIcon from '@mui/icons-material/Info';
import { useState, useEffect } from 'react';
import {
  getAuth,
  onAuthStateChanged,
} from 'firebase/auth';
import { collection, getDocs, onSnapshot, QuerySnapshot, DocumentData } from 'firebase/firestore';
import { app, database } from '../../firebase/firebaseConfig';
import { User } from '../../types/types';
import SimpleLoader from '../loaders/simpleLoader/SimpleLoader';

export default function ModernBalance() {
  const [user, setUser] = useState<any>(null);
  const [userBalance, setUserBalance] = useState("");
  const [loading, setLoading] = useState(true);
  const collectionRef = collection(database, 'Users Data');

  const getData = async () => {
    try {
      const response = await getDocs(collectionRef);
      const fireData = response.docs.map((data) => ({ ...data.data(), id: data.id }));
      return fireData;
    } catch (error) {
      console.error('Error getting data:', error);
      return [];
    }
  };

  const getUsers = async () => {
    try {
      const snapshot = await getDocs(collectionRef);
      const userList = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as User));
    } catch (error) {
      console.error('Error getting users:', error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {

        getUsers();

        const token = sessionStorage.getItem('Token');
        if (token) {
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
      } catch (error) {
        console.error('Error during initial data fetch:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const unsubscribe = onSnapshot(collectionRef, (snapshot: QuerySnapshot<DocumentData>) => {
      const userList = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as User));
      const sortedUsers = userList.sort((a, b) => parseInt(b.balance, 10) - parseInt(a.balance, 10));

      const myBalance = userList
        .filter((data) => data.uid === user?.uid)
        .map((data) => data.balance)[0];
      setUserBalance(myBalance);

      sortedUsers.forEach((user, index) => {
        user.rank = index + 1;
      });

      setLoading(false);
    });

    return () => unsubscribe();
  }, [user]);

  if (loading) {
    return (
      <section className="modern-balance" style={{backgroundColor: '#22222288'}}>
        <SimpleLoader />
        <div className="flex-info" style={{opacity: 0}}>
          <h3 className="small-text">Your Balance</h3>
          <InfoIcon fontSize="small" sx={{ color: '#fff' }} />
        </div>
        <div className="balance" style={{opacity: 0}}>
          <p className="two-diff-texts"><h2 className="text-style-one">${loading ? '0' : userBalance}</h2><span className="medium-text" style={{marginBottom: 4}}>.00</span></p>
        </div>
      </section>
    );
  };

  if (!loading) {
    return (
      <section className="modern-balance">
        <div className="flex-info">
          <h3 className="small-text">Your Balance</h3>
          <InfoIcon fontSize="small" sx={{ color: '#fff' }} />
        </div>
        <div className="balance">
          <p className="two-diff-texts"><h2 className="text-style-one">${loading ? '0' : userBalance}</h2><span className="medium-text" style={{marginBottom: 4}}>.00</span></p>
        </div>
      </section>
    )
  }
}