import { User } from "../../types/types";
import CasinoIcon from '@mui/icons-material/Casino';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import CloseIcon from '@mui/icons-material/Close';
import TollIcon from '@mui/icons-material/Toll';

interface ProfileFullScreenProps {
  user: User;
  onClose: () => void;
}

export default function ProfileFullScreen({ user, onClose }: ProfileFullScreenProps) {
  const fakeImg = 'https://as2.ftcdn.net/v2/jpg/05/31/12/57/1000_F_531125771_Ilbj85vnztpPxc9VZZh2twbdtV4DIvJc.jpg';
  const winRate = (user.winBets / user.totalBets) * 100;
  return (
    <>
    <div className="profile-full-screen">
      <section className="content">
        <div>
          <img src={user.avatar || fakeImg} className="giant-sq-img" alt="Profile Image" />
        </div>
        <h3 className="medium-header">{user.userName}</h3>
        <div className="stats2">
          <div className="stat">
            <ShowChartIcon fontSize="small" sx={{ color: '#f5f5f5' }} />
            <h3 className="small-header">#{user.rank}</h3>
            <span className="small-text">Rank</span>
          </div>
          <div className="line"></div>
          <div className="stat">
            <TollIcon fontSize="small" sx={{ color: '#f5f5f5' }} />
            <h3 className="small-header">${user.balance}</h3>
            <span className="small-text">Balance</span>
          </div>
          <div className="line"></div>
          <div className="stat">
            <EmojiEventsIcon fontSize="small" sx={{ color: '#f5f5f5' }} />
            <h3 className="small-header">{user.totalBets !== 0 ? winRate.toFixed(0) : 0}%</h3>
            <span className="small-text">WR</span>
          </div>
          <div className="line"></div>
          <div className="stat">
            <CasinoIcon fontSize="small" sx={{ color: '#f5f5f5' }} />
            <h3 className="small-header">{user.totalBets !== undefined ? user.totalBets : '-'}</h3>
            <span className="small-text">Bets</span>
          </div>
        </div>
        <button className="close-icon" onClick={onClose}>
          <CloseIcon fontSize="small" sx={{ color: '#f5f5f5' }} />
        </button>
      </section>
    </div>
    </>
  )
}