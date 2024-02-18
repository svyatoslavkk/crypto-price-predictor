import { BetDetails } from "../../types/types";

export default function HistoryBetItem({ openTime, direction, openPrice, closePrice, result }: BetDetails) {
  return (
    <div key={openTime} className="history-bet-item">
      <div className="text-items-column">
        <span className="small-text">
          Choice: <strong>{direction}</strong>
        </span>
        <span className="small-text">{openTime}</span>
      </div>
      <div className="text-items-column">
        <span className="small-text">Initial price: {openPrice}</span>
        <span className="small-text">Final price: {closePrice}</span>
      </div>
      <h3 className="small-header" style={{ color: result === 'win' ? '#0cff41' : '#ff5e5e' }}>{result.toUpperCase()}</h3>
    </div>
  )
}