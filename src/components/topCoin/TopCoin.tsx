import { useState, useRef, useEffect } from "react";
import { useGetCoinListQuery, useGetBitcoinInfoQuery } from "../../redux/features/api/api";
// import { useGetCryptoNewsQuery } from "../../redux/features/api/newsApi";
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import { formatData } from "../../utils/formatData";
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
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CoinsRow from "../coinsRow/CoinsRow";
import ProfileDashboard from "../profileDashboard/ProfileDashboard";

export default function TopCoin() {
  const [currencies, setcurrencies] = useState<any[]>([]);
  const [pair, setpair] = useState("BTC-USD");
  const [price, setprice] = useState("0.00");
  const [pastData, setpastData] = useState({});
  const [currentBitcoinPrice, setCurrentBitcoinPrice] = useState("");
  const [priceChangeColor, setPriceChangeColor] = useState("");
  const [percentageDiff, setPercentageDiff] = useState(0);
  const prevPriceRef = useRef<number | null>(null);
  const [betTime, setBetTime] = useState(3);
  const [betDirection, setBetDirection] = useState("");
  const [betStatus, setBetStatus] = useState("");
  const [countdown, setCountdown] = useState(0);
  const [predictionTime, setPredictionTime] = useState<number | null>(null);
  const [predictionPrice, setPredictionPrice] = useState<number | null>(null);
  const [betPrice, setBetPrice] = useState<number | null>(0);
  const [currentPrice, setCurrentPrice] = useState("0.00");
  const [pointAmount, setPointAmount] = useState(10);
  const [lastPointBet, setLastPointBet] = useState(0);

  /////////////////////////
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
  /////////////////////////

  const ws = useRef(new WebSocket("wss://ws-feed.pro.coinbase.com"));
  let first = useRef(false);
  const url = "https://api.pro.coinbase.com";

  useEffect(() => {
    let pairs: any[] = [];

    const apiCall = async () => {
      await fetch(url + "/products")
        .then((res) => res.json())
        .then((data) => (pairs = data));

      let filtered = pairs.filter((pair) => {
        if (pair.quote_currency === "USD") {
          return pair;
        }
      });

      filtered = filtered.sort((a, b) => {
        if (a.base_currency < b.base_currency) {
          return -1;
        }
        if (a.base_currency > b.base_currency) {
          return 1;
        }
        return 0;
      });
      setcurrencies(filtered);
      // console.log(currencies)

      first.current = true;
    };

    apiCall();
  }, []);

  useEffect(() => {
    if (!first.current) {
      return;
    }

    let msg = {
      type: "subscribe",
      product_ids: [pair],
      channels: ["ticker"],
    };
    let jsonMsg = JSON.stringify(msg);
    if (ws.current) {
      ws.current.send(jsonMsg);
    }

    let historicalDataURL = `${url}/products/${pair}/candles?granularity=86400`;
    const fetchHistoricalData = async () => {
      let dataArr: any[] = [];
      await fetch(historicalDataURL)
        .then((res) => res.json())
        .then((data) => (dataArr = data));

      let formattedData = formatData(dataArr);
      
      setpastData(formattedData);
      // console.log(pastData);
    };

    fetchHistoricalData();

    if (ws.current) {
      ws.current.onmessage = (e: MessageEvent) => {
        let data = JSON.parse(e.data);
        if (data.type !== "ticker" || data.product_id !== pair) {
          return;
        }

        if (data.product_id === pair) {
          const newPrice = parseFloat(data.price);
          setCurrentPrice(data.price);
        
          setPriceChangeColor((prevColor) => {
            if (newPrice < parseFloat(price)) {
              return "#ff5e5e";
            } else if (newPrice > parseFloat(price)) {
              return "#0cff41";
            } else {
              return prevColor;
            }
          });
        
          if (prevPriceRef.current !== null) {
            const previousPrice = parseFloat(prevPriceRef.current.toString());
            const resultDiff = ((newPrice - previousPrice) / previousPrice) * 100;
            setPercentageDiff(resultDiff);
          }
        
          prevPriceRef.current = newPrice;
        
          setprice(data.price);
        }

        if (data.product_id === pair) {
          setprice(data.price);
        }

        if (data.product_id === "BTC-USD") {
          setCurrentBitcoinPrice(data.price);
        }
      };
    }
  }, [pair, price]);

  useEffect(() => {
    const fetchBitcoinPrice = async () => {
      const response = await fetch(`${url}/products/BTC-USD/ticker`);
      const bitcoinData = await response.json();
      
      setCurrentBitcoinPrice(bitcoinData.price);
    };

    fetchBitcoinPrice();

    const bitcoinWs = new WebSocket("wss://ws-feed.pro.coinbase.com");
    bitcoinWs.onopen = () => {
      bitcoinWs.send(
        JSON.stringify({
          type: "subscribe",
          product_ids: ["BTC-USD"],
          channels: ["ticker"],
        })
      );
    };
    bitcoinWs.onmessage = (e) => {
      const data = JSON.parse(e.data);
      if (data.type === "ticker") {
        setCurrentBitcoinPrice(data.price);
      }
    };

    return () => {
      bitcoinWs.close();
    };
  }, []);

  // const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
  //   let unsubMsg = {
  //     type: "unsubscribe",
  //     product_ids: [pair],
  //     channels: ["ticker"]
  //   };
  //   let unsub = JSON.stringify(unsubMsg);

  //   ws.current.send(unsub);

  //   setpair(e.target.value);
  // };

  const { data: bitcoinInfo } = useGetBitcoinInfoQuery('bitcoin');
  const { data: coinsList } = useGetCoinListQuery();
  // const { data: cryptoNews } = useGetCryptoNewsQuery();
  // const sortedNews = cryptoNews?.articles.slice().sort((a, b) => {
  //   return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
  // });
  // console.log("cryptoNews", sortedNews)
  // console.log("COINSLIST", coinsList)

  const placeBet = async (direction: string) => {
    setBetDirection(direction);
    setPredictionTime(new Date().getTime());
    setBetPrice(parseFloat(currentBitcoinPrice));
    setCountdown(betTime);
    setBetStatus("");
    const userDocRef = doc(database, 'Users Data', 'hlnUqOFKxo1FzI9zeiIL');
    const userDocSnapshot = await getDoc(userDocRef);

    if (userDocSnapshot.exists()) {
      const newBalance = (userDocSnapshot.data().balance || 0) - pointAmount;
      setLastPointBet(pointAmount);
      const newTotalBets = (userDocSnapshot.data().totalBets || 0) + 1;

      await updateDoc(userDocRef, { balance: newBalance, totalBets: newTotalBets });

      setFireData(prevData =>
        prevData.map(data =>
          data.uid === user.uid ? { ...data, balance: newBalance, totalBets: newTotalBets } : data
        )
      );
    } else {
      console.error('Документ пользователя не найден.');
    }
  
    const countdownInterval = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);
  
    setTimeout(() => {
      clearInterval(countdownInterval);
      const finalPrice = parseFloat(currentBitcoinPrice);
      handleBetResult(finalPrice);
    }, betTime * 1000);
  };
  
  const handleBetResult = async (finalPrice: number) => {
    const userDocRef = doc(database, 'Users Data', 'hlnUqOFKxo1FzI9zeiIL');
    const userDocSnapshot = await getDoc(userDocRef);
    
    if (predictionTime === null || betPrice === null) {
      console.error("Prediction data is missing");
      return;
    }
  
    const currentTime = new Date().getTime();
    const elapsedTime = (currentTime - predictionTime) / 1000;
  
    const targetTime = betTime;
  
    const isBetCorrect =
      elapsedTime >= targetTime &&
      ((betDirection === "up" && finalPrice > betPrice) ||
        (betDirection === "down" && finalPrice < betPrice));
  
    setPredictionPrice(finalPrice);
    // console.log(predictionPrice);

    setBetStatus(isBetCorrect ? "win" : "lose");
    
    if (userDocSnapshot.exists()) {
      if (userDocSnapshot.data().uid === user?.uid && isBetCorrect) {
        const newBalance = (userDocSnapshot.data().balance || 0) + (lastPointBet * 2);
        const newWinBets = (userDocSnapshot.data().winBets || 0) + 1;
        await updateDoc(userDocRef, { balance: newBalance, winBets: newWinBets });
        setFireData(prevData =>
          prevData.map(userData =>
            userData.uid === user.uid ? { ...userData, balance: newBalance, winBets: newWinBets } : userData
          )
        );
      }
    } else {
      console.error('Документ пользователя не найден.');
    }
  
    const predictionResult = isBetCorrect ? "Угадали!" : "Не угадали.";
    const predictionStatus = `Прогноз: ${betDirection.toUpperCase()} - Цена при прогнозе: ${betPrice}`;
    const finalPriceStatus = `Цена в конце прогноза: ${finalPrice}`;
  
    console.log(`${predictionResult} ${predictionStatus} ${finalPriceStatus}`);
  };
  const exImg = 'https://www.aipromptsgalaxy.com/wp-content/uploads/2023/06/subrat_female_avatar_proud_face_Aurora_a_25-year-old_girl_with__fd0e4c59-bb7e-4636-9258-6690ec6a71e7.png';

  return (
    <div className="top-coin">
      {/* <h2 className="medium-header">Top Coin</h2>
      <div>
        <select name="currency" value={pair} onChange={handleSelect}>
          {currencies.map((cur: { id: string, display_name: string }, idx: number) => {
            return (
              <option key={idx} value={cur.id}>
                {cur.display_name}
              </option>
            );
          })}
        </select>
        <h2>PRICE{`$${price}`}</h2>
      </div> */}
      <div className="double-window">
        <div className="mini-window">
          <div className="top">
            <h3 className="small-text">Balance</h3>
            <div></div>
          </div>
          {fireData && fireData
          .filter((data) => data.uid === user?.uid)
          .map((data) => (
            <h3 key={data.id} className="small-header">${data.balance ? data.balance.toFixed(2) : '0.00'}</h3>
          ))
          }
          <div className="percentage-progress">
            <ArrowCircleUpIcon fontSize='small' />
            <span>23.30%</span>
          </div>
        </div>
        <div className="mini-window">
          <div className="top">
            <h3 className="small-text">Profile</h3>
            <div></div>
          </div>
          <img src={exImg} className="medium-circle-img" alt="Avatar" />
          {fireData && fireData
          .filter((data) => data.uid === user?.uid)
          .map((data) => (
            <span key={data.id} className="small-header">{data.userName ? data.userName : 'NO_AUTH'}</span>
          ))
          }
        </div>
      </div>
      <div className="window">
        {bitcoinInfo && (
          <div className="flex-info">
            <img src={bitcoinInfo.image.small} className="small-circle-img" alt="Coin" />
            <h3 className="small-header">{bitcoinInfo.name}</h3>
          </div>
        )}
        {currentBitcoinPrice && (
        <div className="price-info">
          <span style={{ color: priceChangeColor }}>{`$${pair === "BTC-USD" ? currentBitcoinPrice : price}`}</span>
        </div>
        )}
        <div className="change-diff">
          {percentageDiff > 0 ? (
            <>
              <ArrowDropUpIcon style={{ color: "#0cff41" }} />
              <span style={{ color: "#0cff41" }}>{`${percentageDiff.toFixed(3)}%`}</span>
            </>
          ) : (
            <>
              <ArrowDropDownIcon style={{ color: "#ff5e5e" }} />
              <span style={{ color: "#ff5e5e" }}>{`${percentageDiff.toFixed(3)}%`}</span>
            </>
          )}
        </div>
        <select value={betTime} onChange={(e) => setBetTime(Number(e.target.value))}>
          <option value={3}>3 сек</option>
          <option value={5}>5 сек</option>
          <option value={10}>10 сек</option>
          <option value={20}>20 сек</option>
          <option value={30}>30 сек</option>
        </select>
        <select value={pointAmount} onChange={(e) => setPointAmount(Number(e.target.value))}>
          <option value={10}>$10</option>
          <option value={20}>$20</option>
          <option value={50}>$50</option>
          <option value={100}>$100</option>
          <option value={200}>$200</option>
        </select>
        <div className="buttons">
          <button className="up-btn" onClick={() => placeBet("up")}>
            <TrendingUpIcon />
            <span>Up</span>
          </button>
          <button className="down-btn" onClick={() => placeBet("down")}>
            <TrendingDownIcon />
            <span>Down</span>
          </button>
        </div>
        {countdown > 0 && (
          <div className="now-bet">
            <div className="flex-info" style={{color: 'white'}}>
              <AccessTimeIcon fontSize="small" />
              <h3 className="small-text">{countdown}</h3>
            </div>
            <div className="flex-info">
              <span className="small-text">Choice:</span>
              <span className="small-text" style={{ color: betDirection === 'up' ? '#0cff41' : '#ff5e5e' }}>
                {betDirection.toUpperCase()}
              </span>
            </div>
          </div>
        )}
        {betStatus && (
          <div className={`bet-status ${betStatus === 'win' ? 'win' : 'lose'}`} style={{ color: 'white' }}>
            {`Прогноз: ${betStatus === 'win' ? 'Угадали!' : 'Не угадали.'} Цена при прогнозе: ${betPrice}`}
          </div>
        )}
      </div>
      
      <CoinsRow />

      {/* <div className="list-column">
        {sortedNews && sortedNews.slice(0, 3).map((item) => (
          <div className="list-item">
            <img src={item.urlToImage} className="large-sq-img" alt="Article Image" />
            <div className="text-items-column">
              <h3 className="small-header">{item.title}</h3>
            </div>
          </div>
        ))}
      </div> */}
    </div>
  )
}
