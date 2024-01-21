import { useState, useEffect } from "react";
import { useGetCoinListQuery } from "../../redux/features/api/api";
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import SimpleLoader from "../loaders/simpleLoader/SimpleLoader";
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';

interface Coin {
  image: string;
  name: string;
  symbol: string;
  current_price: string;
  price_change_percentage_24h: number;
}

export default function CoinsRow() {
  const [showLoading, setShowLoading] = useState(true);
  const { data: coinsList, error: coinsListError, isLoading: coinsListLoading } = useGetCoinListQuery({});
  const loadingImg = 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/1200px-Bitcoin.svg.png';
  const errorImg = 'https://cdn.gobankingrates.com/wp-content/uploads/2018/03/bitcoin-ethereum-cryptocurrency-taxes-blockchain-iStock-886921308.jpg';

  useEffect(() => {
    const delay = setTimeout(() => {
      setShowLoading(false);
    }, 3000);

    return () => clearTimeout(delay);
  }, []);

  if (!coinsListLoading) {
    return (
      <div className="list-column">
        <div className="header-section">
          <h3 className="small-header">Coins</h3>
          <div></div>
        </div>
        <Splide 
          options={ {
            perPage: 3,
            perMove: 1,
            rewind : true,
            height: '7.6rem',
            pagination: false,
            gap    : '0.5rem',
          } }
          aria-labelledby="basic-example-heading"
        >
          <SplideSlide>
            <div className="mini-window-loading">
              <div className="card__image"></div>
            </div>
          </SplideSlide>
          <SplideSlide>
            <div className="mini-window-loading">
              <div className="card__image"></div>
            </div>
          </SplideSlide>
          <SplideSlide>
            <div className="mini-window-loading">
              <div className="card__image"></div>
            </div>
          </SplideSlide>
          <SplideSlide>
            <div className="mini-window-loading">
              <div className="card__image"></div>
            </div>
          </SplideSlide>
          <SplideSlide>
            <div className="mini-window-loading">
              <div className="card__image"></div>
            </div>
          </SplideSlide>
        </Splide>
      </div>
    )
  }

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
    <>
      <div className="list-column">
        <div className="header-section">
          <h3 className="small-header">Coins</h3>
          <div></div>
        </div>
        <Splide 
          options={ {
            perPage: 3,
            perMove: 1,
            rewind : true,
            height: '7.6rem',
            pagination: false,
            gap    : '0.5rem',
          } }
          aria-labelledby="basic-example-heading"
        >
          {coinsList && coinsList.slice(0, 9).map((item: Coin) => (
            <SplideSlide key={item.name}>
              <div className="mini-window">
                <div className="flex-info">
                  <img src={item.image} className="small-circle-img" alt="Coin" />
                  <div className="text-items-column">
                    <h3 className="small-header" style={{whiteSpace: 'nowrap'}}>{item.name}</h3>
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
            </SplideSlide>
          ))}
        </Splide>
      </div>
    </>
  )
}
