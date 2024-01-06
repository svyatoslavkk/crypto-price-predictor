// import { useState, useRef, useEffect } from "react";
import { useGetBitcoinInfoQuery } from "../../redux/features/api/api";
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
// import { formatData } from "../../utils/formatData";

export default function TopCoin() {
  // const [currencies, setcurrencies] = useState([]);
  // const [pair, setpair] = useState("");
  // const [price, setprice] = useState("0.00");
  // const [pastData, setpastData] = useState({});
  // const ws = useRef(new WebSocket("wss://ws-feed.pro.coinbase.com"));

  // let first = useRef(false);
  // const url = "https://api.pro.coinbase.com";

  // useEffect(() => {
  //   let pairs: any[] = [];

  //   const apiCall = async () => {
  //     await fetch(url + "/products")
  //       .then((res) => res.json())
  //       .then((data) => (pairs = data));

  //     let filtered = pairs.filter((pair) => {
  //       if (pair.quote_currency === "USD") {
  //         return pair;
  //       }
  //     });

  //     filtered = filtered.sort((a, b) => {
  //       if (a.base_currency < b.base_currency) {
  //         return -1;
  //       }
  //       if (a.base_currency > b.base_currency) {
  //         return 1;
  //       }
  //       return 0;
  //     });

  //     console.log("filtered", filtered);
  //     setcurrencies(filtered);

  //     first.current = true;
  //   };

  //   apiCall();
  // }, []);

  // useEffect(() => {
  //   if (!first.current) {
  //     return;
  //   }

  //   let msg = {
  //     type: "subscribe",
  //     product_ids: [pair],
  //     channels: ["ticker"],
  //   };
  //   let jsonMsg = JSON.stringify(msg);
  //   if (ws.current) {
  //     ws.current.send(jsonMsg);
  //   }

  //   let historicalDataURL = `${url}/products/${pair}/candles?granularity=86400`;
  //   const fetchHistoricalData = async () => {
  //     let dataArr: any[] = [];
  //     await fetch(historicalDataURL)
  //       .then((res) => res.json())
  //       .then((data) => (dataArr = data));

  //     let formattedData = formatData(dataArr);
  //     setpastData(formattedData);
  //   };

  //   fetchHistoricalData();

  //   if (ws.current) {
  //     ws.current.onmessage = (e: MessageEvent) => {
  //       let data = JSON.parse(e.data);
  //       if (data.type !== "ticker") {
  //         return;
  //       }

  //       if (data.product_id === pair) {
  //         setprice(data.price);
  //       }
  //     };
  //   }
  // }, [pair]);

  // const handleSelect = (e) => {
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

  if (bitcoinInfo) {
    console.log("BTC INFO", bitcoinInfo);
  }

  return (
    <div className="top-coin">
      <h2 className="medium-header">Top Coin</h2>
      {/* <div>
        <select name="currency" value={pair} onChange={handleSelect}>
          {currencies.map((cur, idx) => {
            return (
              <option key={idx} value={cur.id}>
                {cur.display_name}
              </option>
            );
          })}
        </select>
        <h2>PRICE{`$${price}`}</h2>
      </div> */}
      {bitcoinInfo && (
      <div className="window">
        <div className="coin-main-info">
          <img src={bitcoinInfo.image.small} className="small-circle-img" alt="Coin" />
          <h3 className="small-header">{bitcoinInfo.name}</h3>
        </div>
        <div className="price-info">
          <span>${bitcoinInfo.market_data.current_price.usd}</span>
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
      )}
    </div>
  )
}
