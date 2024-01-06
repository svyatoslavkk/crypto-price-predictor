import TopCoin from "../../components/topCoin/TopCoin"
import SideBar from "../../components/sideBar/SideBar"
import LogoutIcon from '@mui/icons-material/Logout';

export default function Dashboard() {
  return (
    <div className="dashboard">
      <div className="top-section">
        <h1 className="large-header">Dashboard</h1>
        <button className="small-circle-button">
          <LogoutIcon fontSize="small" />
        </button>
      </div>
      <TopCoin />
      <SideBar />
    </div>
  )
}