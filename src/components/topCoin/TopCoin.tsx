import { useState, useRef, useEffect } from "react";
import { useGetBitcoinInfoQuery } from "../../redux/features/api/api";
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import { formatData } from "../../utils/formatData";
import {
  doc,
  collection,
  updateDoc,
  getDocs,
  getDoc,
} from 'firebase/firestore';
import { database } from "../../firebase/firebaseConfig";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { IBetDetails } from "../../types/types";
import { useUserContext } from "../../context/UserContext";
import ActiveBet from "../layout-components/ActiveBet/ActiveBet";
import ResultBet from "../layout-components/ResultBet/ResultBet";
import { useBetContext } from "../../context/BetContext";

export default function TopCoin() {
  const { myData, setMyData, loading } = useUserContext();
  const { countdown, setCountdown, betDirection, setBetDirection, pointAmount, setPointAmount, startPrice, setStartPrice, betTime, setBetTime, isBetResultShown, setIsBetResultShown, betStatus, setBetStatus } = useBetContext();
  const { data: bitcoinInfo } = useGetBitcoinInfoQuery('bitcoin');
  const [currencies, setcurrencies] = useState<any[]>([]);
  const [pair, setpair] = useState("BTC-USD");
  const [price, setprice] = useState("0.00");
  const [pastData, setpastData] = useState({});
  const [percentageDiff, setPercentageDiff] = useState(0);
  const prevPriceRef = useRef<number | null>(null);
  const [currentPrice, setCurrentPrice] = useState("0.00");
  const [lastPointBet, setLastPointBet] = useState(0);
  
  const [currentBitcoinPrice, setCurrentBitcoinPrice] = useState(0);
  const [priceChangeColor, setPriceChangeColor] = useState("");
  const [isPriceChanged, setIsPriceChanged] = useState(false);

  /////////////////////////

  const ws = useRef(new WebSocket("wss://ws-feed.pro.coinbase.com"));
  let first = useRef(false);
  const url = "https://api.pro.coinbase.com";
  /////////////////////HANDLE SELECT//////////////////////////
  /////////////////////HANDLE SELECT//////////////////////////
  /////////////////////HANDLE SELECT//////////////////////////
  /////////////////////HANDLE SELECT//////////////////////////
  /////////////////////HANDLE SELECT//////////////////////////
  /////////////////////HANDLE SELECT//////////////////////////
  /////////////////////HANDLE SELECT//////////////////////////
  /////////////////////HANDLE SELECT//////////////////////////
  /////////////////////HANDLE SELECT//////////////////////////
  /////////////////////HANDLE SELECT//////////////////////////
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

  const upBet = async () => {
    const docId = myData?.docId;
    const collectionRef = doc(database, 'Users Data', docId);
    const snapshot = await getDoc(collectionRef);
    if (snapshot.exists()) {
      const data = snapshot.data();
      setMyData(data);
    }
    setBetDirection("UP");

    setCountdown(betTime);
    let startTime = performance.now();
    const animate = () => {
      const currentTime = performance.now();
      const elapsedTime = (currentTime - startTime) / 1000;
      setCountdown((prev) => Math.max(betTime - elapsedTime, 0));
      if (elapsedTime < betTime) {
        requestAnimationFrame(animate);
      } else {
        console.log("Таймер завершен!");
      }
    };
    requestAnimationFrame(animate);

    const initialResponse = await fetch(`${url}/products/BTC-USD/ticker`);
    const initialData = await initialResponse.json();
    const initialPrice = initialData.price;
    setStartPrice(initialPrice);
    const openTime = new Date().toISOString();
    const openPrice = initialPrice;
    
    const newBalance = myData?.balance - 10;
    setLastPointBet(10);
    const newTotalBets = myData?.totalBets + 1;

    await updateDoc(collectionRef, { 
      balance: newBalance, 
      totalBets: newTotalBets,
    });

    const snapshotSecond = await getDoc(collectionRef);
    if (snapshotSecond.exists()) {
      const data = snapshotSecond.data();
      setMyData(data);
    }

    await new Promise(resolve => setTimeout(resolve, betTime * 1000));
  
    const finalResponse = await fetch(`${url}/products/BTC-USD/ticker`);
    const finalData = await finalResponse.json();
    const finalPrice = finalData.price;

    if (finalPrice > initialPrice) {
      let predictionResult = "Угадали!";
      let predictionStatus = `Прогноз: UP - Цена при прогнозе: ${initialPrice}`;
      let finalPriceStatus = `Цена в конце прогноза: ${finalPrice}`;
      console.log(`${predictionResult} ${predictionStatus} ${finalPriceStatus}`);
      setBetStatus("win");
      
      const closeTime = new Date().toISOString();
      const closePrice = finalPrice;
      const betDetails: IBetDetails = {
        direction: 'UP',
        openTime: openTime,
        openPrice: openPrice,
        closeTime: closeTime,
        closePrice: closePrice,
        result: 'win',
      };
      const newBalance = myData?.balance + (10 * 2);
      const newWinBets = myData?.winBets + 1;
      const newHistoryBets = [...myData?.historyBets || [], betDetails];
      await updateDoc(collectionRef, { 
        balance: newBalance, 
        winBets: newWinBets,
        historyBets: newHistoryBets,
      });
      const snapshotThird = await getDoc(collectionRef);
      if (snapshotThird.exists()) {
        const data = snapshotThird.data();
        setMyData(data);
      }
    } else if (finalPrice < initialPrice) {
      let predictionResult = "Не угадали!";
      let predictionStatus = `Прогноз: UP - Цена при прогнозе: ${initialPrice}`;
      let finalPriceStatus = `Цена в конце прогноза: ${finalPrice}`;
      console.log(`${predictionResult} ${predictionStatus} ${finalPriceStatus}`);
      setBetStatus("lose");
      const closeTime = new Date().toISOString();
      const closePrice = finalPrice;
      const betDetails: IBetDetails = {
        direction: 'UP',
        openTime: openTime,
        openPrice: openPrice,
        closeTime: closeTime,
        closePrice: closePrice,
        result: 'lose',
      };
      const newHistoryBets = [...myData?.historyBets || [], betDetails];
      await updateDoc(collectionRef, { 
        historyBets: newHistoryBets,
      });
    }
    setIsBetResultShown(true);
    setTimeout(() => setIsBetResultShown(false), 4000);
  };

  const downBet = async () => {
    const docId = myData?.docId;
    const collectionRef = doc(database, 'Users Data', docId);
    const snapshot = await getDoc(collectionRef);
    if (snapshot.exists()) {
      const data = snapshot.data();
      setMyData(data);
    }

    setBetDirection("DOWN");
    setCountdown(betTime);
    let startTime = performance.now();
    const animate = () => {
      const currentTime = performance.now();
      const elapsedTime = (currentTime - startTime) / 1000;
      setCountdown((prev) => Math.max(betTime - elapsedTime, 0));
      if (elapsedTime < betTime) {
        requestAnimationFrame(animate);
      } else {
        console.log("Таймер завершен!");
      }
    };
    requestAnimationFrame(animate);
    const initialResponse = await fetch(`${url}/products/BTC-USD/ticker`);
    const initialData = await initialResponse.json();
    const initialPrice = initialData.price;
    setStartPrice(initialPrice);
    const openTime = new Date().toISOString();
    const openPrice = initialPrice;
    
    const newBalance = myData?.balance - 10;
    setLastPointBet(10);
    const newTotalBets = myData?.totalBets + 1;

    await updateDoc(collectionRef, { 
      balance: newBalance, 
      totalBets: newTotalBets,
    });

    const snapshotSecond = await getDoc(collectionRef);
    if (snapshotSecond.exists()) {
      const data = snapshotSecond.data();
      setMyData(data);
    }
    await new Promise(resolve => setTimeout(resolve, betTime * 1000));
  
    const finalResponse = await fetch(`${url}/products/BTC-USD/ticker`);
    const finalData = await finalResponse.json();
    const finalPrice = finalData.price;

    if (finalPrice < initialPrice) {
      let predictionResult = "Угадали!";
      let predictionStatus = `Прогноз: DOWN - Цена при прогнозе: ${initialPrice}`;
      let finalPriceStatus = `Цена в конце прогноза: ${finalPrice}`;
      console.log(`${predictionResult} ${predictionStatus} ${finalPriceStatus}`);
      setBetStatus("win");
      
      const closeTime = new Date().toISOString();
      const closePrice = finalPrice;
      const betDetails: IBetDetails = {
        direction: 'DOWN',
        openTime: openTime,
        openPrice: openPrice,
        closeTime: closeTime,
        closePrice: closePrice,
        result: 'win',
      };
      const newBalance = myData?.balance + (10 * 2);
      const newWinBets = myData?.winBets + 1;
      const newHistoryBets = [...myData?.historyBets || [], betDetails];
      await updateDoc(collectionRef, { 
        balance: newBalance, 
        winBets: newWinBets,
        historyBets: newHistoryBets,
      });
      const snapshotThird = await getDoc(collectionRef);
      if (snapshotThird.exists()) {
        const data = snapshotThird.data();
        setMyData(data);
      }
    } else if (finalPrice > initialPrice) {
      let predictionResult = "Не угадали!";
      let predictionStatus = `Прогноз: DOWN - Цена при прогнозе: ${initialPrice}`;
      let finalPriceStatus = `Цена в конце прогноза: ${finalPrice}`;
      console.log(`${predictionResult} ${predictionStatus} ${finalPriceStatus}`);
      setBetStatus("lose");
      const closeTime = new Date().toISOString();
      const closePrice = finalPrice;
      const betDetails: IBetDetails = {
        direction: 'DOWN',
        openTime: openTime,
        openPrice: openPrice,
        closeTime: closeTime,
        closePrice: closePrice,
        result: 'lose',
      };
      const newHistoryBets = [...myData?.historyBets || [], betDetails];
      await updateDoc(collectionRef, { 
        historyBets: newHistoryBets,
      });
    }
    setIsBetResultShown(true);
    setTimeout(() => setIsBetResultShown(false), 4000);
  };

  const handlePriceChange = (newPrice: number) => {
    setIsPriceChanged(true);
    setPriceChangeColor(newPrice < currentBitcoinPrice ? "#ff5e5e" : "#0cff41");
    setTimeout(() => {
      setIsPriceChanged(false);
    }, 500);
  };

  useEffect(() => {
    const fetchBitcoinPrice = async () => {
      try {
        const response = await fetch(
          "https://api.pro.coinbase.com/products/BTC-USD/ticker"
        );
        const bitcoinData = await response.json();
        setCurrentBitcoinPrice(bitcoinData.price);
      } catch (error) {
        console.error("Error fetching Bitcoin price:", error);
      }
    };
    const bitcoinPriceInterval = setInterval(fetchBitcoinPrice, 300);
    return () => {
      clearInterval(bitcoinPriceInterval);
    };
  }, []);

  useEffect(() => {
    let pairs: any[] = [];

    const apiCall = async () => {
      await fetch(url + "/products")
        .then((res) => res.json())
        .then((data) => (pairs = data));

      const filtered = pairs.filter((pair) => {
        const supportedPairs = [
            'BTC-USD', 'ETH-USD', 'SOL-USD', 'XRP-USD', 
            'ADA-USD', 'DOGE-USD', 'LINK-USD', 'DOT-USD', 
            'WBTC-USD', 'LTC-USD', 'BCH-USD', 'ATOM-USD', 
            'ETC-USD'
        ];
        return supportedPairs.includes(pair.id);
      });
      setcurrencies(filtered);

      // first.current = true;
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
          setCurrentBitcoinPrice(data.price);
        
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
  }, [currentBitcoinPrice, pair, price]);

  useEffect(() => {
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
        handlePriceChange(data.price);
      }
    };

    return () => {
      bitcoinWs.close();
    };
  }, []);

  return (
    <>
    {loading ? (
      <p style={{color: 'white'}}>Loading...</p>
    ) : (
    <div className="top-coin">
      {/* <div>
        <select name="currency" value={pair} onChange={handleSelect}>
          {currencies.map((cur: { id: string, display_name: string }, idx: number) => {
            return (
              <option key={idx} value={cur.id}>
                {cur.display_name}
              </option>
            );
          })}
        </select>
        <h2 className="medium-header">PRICE{`$${price}`}</h2>
      </div> */}
      <div className="window">
        {bitcoinInfo && (
          <div className="flex-info">
            <img src={bitcoinInfo.image.small} className="small-circle-img" alt="Coin" />
            <h3 className="small-header">{bitcoinInfo.localization.en}</h3>
          </div>
        )}
        {currentBitcoinPrice && (
          <div className="price-info">
            <span style={{ color: isPriceChanged ? priceChangeColor : "" }}>{`$${pair === "BTC-USD" ? currentBitcoinPrice : price}`}</span>
          </div>
        )}
        {/* <div className="change-diff">
          {percentageDiff > 0 ? (
            <>
              <ArrowDropUpIcon style={{ color: "#0cff41" }} />
              <span style={{ color: "#0cff41" }}>{`${percentageDiff.toFixed(4)}%`}</span>
            </>
          ) : (
            <>
              <ArrowDropDownIcon style={{ color: "#ff5e5e" }} />
              <span style={{ color: "#ff5e5e" }}>{`${percentageDiff.toFixed(3)}%`}</span>
            </>
          )}
        </div> */}
        <div className="buttons">
          <div className="select-section">
            <button className="sq-btn" onClick={() => setBetTime((prev) => Math.max(prev - 1, 2))}>
              <RemoveIcon fontSize="small" />
            </button>
            <div className="bet-setup-input">
              <input 
                className="short-input" 
                value={betTime}
                type="text"
                pattern="[6-9]|1[0-9]|20"
                min="2"
                max="60"
                onChange={(e) => {
                  const value = e.target.value;
                  if (/^(2[0-9]|[7-9]|60)?$/.test(value)) {
                    setBetTime(value === '' ? '' : Number(value));
                  }
                }}
              />
              <span className="time-icon">
                <AccessTimeIcon fontSize="small" sx={{ color: '#555' }} />
              </span>
            </div>
            <button className="sq-btn" onClick={() => setBetTime((prev) => Math.min(prev + 1, 60))}>
              <AddIcon fontSize="small" />
            </button>
          </div>
          {/* <div className="select-section">
            <button className="sq-btn" onClick={() => setPointAmount((prev) => Math.max(prev - 10, 10))}>
              <RemoveIcon fontSize="small" />
            </button>
            <div className="bet-setup-input">
              <input 
                className="short-input"
                value={pointAmount} 
                onChange={(e) => setPointAmount(Number(e.target.value))}
                max={currentBalance * 0.2}
              />
              <span className="toll-icon">
                <TollIcon fontSize="small" sx={{ color: '#555' }} />
              </span>
            </div>
            <button className="sq-btn" onClick={() => setPointAmount((prev) => prev + 10)}>
              <AddIcon fontSize="small" />
            </button>
          </div> */}
        </div>
        <div className="buttons" style={{opacity: countdown > 0 ? 0.4: 1}}>
          <button className="up-btn" onClick={upBet} disabled={countdown > 0}>
            <TrendingUpIcon />
            <span>Up</span>
          </button>
          <button className="down-btn" onClick={downBet} disabled={countdown > 0}>
            <TrendingDownIcon />
            <span>Down</span>
          </button>
        </div>
      </div>
      
      <ActiveBet 
        countdown={countdown}
        betDirection={betDirection}
        pointAmount={pointAmount}
        startPrice={startPrice}
        betTime={betTime}
      />

      <ResultBet 
        countdown={countdown}
        isBetResultShown={isBetResultShown}
        betStatus={betStatus}
      />
    </div>
    )}
    </>
  )
}
