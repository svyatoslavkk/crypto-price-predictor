import CasinoIcon from '@mui/icons-material/Casino';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import TollIcon from '@mui/icons-material/Toll';
import { useUserContext } from "../../context/UserContext";

export default function ProfileFullScreen() {
  const { showProfile, setShowProfile, chosenUser } = useUserContext();
  const fakeImg = 'https://as2.ftcdn.net/v2/jpg/05/31/12/57/1000_F_531125771_Ilbj85vnztpPxc9VZZh2twbdtV4DIvJc.jpg';

  const winRate = chosenUser?.winBets && chosenUser?.totalBets
    ? chosenUser.winBets / chosenUser.totalBets * 100
    : 0;

  const statsList = [
    {
      icon: <ShowChartIcon fontSize="small" sx={{ color: '#f0de69' }} />,
      value: `#1`,
      key: "Rank",
      line: true,
    },
    {
      icon: <TollIcon fontSize="small" sx={{ color: '#f0de69' }} />,
      value: `$${chosenUser?.balance}`,
      key: "Balance",
      line: true,
    },
    {
      icon: <EmojiEventsIcon fontSize="small" sx={{ color: '#f0de69' }} />,
      value: `${chosenUser?.totalBets && winRate ? winRate.toFixed(0) : "0"}%`,
      key: "WR",
      line: true,
    },
    {
      icon: <CasinoIcon fontSize="small" sx={{ color: '#f0de69' }} />,
      value: `${chosenUser?.totalBets}`,
      key: "Bets",
      line: false,
    },
  ];

  const handleGoBack = () => {
    setShowProfile(false)
  };

  return (
    <>
      <div className={`profile-full-screen ${showProfile ? "active" : ""}`}>
        <section className="content">
          <button className="close-button" onClick={handleGoBack}>
            <CloseRoundedIcon sx={{color: "#ddd"}} />
          </button>
          <div>
            <img src={chosenUser?.avatar || fakeImg} className="img" alt="Profile Image" />
          </div>
          <h3 className="large-header">{chosenUser?.userName}</h3>
          <div className="stats2">
            {statsList.map((el) => (
              <>
                <div className="stat2">
                  {el.icon}
                  <h3 className="small-header">{el.value}</h3>
                  <span className="small-text">{el.key}</span>
                </div>
              </>
            ))}
          </div>
        </section>
      </div>
      {showProfile && <div className="overlap" onClick={handleGoBack}></div>}
    </>
  )
}