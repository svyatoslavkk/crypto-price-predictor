import checkIcon from '../../assets/check-mark.png';
import { useState, useEffect } from 'react';
import {
  getAuth,
  onAuthStateChanged,
} from 'firebase/auth';
import { 
  collection, 
  getDocs,
  doc,
  updateDoc,
  getDoc
} from 'firebase/firestore';
import { app, database } from '../../firebase/firebaseConfig';
import DevLoader from '../loaders/devLoader/DevLoader';

export interface UserData {
  userName: string;
  balance: number;
  uid: string;
}

export default function ProfileInfo() {
  const [activeButton, setActiveButton] = useState("Achievements");
  const [user, setUser] = useState<any>(null);
  const [fireData, setFireData] = useState<any[]>([]);
  const auth = getAuth(app);
  const collectionRef = collection(database, 'Users Data');

  const getData = async () => {
    try {
      const response = await getDocs(collectionRef);
      setFireData(response.docs.map((data) => ({ ...data.data(), id: data.id })));
      console.log("FIREDATA", fireData);
    } catch (error) {
      console.error('Error getting data:', error);
    }
  };

  useEffect(() => {
    let token = sessionStorage.getItem('Token');
    if (token) {
      getData();

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

  const winTotal: number = fireData
  ? fireData
      .filter(data => data.uid === user?.uid)
      .map(data => data.winBets || 0)
      .reduce((acc, val) => acc + val, 0)
  : 0;
  
  const achievements = [
    {
      image: checkIcon,
      header: "Novice Trader",
      description: "Make your first successful prediction.",
      achieved: winTotal > 0 ? true : false,
    },
    {
      image: checkIcon,
      header: "Accurate Forecast",
      description: "Successfully predict 3 times in a row.",
      achieved: false,
    },
    {
      image: checkIcon,
      header: "Master of Trends",
      description: "Successfully predict 5 times in a row.",
      achieved: false,
    },
    {
      image: checkIcon,
      header: "Relentless Predictor",
      description: "Successfully predict 8 times in a row.",
      achieved: false,
    },
    {
      image: checkIcon,
      header: "Best of the Best",
      description: "Successfully predict 12 times in a row.",
      achieved: false,
    },
  ]

  return (
    <div className="profile-info">
      <div className="buttons">
        <button
          className={`full-btn ${activeButton === "Achievements" ? "active" : ""}`}
          onClick={() => setActiveButton("Achievements")}
        >
          <span>Achievements</span>
        </button>
        <button
          className={`full-btn ${activeButton === "History" ? "active" : ""}`}
          onClick={() => setActiveButton("History")}
        >
          <span>History</span>
        </button>
      </div>
      <div className="list-column">
        {activeButton === "Achievements" && (
          <>
            {achievements.map((item) => {
              return (
                <div className="list-item" key={item.header} style={{ opacity: item.achieved ? 1 : 0.2 }}>
                  <img className="small-sq-img" src={item.image} alt="Check Icon" />
                  <div>
                    <h3 className="small-header">{item.header}</h3>
                    <span className="small-text">{item.description}</span>
                  </div>
                </div>
              );
            })}
          </>
        )}
        {activeButton === "History" && (
          <>
            <DevLoader />
          </>
        )}
      </div>
    </div>
  )
}