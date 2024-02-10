import TollIcon from '@mui/icons-material/Toll';
import { useState, useEffect } from 'react';
import {
  getAuth,
  onAuthStateChanged,
} from 'firebase/auth';
import { collection, onSnapshot, QuerySnapshot, DocumentData } from 'firebase/firestore';
import { app, database } from '../../firebase/firebaseConfig';
import { User } from '../../types/types';
import SimpleLoader from '../loaders/simpleLoader/SimpleLoader';
import { modernBalanceLoadingUI } from '../ui/loadingUI';

export default function ModernBalance() {
  const [user, setUser] = useState<any>(null);
  const [userBalance, setUserBalance] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const collectionRef = collection(database, 'Users Data');

  useEffect(() => {
    const fetchData = async () => {
      try {
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
      const sortedUsers = userList.sort((a, b) => b.balance - a.balance);

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
    return modernBalanceLoadingUI;
  };

  if (!loading) {
    return (
      <section className="modern-balance">
        <div className="flex-info">
          <h3 className="small-text">Your Balance</h3>
          <TollIcon fontSize="small" sx={{ color: '#fff' }} />
        </div>
        <div className="balance">
          <p className="two-diff-texts"><h2 className="text-style-one">${loading ? '0' : userBalance}</h2><span className="medium-text" style={{marginBottom: 4}}>.00</span></p>
        </div>
      </section>
    )
  }
}