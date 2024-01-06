import TopCoin from "../../components/topCoin/TopCoin"
import SideBar from "../../components/sideBar/SideBar"

export default function Dashboard() {
  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      <TopCoin />
      <SideBar />
    </div>
  )
}