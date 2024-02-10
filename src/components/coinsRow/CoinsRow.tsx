import { useGetCoinListQuery } from "../../redux/features/api/api";
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import { coinsRowLoadingUI } from "../ui/loadingUI";
import { coinsRowErrorUI } from "../ui/errorUI";
import { Coin } from "../../types/types";

export default function CoinsRow() {
  const { data: coinsList, error: coinsListError, isLoading: coinsListLoading } = useGetCoinListQuery({});

  if (coinsListLoading) {
    return coinsRowLoadingUI;
  }

  if (coinsListError) {
    return coinsRowErrorUI;
  }

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
