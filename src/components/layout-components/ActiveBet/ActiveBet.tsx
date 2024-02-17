import AccessTimeIcon from '@mui/icons-material/AccessTime';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import { IActiveBet } from '../../../types/types';

export default function ActiveBet({ countdown, betDirection, pointAmount, startPrice }: IActiveBet) {
  return (
    <div className={`active-bet ${(countdown > 0) ? 'active-status-bet' : 'active-status-bet'}`}>
      <div className="text-items-column">
        <div className="flex-info" style={{color: 'white'}}>
          <AccessTimeIcon fontSize="small" />
          <h3 className="small-text">{Math.abs(countdown.toFixed(1))}</h3>
        </div>
        <div className="flex-info">
          {betDirection === "UP" ? (
            <TrendingUpIcon fontSize="inherit" sx={{ color: '#0cff41' }} />
          ) : (
            <TrendingDownIcon fontSize="inherit" sx={{ color: '#ff5e5e' }} />
          )}
          <span className="small-text" style={{ color: betDirection === 'UP' ? '#0cff41' : '#ff5e5e' }}>
            {betDirection}
          </span>
        </div>
      </div>
      <div className="text-items-column" style={{alignItems: 'flex-end'}}>
        <div className="flex-info">
          <span className="small-text">Bet: {pointAmount}$</span>
        </div>
        <div className="flex-info">
          <span className="small-text">Initial price: {startPrice}$</span>
        </div>
      </div>
    </div>
  )
}