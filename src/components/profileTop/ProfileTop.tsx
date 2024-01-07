import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import TopButtons from '../topButtons/TopButtons';

export default function ProfileTop() {
  const exImg = 'https://www.aipromptsgalaxy.com/wp-content/uploads/2023/06/subrat_female_avatar_proud_face_Aurora_a_25-year-old_girl_with__fd0e4c59-bb7e-4636-9258-6690ec6a71e7.png';
  return (
    <div className="profile-top">
      <TopButtons />
      <div className="avatar-section">
        <img src={exImg} className="large-circle-img" alt="Avatar" />
      </div>
      <div className="username-section">
        <span className="large-header">CYTENER</span>
      </div>
      <div className="buttons">
        <button className="sq-btn">
          <ContentCopyIcon fontSize='small' />
          <span>Copy Username</span>
        </button>
      </div>
      <div className="balance-section">
        <span className="medium-text">Your Balance</span>
        <div className="balance-amount">
          <h3 className="large-header">$32128.80</h3>
          <div className="percentage-progress">
            <ArrowCircleUpIcon fontSize='small' />
            <span>23.30%</span>
          </div>
        </div>
        <div className="stats-info">
          <div className="stat">
            <h3 className="stat-value">#1</h3>
            <span className="small-text">Rank</span>
          </div>
          <div className="stat">
            <h3 className="stat-value">80%</h3>
            <span className="small-text">Win Rate</span>
          </div>
        </div>
      </div>
    </div>
  )
}