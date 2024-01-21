import SimpleLoader from "../loaders/simpleLoader/SimpleLoader"
import { useState, useEffect } from "react";
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
import { app, database } from "../../firebase/firebaseConfig";
import { formatTime } from "../../utils/formatTime";
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';

export default function UserPreview() {
  const exImg = 'https://www.aipromptsgalaxy.com/wp-content/uploads/2023/06/subrat_female_avatar_proud_face_Aurora_a_25-year-old_girl_with__fd0e4c59-bb7e-4636-9258-6690ec6a71e7.png';
  const [bonusStatus, setBonusStatus] = useState("waiting"); // "inactive", "active", "waiting"
  const [checkBonusAvailable, setCheckBonusAvailable] = useState("");
  /////////////////////////
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [fireData, setFireData] = useState<any[]>([]);
  const auth = getAuth(app);
  const collectionRef = collection(database, 'Users Data');

  const lastTimeClaiming = fireData
  ? fireData
      .filter((data) => data.uid === user?.uid)
      .map((data) => data.lastClaimedBonus ? new Date(data.lastClaimedBonus) : new Date("2000-01-01T14:10:53.245Z"))
  : null;

  const getData = async () => {
    try {
      const response = await getDocs(collectionRef);
      setFireData(response.docs.map((data) => ({ ...data.data(), id: data.id })));
      setLoading(false);
    } catch (error) {
      console.error('Error getting data:', error);
    }
  };
  
  const documentInfo = fireData
  ? fireData
      .filter((data) => data.uid === user?.uid)
      .map((data) => (data.docId ? data.docId : 'NO_DOC'))
  : [];

  const claimDailyBonus = async () => {
    const docId = documentInfo[0];
    if (!docId) {
      console.error('Не удалось получить идентификатор документа.');
      return;
    }
    const userDocRef = doc(database, 'Users Data', docId);
    const userDocSnapshot = await getDoc(userDocRef);
    if (userDocSnapshot.exists()) {
      setBonusStatus("waiting");
      console.log("bonusStatus", bonusStatus);
      const randomBonusAmount = Math.floor(Math.random() * (72 - 11 + 1)) + 11;
      await updateDoc(userDocRef, {
        balance: (userDocSnapshot.data().balance || 0) + randomBonusAmount,
        lastClaimedBonus: new Date().toISOString(),
      });
      setFireData(prevData =>
        prevData.map(data =>
          data.uid === user.uid ? {
            ...data,
            balance: (data.balance || 0) + randomBonusAmount,
            lastClaimedBonus: new Date().toISOString(),
          } : data
        )
      );
    }
  };

  useEffect(() => {
    if (lastTimeClaiming && lastTimeClaiming.length > 0 && lastTimeClaiming[0]) {
      const currentTime = new Date();
      const nextDate = new Date(lastTimeClaiming[0].getTime() + (24 * 60 * 60 * 1000));
      const timeDifferenceInSeconds = Math.floor((nextDate.getTime() - currentTime.getTime()) / 1000);
      const editedFormatDiff = formatTime(timeDifferenceInSeconds);
      setCheckBonusAvailable((prevValue) => prevValue !== editedFormatDiff ? editedFormatDiff : prevValue);
      if (timeDifferenceInSeconds <= 0) {
        setBonusStatus("active");
      }
    }
  }, [bonusStatus, lastTimeClaiming]);

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
  /////////////////////////

  return (
    <>
      {loading ? (
        <div className="user-preview">
          <div className="double-window">
            <div className="mini-window">
              <SimpleLoader />
              <div className="top" style={{opacity: 0}}>
                <h3 className="small-text" style={{opacity: 0}}>Balance</h3>
                <div style={{opacity: 0}}></div>
              </div>
              <h3 className="small-header" style={{opacity: 0}}>$0.00</h3>
            </div>
            <div className="mini-window">
              <SimpleLoader />
              <div className="top" style={{opacity: 0}}>
                <h3 className="small-text">Profile</h3>
                <div></div>
              </div>
              <img src={exImg} className="medium-circle-img" alt="Avatar" style={{opacity: 0}} />
              <span className="small-header" style={{opacity: 0}}>auth_name</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="user-preview">
          <div className="double-window">
            <div className="mini-window">
              <div className="top">
                <h3 className="small-text">Balance</h3>
                <div></div>
              </div>
              {fireData && fireData
              .filter((data) => data.uid === user?.uid)
              .map((data) => (
                <h3 key={data.id} className="small-header">${data.balance ? data.balance.toFixed(2) : '$0.00'}</h3>
              ))
              }
              {bonusStatus === "active" && (
                <button className="active-bonus-btn" onClick={claimDailyBonus}>
                  <div className="gift-icon">
                    <CardGiftcardIcon fontSize='small' />
                  </div>
                  <span>Collect a Daily Gift!</span>
                </button>
              )}
              {bonusStatus === "waiting" && (
                <button className="waiting-bonus-btn">
                  <span>Next Bonus: {checkBonusAvailable}</span>
                </button>
              )}
            </div>
            <div className="mini-window">
              <div className="top">
                <h3 className="small-text">Profile</h3>
                <div></div>
              </div>
              {fireData && fireData
              .filter((data) => data.uid === user?.uid)
              .map((data) => (
                <img key={data.id} src={data.avatar ? data.avatar: exImg} className="medium-circle-img" alt="Avatar" />
              ))}
              {fireData && fireData
              .filter((data) => data.uid === user?.uid)
              .map((data) => (
                <span key={data.id} className="small-header">{data.userName ? data.userName : 'NO_AUTH'}</span>
              ))
              }
            </div>
          </div>
        </div>
      )}
    </>
  )
}