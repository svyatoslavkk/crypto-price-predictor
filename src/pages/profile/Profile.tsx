import SideBar from "../../components/sideBar/SideBar"
import ProfileTop from "../../components/profileTop/ProfileTop"
import ProfileInfo from "../../components/profileInfo/ProfileInfo"

export default function Profile() {
  return (
    <div className="profile">
      <ProfileTop />
      <ProfileInfo />
      <SideBar />
    </div>
  )
}