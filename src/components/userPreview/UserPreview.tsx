import { useUserContext } from "../../context/UserContext";
import { userPreviewLoadingUI } from "../ui/loadingUI";

export default function UserPreview() {
  const { myData, loading } = useUserContext();
  const exImg = 'https://www.aipromptsgalaxy.com/wp-content/uploads/2023/06/subrat_female_avatar_proud_face_Aurora_a_25-year-old_girl_with__fd0e4c59-bb7e-4636-9258-6690ec6a71e7.png';

  if (loading) return userPreviewLoadingUI;

  if (!loading) {
    return (
      <div className="user-preview">
        <div className="double-window">
          <div className="mini-window">
            <div className="top">
              <h3 className="small-text">Balance</h3>
              <div></div>
            </div>
            {myData && (
              <h3 className="medium-header">${myData.balance ? myData.balance.toFixed(2) : '0.00'}</h3>
            )}
            <div></div>
          </div>
          <div className="mini-window">
            <div className="top">
              <h3 className="small-text">Profile</h3>
              <div></div>
            </div>
            {myData && (
              <img src={myData.avatar ? myData.avatar: exImg} className="large-circle-img" alt="Avatar" />
            )}
            {myData && (
              <span className="small-header">{myData.userName ? myData.userName : 'NO_AUTH'}</span>
            )}
          </div>
        </div>
      </div>
    )
  }
}