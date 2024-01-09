import { useGetCoinListQuery } from "../../redux/features/api/api";
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

export default function CoinsRow() {
  const { data: coinsList } = useGetCoinListQuery();
  
  return (
    <div className="double-window">
        {coinsList && coinsList.slice(0, 2).map((item: { image: string, name: string, symbol: string, current_price: string, price_change_percentage_24h: number }) => (
          <div className="mini-window" key={item.name}>
            <div className="flex-info">
              <img src={item.image} className="small-circle-img" alt="Coin" />
              <div className="text-items-column">
                <h3 className="small-header">{item.name}</h3>
                <span className="small-text">{item.symbol.toUpperCase()}</span>
              </div>
            </div>
            <div className="flex-info">
              <span className="medium-text">${item.current_price}</span>
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
    </div>
  )
}
