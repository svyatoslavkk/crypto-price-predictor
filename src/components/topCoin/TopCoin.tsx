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

      console.log("filtered", filtered);
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
      console.log("Formatted Data:", formattedData);
      
      setpastData(formattedData);
      console.log("Past Data:", pastData);
    };

    fetchHistoricalData();

    if (ws.current) {
      ws.current.onmessage = (e: MessageEvent) => {
        let data = JSON.parse(e.data);
        if (data.type !== "ticker") {
          return;
        }

        if (data.product_id === pair) {
          if (data.price < price) {
            setPriceChangeColor("#ff5e5e");
            setTimeout(() => setPriceChangeColor(""), 1000);
          } else if (data.price > price) {
            setPriceChangeColor("#0cff41");
            setTimeout(() => setPriceChangeColor(""), 1000);
          }

          if (prevPriceRef.current !== null) {
            const previousPrice = prevPriceRef.current;
            const resultDiff = ((data.price - previousPrice) / previousPrice) * 100;
            setPercentageDiff(resultDiff);
          }

          prevPriceRef.current = data.price;

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

  if (bitcoinInfo) {
    console.log("BTC INFO", bitcoinInfo);
  }

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
        <div className="buttons">
          <button className="up-btn">
            <TrendingUpIcon />
            <span>Up</span>
          </button>
          <button className="down-btn">
            <TrendingDownIcon />
            <span>Down</span>
          </button>
        </div>
      </div>
    </div>
  )
}
