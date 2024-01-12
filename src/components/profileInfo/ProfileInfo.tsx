import checkIcon from '../../assets/check-mark.png';
import questionIcon from '../../assets/question-icon.png';
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

export interface UserData {
  userName: string;
  balance: number;
  uid: string;
}

export default function ProfileInfo() {
  const [activeButton, setActiveButton] = useState("Achievements");
  const [user, setUser] = useState<any>(null);
  const [fireData, setFireData] = useState<any[]>([]);
  const [visibleBets, setVisibleBets] = useState(10);
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

  const reversedHistory = fireData
  ? fireData
      .filter((data) => data.uid === user?.uid)
      .map((data) => data.historyBets)
      .flat()
      .reverse()
  : [];

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

  const threeWinsRow = (history: any[]) => {
    let consecutiveWins = 0;
    for (const bet of history) {
      if (bet.result === 'win') {
        consecutiveWins++;
        if (consecutiveWins === 3) {
          return true;
        }
      } else {
        consecutiveWins = 0
      }
    }
    return false;
  }

  const sixWinsRow = (history: any[]) => {
    let consecutiveWins = 0;
    for (const bet of history) {
      if (bet.result === 'win') {
        consecutiveWins++;
        if (consecutiveWins === 6) {
          return true;
        }
      } else {
        consecutiveWins = 0
      }
    }
    return false;
  }

  const nineWinsRow = (history: any[]) => {
    let consecutiveWins = 0;
    for (const bet of history) {
      if (bet.result === 'win') {
        consecutiveWins++;
        if (consecutiveWins === 9) {
          return true;
        }
      } else {
        consecutiveWins = 0
      }
    }
    return false;
  }

  const twelveWinsRow = (history: any[]) => {
    let consecutiveWins = 0;
    for (const bet of history) {
      if (bet.result === 'win') {
        consecutiveWins++;
        if (consecutiveWins === 12) {
          return true;
        }
      } else {
        consecutiveWins = 0
      }
    }
    return false;
  }

  const isAccurateForecastAchieved = threeWinsRow(reversedHistory);
  const isMasterOfTrendsAchieved = sixWinsRow(reversedHistory);
  const isRelentlessPredictorAchieved = nineWinsRow(reversedHistory);
  const isBestOfTheBestAchieved = twelveWinsRow(reversedHistory);
  
  const achievements = [
    {
      image: winTotal > 0 ? checkIcon : questionIcon,
      header: "Novice Trader",
      description: "Make your first successful prediction.",
      achieved: winTotal > 0 ? true : false,
    },
    {
      image: isAccurateForecastAchieved ? checkIcon : questionIcon,
      header: "Accurate Forecast",
      description: "Successfully predict 3 times in a row.",
      achieved: isAccurateForecastAchieved,
    },
    {
      image: isMasterOfTrendsAchieved ? checkIcon : questionIcon,
      header: "Master of Trends",
      description: "Successfully predict 6 times in a row.",
      achieved: isMasterOfTrendsAchieved,
    },
    {
      image: isRelentlessPredictorAchieved ? checkIcon : questionIcon,
      header: "Relentless Predictor",
      description: "Successfully predict 9 times in a row.",
      achieved: isRelentlessPredictorAchieved,
    },
    {
      image: isBestOfTheBestAchieved ? checkIcon : questionIcon,
      header: "Best of the Best",
      description: "Successfully predict 12 times in a row.",
      achieved: isBestOfTheBestAchieved,
    },
  ];

  const handleLoadMore = () => {
    setVisibleBets((prev) => prev + 10);
  };

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
          <div className="history-bet-column">
            {reversedHistory.slice(0, visibleBets).map((bet) => (
                <div key={bet.openTime} className="history-bet-item">
                  <div className="text-items-column">
                    <span className="small-text">
                      Choice: <strong>{bet.direction}</strong>
                    </span>
                    <span className="small-text">{bet.openTime}</span>
                  </div>
                  <div className="text-items-column">
                    <span className="small-text">Initial price: {bet.openPrice}</span>
                    <span className="small-text">Final price: {bet.closePrice}</span>
                  </div>
                  <h3 className="small-header" style={{color: bet.result === 'win' ? '#0cff41' : '#ff5e5e'}}>{bet.result.toUpperCase()}</h3>
                </div>
            ))}
            <button className="sq-btn" onClick={handleLoadMore}>
              <h3 className="small-header">More</h3>
            </button>
          </div>
          </>
        )}
      </div>
    </div>
  )
}