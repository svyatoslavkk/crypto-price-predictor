import SideBar from "../../components/sideBar/SideBar";
import TopButtons from "../../components/topButtons/TopButtons";
import ProfilePanel from "../../components/profilePanel/ProfilePanel";
import { User } from "../../types/types";
import { useNavigate } from 'react-router-dom';
import { useUserContext } from "../../context/UserContext";

export default function Rankings() {
  const { loading, rankUsers } = useUserContext();
  const navigate = useNavigate();

  const pageTitle = "Rankings";

  const handleViewProfile = (user: User) => {
    navigate(`/${user.uid}`);
  };

  return (
    <div className="screen-container">
      <SideBar />
      <div className="rankings">
        <TopButtons pageTitle={pageTitle} />
        <ul className="list-column">
          {loading ? (
            <>
              {[...Array(11)].map((_, index) => (
                <li key={index} className="rank-item-loading">
                  <div className="card__image"></div>
                </li>
              ))}
            </>
          ) : (
            <>
              {rankUsers.map((user: User) => (
                <li key={user.uid} className="rank-item">
                  <div className="flex-info">
                    <img src={user.avatar} className="medium-sq-img" alt="Avatar" />
                    <div className="text-items-column">
                      <h3 className="medium-text">{user.userName}</h3>
                      <h3 className="medium-header">#{user.rank}</h3>
                    </div>
                  </div>
                  <div className="text-items-column">
                    <h3 className="small-header" style={{textAlign: 'right'}}>${user.balance}</h3>
                    <button className="sq-btn-mod" onClick={() => handleViewProfile(user)}>
                      <span className="tiny-color-text">View Profile</span>
                    </button>
                  </div>
                </li>
              ))}
            </>
          )}
        </ul>
      </div>
      <ProfilePanel />
    </div>
  )
}