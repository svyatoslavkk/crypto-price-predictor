import ProfileTop from "../../components/profileTop/ProfileTop"
import ProfileInfo from "../../components/profileInfo/ProfileInfo"
import SideBar from "../../components/sideBar/SideBar"
import ProfileFullScreen from "../../components/profileFullScreen/ProfileFullScreen"

export default function Profile() {
  return (
    <div className="screen-container">
      <SideBar />
      <div className="profile">
        <ProfileTop />
        <ProfileInfo />
      </div>
      <ProfileFullScreen />
    </div>
  )
}