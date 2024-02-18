import { useMediaQuery } from '@mui/material';
import { useGetCoinListQuery } from "../../redux/features/api/api";
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import { coinsRowLoadingUI } from "../ui/loadingUI";
import { coinsRowErrorUI } from "../ui/errorUI";
import { Coin } from "../../types/types";
import HeaderSection from '../shared-components/HeaderSection';
import { COINS_TITLE } from '../../constants/constants';

export default function CoinsRow() {
  const { data: coinsList, error: coinsListError, isLoading: coinsListLoading } = useGetCoinListQuery({});
  const isSmallScreen = useMediaQuery('(max-width:1111px)');
  const isExtraSmallScreen = useMediaQuery('(max-width:350px)');

  const splideOptions = isExtraSmallScreen 
    ? {
        perPage: 1,
        perMove: 1,
        rewind : true,
        height: '7.6rem',
        pagination: false,
        gap    : '0.5rem',
      }
    : isSmallScreen 
      ? {
          perPage: 2,
          perMove: 1,
          rewind : true,
          height: '7.6rem',
          pagination: false,
          gap    : '0.5rem',
        }
      : {
          perPage: 3,
          perMove: 1,
          rewind : true,
          height: '7.6rem',
          pagination: false,
          gap    : '0.5rem',
        };

  if (coinsListLoading) {
    return coinsRowLoadingUI;
  }

  if (coinsListError) {
    return coinsRowErrorUI;
  }

  return (
    <>
      <div className="list-column">
        <HeaderSection
          title={COINS_TITLE}
        />
        <Splide 
          options={ splideOptions }
          aria-labelledby="basic-example-heading"
        >
          {coinsList && coinsList.slice(0, 10).map((item: Coin) => (
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
