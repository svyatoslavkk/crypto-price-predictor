import { useUserContext } from "../../context/UserContext"
import { IRankItem } from "../../types/types";
import MiniBtn from "../ui/MiniBtn";
import { VIEW_PROFILE_TITLE } from "../../constants/constants";

export default function RankItem({ uid, avatar, userName, rank, balance }: IRankItem) {
  const { setShowProfile, fetchUserData } = useUserContext();
  
  const handleViewProfile = () => {
    fetchUserData(uid);
    setShowProfile(true);
  };
  
  return (
    <li key={uid} className="rank-item">
      <div className="flex-info">
        <img src={avatar} className="medium-sq-img" alt="Avatar" />
        <div className="text-items-column">
          <h3 className="small-header">{userName}</h3>
          <h3 className="small-text">#{rank}</h3>
        </div>
      </div>
      <div className="text-items-column">
        <h3 className="small-header" style={{textAlign: 'right'}}>${balance}</h3>
        <MiniBtn 
          buttonText={VIEW_PROFILE_TITLE}
          onClick={handleViewProfile}
        />
      </div>
    </li>
  )
}