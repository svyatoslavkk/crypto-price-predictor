import React, { useState, useRef, useEffect } from "react";
import { useGetBitcoinInfoQuery } from "../../redux/features/api/api";
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { formatData } from "../../utils/formatData";

export default function TopCoin() {
  const [currencies, setcurrencies] = useState<any[]>([]);
  const [pair, setpair] = useState("BTC-USD");
  const [price, setprice] = useState("0.00");
  const [pastData, setpastData] = useState({});
  const [currentBitcoinPrice, setCurrentBitcoinPrice] = useState("");
  const [priceChangeColor, setPriceChangeColor] = useState("");
  const [percentageDiff, setPercentageDiff] = useState(0);
  const prevPriceRef = useRef<number | null>(null);
  const [betTime, setBetTime] = useState(10);
  const [betDirection, setBetDirection] = useState("");
  const [betStatus, setBetStatus] = useState("");
  const [countdown, setCountdown] = useState(0);
  const [predictionTime, setPredictionTime] = useState<number | null>(null);
  const [predictionPrice, setPredictionPrice] = useState<number | null>(null);
  const [betPrice, setBetPrice] = useState<number | null>(null);

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
      console.log(pastData);
    };

    fetchHistoricalData();

    if (ws.current) {
      ws.current.onmessage = (e: MessageEvent) => {
        let data = JSON.parse(e.data);
        if (data.type !== "ticker") {
          return;
        }

        if (data.product_id === pair) {
          const newPrice = parseFloat(data.price);
          const currentPrice = parseFloat(price);
        
          if (newPrice < currentPrice) {
            setPriceChangeColor("#ff5e5e".toString());
            setTimeout(() => setPriceChangeColor(""), 1000);
          } else if (newPrice > currentPrice) {
            setPriceChangeColor("#0cff41".toString());
            setTimeout(() => setPriceChangeColor(""), 1000);
          }
        
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

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    let unsubMsg = {
      type: "unsubscribe",
      product_ids: [pair],
      channels: ["ticker"]
    };
    let unsub = JSON.stringify(unsubMsg);

    ws.current.send(unsub);

    setpair(e.target.value);
  };

  const { data: bitcoinInfo } = useGetBitcoinInfoQuery('bitcoin');

  const placeBet = (direction: string) => {
    setBetDirection(direction);
    setPredictionTime(new Date().getTime());
    setBetPrice(parseFloat(price));
    setCountdown(betTime);
  
    const countdownInterval = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);
  
    setTimeout(() => {
      clearInterval(countdownInterval);
      setBetStatus((prevBetStatus) => {
        const finalPrice = parseFloat(price);
        handleBetResult(() => finalPrice, betPrice, finalPrice);
        return prevBetStatus;
      });
    }, betTime * 1000);
  };
  
  const handleBetResult = (
    getCurrentPrice: () => number,
    currentBetPrice: number | null,
    finalPrice: number
  ) => {
    if (predictionTime === null || currentBetPrice === null) {
      console.error("Prediction data is missing");
      return;
    }
  
    const currentTime = new Date().getTime();
    const elapsedTime = (currentTime - predictionTime) / 1000;
  
    const targetTime = 10;
  
    const currentPrice = getCurrentPrice();
  
    const isBetCorrect =
      elapsedTime >= targetTime &&
      ((betDirection === "up" && currentPrice > currentBetPrice) ||
        (betDirection === "down" && currentPrice < currentBetPrice));
  
    setPredictionPrice(finalPrice);
    console.log(predictionPrice);
    setBetStatus(isBetCorrect ? "win" : "lose");
  
    const predictionResult = isBetCorrect ? "Угадали!" : "Не угадали.";
    const predictionStatus = `Прогноз: ${betDirection.toUpperCase()} - Цена при прогнозе: ${currentBetPrice}`;
    const finalPriceStatus = `Цена в конце прогноза: ${finalPrice}`;
  
    console.log(`${predictionResult} ${predictionStatus} ${finalPriceStatus}`);
  };

  return (
    <div className="top-coin">
      <h2 className="medium-header">Top Coin</h2>
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
      </div>
      <div className="window">
        {bitcoinInfo && (
          <div className="coin-main-info">
            <img src={bitcoinInfo.image.small} className="small-circle-img" alt="Coin" />
            <h3 className="small-header">{bitcoinInfo.name}</h3>
          </div>
        )}
        <div className="price-info">
          <span style={{ color: priceChangeColor }}>{`$${pair === "BTC-USD" ? currentBitcoinPrice : price}`}</span>
        </div>
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
          <option value={10}>10 сек</option>
          <option value={20}>20 сек</option>
          <option value={30}>30 сек</option>
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
          <div className="countdown" style={{ color: 'white' }}>
            {`${countdown} сек - Прогноз: ${betDirection.toUpperCase()}, Цена: ${betPrice}`}
          </div>
        )}
        {betStatus && (
          <div className={`bet-status ${betStatus === 'win' ? 'win' : 'lose'}`} style={{ color: 'white' }}>
            {`Прогноз: ${betStatus === 'win' ? 'Угадали!' : 'Не угадали.'} Цена при прогнозе: ${betPrice}`}
          </div>
        )}
      </div>
    </div>
  )
}
