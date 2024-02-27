import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import TollIcon from '@mui/icons-material/Toll';
import { useBetContext } from '../../context/BetContext';
import { useGetBitcoinInfoQuery } from '../../redux/features/api/api';

export default function DesktopActiveBet() {
  const { countdown, betDirection, pointAmount, startPrice, betTime } = useBetContext();
  const { data: bitcoinInfo } = useGetBitcoinInfoQuery('bitcoin');
  const timer = countdown.toFixed(0);

  return (
    <div className={`test-active-bet ${(countdown > 0) ? "active-status-bet" : ""}`}>
        <div className="flex-info">
          <div className="progress-time-block">
            <svg className="circle-progress">
              <circle className="meter-1" cx="25" cy="25" r="20" style={{strokeDashoffset: (360 - (122 * (countdown / betTime)))}} />
            </svg>
            <span className="circle-time">{timer}</span>
          </div>
          <div className="text-items-column">
            <div className="flex-info">
              {betDirection === "UP" ? (
                <TrendingUpIcon fontSize="medium" sx={{ color: '#0cff41' }} />
              ) : (
                <TrendingDownIcon fontSize="medium" sx={{ color: '#ff5e5e' }} />
              )}
              <span className="medium-header" style={{ color: betDirection === 'UP' ? '#0cff41' : '#ff5e5e' }}>
                {betDirection}
              </span>
            </div>
          </div>
        </div>
        <div className="text-items-column" style={{alignItems: 'flex-end'}}>
          <div className="flex-info">
            <TollIcon fontSize="inherit" sx={{color: "#ddd"}} />
            <span className="small-text">{pointAmount}$</span>
          </div>
          <div className="flex-info">
            {bitcoinInfo && (
              <img src={bitcoinInfo.image.small} className="tiny-circle-img" alt="Coin" />
            )}
            <span className="small-text">{startPrice}$</span>
          </div>
        </div>
      </div>
  )
}