import { useState, useEffect } from "react";
import { useGetCoinListQuery } from "../../redux/features/api/api";
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import SimpleLoader from "../loaders/simpleLoader/SimpleLoader";
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';

interface Coin {
  image: string;
  name: string;
  symbol: string;
  current_price: string;
  price_change_percentage_24h: number;
}

export default function CoinsRow() {
  const [showLoading, setShowLoading] = useState(true);
  const { data: coinsList, error: coinsListError, isLoading: coinsListLoading } = useGetCoinListQuery();
  const loadingImg = 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/1200px-Bitcoin.svg.png';
  const errorImg = 'https://cdn.gobankingrates.com/wp-content/uploads/2018/03/bitcoin-ethereum-cryptocurrency-taxes-blockchain-iStock-886921308.jpg';

  useEffect(() => {
    const delay = setTimeout(() => {
      setShowLoading(false);
    }, 3000);

    return () => clearTimeout(delay);
  }, []);

  const loadingUI = Array.from({ length: 5 }, (_, index) => (
    <div key={index} className="mini-window">
      <SimpleLoader />
      <div className="flex-info" style={{ opacity: 0 }}>
        <img src={loadingImg} className="small-circle-img" alt="Coin" />
        <div className="text-items-column">
          <h3 className="small-header">Bitcoin</h3>
          <span className="small-text">BTC</span>
        </div>
      </div>
      <div className="flex-info" style={{ opacity: 0 }}>
        <span className="medium-text">$45090</span>
        <div className={`percentage-progress`}>
          <KeyboardArrowDownIcon fontSize='small' />
          <span>1%</span>
        </div>
      </div>
    </div>
  ));

  const errorUI = (
    <div className="mini-window">
      <div className="error-content">
        <h3 className="medium-header">404</h3>
        <p className="small-text">Sorry. The data is broken. Please try again later.</p>
      </div>
      <div className="error-bg-block">
        <img className="error-bg-img" src={errorImg} alt="Error Image" />
      </div>
      <div className="flex-info" style={{ opacity: 0 }}>
        <img src={loadingImg} className="small-circle-img" alt="Coin" />
        <div className="text-items-column">
          <h3 className="small-header">Bitcoin</h3>
          <span className="small-text">BTC</span>
        </div>
      </div>
      <div className="flex-info" style={{ opacity: 0 }}>
        <span className="medium-text">$45090</span>
        <div className={`percentage-progress`}>
          <KeyboardArrowDownIcon fontSize='small' />
          <span>1%</span>
        </div>
      </div>
    </div>
  );
  
  return (
    <div className="coins-row">
      <div className="header-section">
        <h3 className="small-header">Coins</h3>
        <div></div>
      </div>
      <div className="double-window">
        {showLoading && coinsListLoading && loadingUI}
        {coinsListError && errorUI}
        {/* <button className="left-icon">
          <ArrowCircleLeftIcon />
        </button> */}
        {coinsList && coinsList.slice(0, 4).map((item: Coin) => (
          <div className="mini-window" key={item.name}>
            <div className="flex-info">
              <img src={item.image} className="small-circle-img" alt="Coin" />
              <div className="text-items-column">
                <h3 className="small-header">{item.name}</h3>
                <span className="small-text">{item.symbol.toUpperCase()}</span>
              </div>
            </div>
            <div className="flex-info">
              <span className="small-text">${item.current_price}</span>
              <div className={`percentage-progress ${item.price_change_percentage_24h > 0 ? 'green' : 'red'}`}>
                {item.price_change_percentage_24h > 0 ?
                  <KeyboardArrowUpIcon fontSize='small' /> : 
                  <KeyboardArrowDownIcon fontSize='small' />
                }
                <span>{item.price_change_percentage_24h.toFixed(2)}%</span>
              </div>
            </div>
          </div>
        ))}
        {/* <button className="right-icon">
          <ArrowCircleRightIcon />
        </button> */}
      </div>
    </div>
  )
}
