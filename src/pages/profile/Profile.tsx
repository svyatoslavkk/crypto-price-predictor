import SideBar from "../../components/sideBar/SideBar"
import ProfileTop from "../../components/profileTop/ProfileTop"

export default function Profile() {
  return (
    <div className="profile">
      <ProfileTop />
      <SideBar />
    </div>
  )
}