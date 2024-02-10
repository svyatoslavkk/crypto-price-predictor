import TopCoin from "../../components/topCoin/TopCoin"
import SideBar from "../../components/sideBar/SideBar"
import LogoutIcon from '@mui/icons-material/Logout';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';
import LoaderScreen from "../../components/loaders/loaderScreen/LoaderScreen";
import ProfilePanel from "../../components/profilePanel/ProfilePanel";
import TopPlayersSlider from "../../components/topPlayersSlider/TopPlayersSlider";
import CoinsRow from "../../components/coinsRow/CoinsRow";
import NewsSlide from "../../components/newsSlide/NewsSlide";
import NewsSection from "../../components/newsSection/NewsSection";
import UserPreview from "../../components/userPreview/UserPreview";

export default function Dashboard() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const auth = getAuth();

  const handleLogout = async () => {
    try {
      setLoading(true);
      await signOut(auth);
      navigate('/signup');
    } catch (error: any) {
      console.error('Logout error:', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="screen-container">
      <SideBar />
      <div className="dashboard">
        <div className="top-section">
          <h1 className="large-header">Dashboard</h1>
          <button className="small-circle-button" onClick={handleLogout}>
            <LogoutIcon fontSize="small" />
          </button>
        </div>
        <UserPreview />
        {/* <TopCoin /> */}
        <TopPlayersSlider />
        <CoinsRow />
        <NewsSlide />
        <NewsSection />
        {loading && <LoaderScreen />}
      </div>
      <ProfilePanel />
    </div>
  )
}