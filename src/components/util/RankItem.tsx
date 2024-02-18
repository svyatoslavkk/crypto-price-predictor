import { useUserContext } from "../../context/UserContext"
import { IRankItem } from "../../types/types";
import { useNavigate } from 'react-router-dom';

export default function RankItem({ uid, avatar, userName, rank, balance }: IRankItem) {
  const { setShowProfile } = useUserContext();
  const navigate = useNavigate();
  
  const handleViewProfile = () => {
    navigate(`/profile/${uid}`);
    setShowProfile(true);
  };
  
  return (
    <li key={uid} className="rank-item">
      <div className="flex-info">
        <img src={avatar} className="medium-sq-img" alt="Avatar" />
        <div className="text-items-column">
          <h3 className="medium-text">{userName}</h3>
          <h3 className="medium-header">#{rank}</h3>
        </div>
      </div>
      <div className="text-items-column">
        <h3 className="small-header" style={{textAlign: 'right'}}>${balance}</h3>
        <button className="sq-btn-mod" onClick={handleViewProfile}>
          <span className="tiny-color-text">View Profile</span>
        </button>
      </div>
    </li>
  )
}