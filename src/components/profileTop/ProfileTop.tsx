import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import TopButtons from '../topButtons/TopButtons';
import CasinoIcon from '@mui/icons-material/Casino';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import { useUserContext } from '../../context/UserContext';
import { User } from '../../types/types';
import LoaderScreen from '../loaders/loaderScreen/LoaderScreen';

export default function ProfileTop() {
  const { user, rankUsers, myData, myDataLoading } = useUserContext();
  
  if (myDataLoading) {
    return <LoaderScreen />;
  }

  const exImg = 'https://www.aipromptsgalaxy.com/wp-content/uploads/2023/06/subrat_female_avatar_proud_face_Aurora_a_25-year-old_girl_with__fd0e4c59-bb7e-4636-9258-6690ec6a71e7.png';
  const myRankIndex = rankUsers.findIndex((data: User) => data?.uid === user?.uid);
  const myRank = myRankIndex !== -1 ? myRankIndex + 1 : null;
  const winRate = myData ? (myData.winBets / myData.totalBets) * 100 : 0;
  const pageTitle = '';

  return (
    <>
      {myData && (
      <div className="profile-top">
          <TopButtons pageTitle={pageTitle} />
          <div className="avatar-section">
            {myData && (
              <img src={myData.avatar ? myData.avatar : exImg} className="large-circle-img" alt="Avatar" />
            )}
          </div>
          <div className="username-section">
            {myData && (
              <span className="large-header">{myData.userName ? myData.userName : 'NO_AUTH'}</span>
            )}
          </div>
          <div className="balance-section">
            <span className="medium-text">Your Balance</span>
            <div className="balance-amount">
              {myData && (
                <h3 className="large-header">${myData.balance ? myData.balance.toFixed(2) : '0.00'}</h3>
              )}
            </div>
            <div className="stats-info">
              <div className="stat">
                <ShowChartIcon fontSize="small" sx={{ color: '#f0de69' }} />
                <h3 className="small-header">#{myRank}</h3>
                <span className="small-text">Rank</span>
              </div>
              <div className="stat">
                <EmojiEventsIcon fontSize="small" sx={{ color: '#f0de69' }} />
                {myData && (
                  <h3 className="small-header">{myData.totalBets !== 0 ? winRate.toFixed(0) : 0}%</h3>
                )}
                <span className="small-text">Win Rate</span>
              </div>
              <div className="stat">
                <CasinoIcon fontSize="small" sx={{ color: '#f0de69' }} />
                {myData && (
                  <h3 className="small-header">{myData.totalBets !== undefined ? myData.totalBets : '-'}</h3>
                )}
                <span className="small-text">Total bets</span>
              </div>
            </div>
          </div>
      </div>
      )}
    </>
  )
}