import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import HeaderPanel from '../headerPanel/HeaderPanel';
import ModernBalance from '../modernBalance/ModernBalance';
import ModernWinrate from '../modernWinrate/ModernWinrate';
import { useEffect } from 'react';
import { useUserContext } from '../../context/UserContext';
import { User } from '../../types/types';
import { Link } from 'react-router-dom';
import { profilePanelLoadingUI } from '../ui/loadingUI';

export default function ProfilePanel() {
  const exImg = 'https://www.aipromptsgalaxy.com/wp-content/uploads/2023/06/subrat_female_avatar_proud_face_Aurora_a_25-year-old_girl_with__fd0e4c59-bb7e-4636-9258-6690ec6a71e7.png';
  const { user, myData, rankUsers, loading } = useUserContext();

  const myWinrate = (myData?.winBets / myData?.totalBets) * 100;

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
    </section>
  )
}
