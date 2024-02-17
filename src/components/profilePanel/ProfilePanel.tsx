import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import HeaderPanel from '../headerPanel/HeaderPanel';
import ModernBalance from '../modernBalance/ModernBalance';
import ModernWinrate from '../modernWinrate/ModernWinrate';
import { useUserContext } from '../../context/UserContext';
import { Link } from 'react-router-dom';
import { profilePanelLoadingUI } from '../ui/loadingUI';
import { useBetContext } from '../../context/BetContext';
import winEmoji from "../../assets/winEmoji.png";
import loseEmoji from "../../assets/loseEmoji.png";
import DesktopActiveBet from '../layout-components/DesktopActiveBet/DesktopActiveBet';

export default function ProfilePanel() {
  const exImg = 'https://www.aipromptsgalaxy.com/wp-content/uploads/2023/06/subrat_female_avatar_proud_face_Aurora_a_25-year-old_girl_with__fd0e4c59-bb7e-4636-9258-6690ec6a71e7.png';
  const { user, myData, rankUsers, loading } = useUserContext();
  const { countdown, isBetResultShown, setIsBetResultShown, betStatus } = useBetContext();
  const myWinrate = myData ? (myData.winBets / myData.totalBets) * 100 : 0;

  const isBetResultShownMakeItFalse = () => {
    setIsBetResultShown(false);
  }

  const myCurrRank = rankUsers
  .filter((data) => data.uid === user?.uid)
  .map((data) => data.rank)[0];

  return (
    <section className="profile-panel">
      <HeaderPanel />
      {loading && profilePanelLoadingUI}
      {!loading && (
      <div className="panel-info">
        <div className="panel-main">
          {myData && (
            <img src={myData.avatar ? myData.avatar : exImg} className="panel-sq-img" alt="Profile Image" />
          )}
          <div className="panel-darken"></div>
          <div className="panel-username">
            {myData && (
              <span className="medium-text">{myData.userName ? myData.userName : 'NO_AUTH'}</span>
            )}
            <Link to="/profile">
              <button className="sq-btn">
                <ArrowOutwardIcon />
              </button>
            </Link>
          </div>
        </div>
        <div className="panel-rank">
          <span className="small-text">Rank</span>
          <div className="panel-ring">
            <span className="extra-large-text">#{myCurrRank}</span>
          </div>
        </div>
      </div>
      )}
      <ModernBalance />
      <ModernWinrate myWinrate={myWinrate} />
      <DesktopActiveBet />
      <div className={`fixed-overlay ${(countdown <= 0 && isBetResultShown) ? 'active-status-bet' : ''}`} onClick={isBetResultShownMakeItFalse}>
        <div className={`result-bet-modal ${(countdown <= 0 && isBetResultShown) ? 'active-status-bet' : 'active-status-bet'}`}>
          <div className="column-center">
            {betStatus === 'win' ? (
              <img src={winEmoji} className="emoji-img" alt="Emoji Status" />
            ) : (
              <img src={loseEmoji} className="emoji-img" alt="Emoji Status" />
            )}
            <h3 className="large-header" style={{color: betStatus === 'win' ? '#0cff41' : '#ff5e5e'}}>
              {betStatus === 'win' ? 'YOU WIN!' : 'TRY AGAIN'}
            </h3>
          </div>
          <button className="neutral-btn" onClick={isBetResultShownMakeItFalse}>
            <span className="small-header">Close</span>
          </button>
          {(countdown <= 0 && isBetResultShown) && <div className="timer-line"></div>}
        </div>
      </div>
    </section>
  )
}
