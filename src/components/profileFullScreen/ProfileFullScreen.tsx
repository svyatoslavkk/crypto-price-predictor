import { User } from "../../types/types";
import CasinoIcon from '@mui/icons-material/Casino';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import CloseIcon from '@mui/icons-material/Close';
import TollIcon from '@mui/icons-material/Toll';
import { useNavigate } from 'react-router-dom';

interface ProfileFullScreenProps {
  user: User | null;
  rank: number;
  onClose: () => void;
}

export default function ProfileFullScreen({ user, rank, onClose }: ProfileFullScreenProps) {
  const fakeImg = 'https://as2.ftcdn.net/v2/jpg/05/31/12/57/1000_F_531125771_Ilbj85vnztpPxc9VZZh2twbdtV4DIvJc.jpg';
  const navigate = useNavigate();
  
  if (!user) {
    return <h2 style={{color: 'red'}}>NO</h2>;
  }

  const winRate = (user.winBets / user.totalBets) * 100;

  const statsList = [
    {
      icon: <ShowChartIcon fontSize="small" sx={{ color: '#f5f5f5' }} />,
      value: `#`,
      key: "Rank",
      line: true,
    },
    {
      icon: <TollIcon fontSize="small" sx={{ color: '#f5f5f5' }} />,
      value: `$${user.balance}`,
      key: "Balance",
      line: true,
    },
    {
      icon: <EmojiEventsIcon fontSize="small" sx={{ color: '#f5f5f5' }} />,
      value: `${user.totalBets !== 0 ? winRate.toFixed(0) : 0}%`,
      key: "WR",
      line: true,
    },
    {
      icon: <CasinoIcon fontSize="small" sx={{ color: '#f5f5f5' }} />,
      value: `${user.totalBets !== undefined ? user.totalBets : '-'}`,
      key: "Bets",
      line: false,
    },
  ];

  const handleGoBack = () => {
    onClose();
    navigate(-1);
  };

  return (
    <>
      <div className="profile-full-screen">
        <section className="content">
          <div>
            <img src={user.avatar || fakeImg} className="giant-sq-img" alt="Profile Image" />
          </div>
          <h3 className="medium-header">{user.userName}</h3>
          <div className="stats2">
            {statsList.map((el) => (
              <>
                <div className="stat">
                  {el.icon}
                  <h3 className="small-header">{el.value}</h3>
                  <span className="small-text">{el.key}</span>
                </div>
                {el.line && <div className="line"></div>}
              </>
            ))}
          </div>
          <button className="close-icon" onClick={handleGoBack}>
            <CloseIcon fontSize="small" sx={{ color: '#f5f5f5' }} />
          </button>
        </section>
      </div>
      <div className="overlap" onClick={handleGoBack}></div>
    </>
  )
}