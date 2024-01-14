import TopCoin from "../../components/topCoin/TopCoin"
import SideBar from "../../components/sideBar/SideBar"
import LogoutIcon from '@mui/icons-material/Logout';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';
import LoaderScreen from "../../components/loaders/loaderScreen/LoaderScreen";
import ProfilePanel from "../../components/profilePanel/ProfilePanel";

export default function Dashboard() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const auth = getAuth();

  const handleLogout = async () => {
    try {
      setLoading(true);
      await signOut(auth);
      navigate('/signup');
    } catch (error) {
      console.error('Logout error:', error.message);
    } finally {
      setLoading(false);
    }
  };
  const exImg = 'https://www.aipromptsgalaxy.com/wp-content/uploads/2023/06/subrat_female_avatar_proud_face_Aurora_a_25-year-old_girl_with__fd0e4c59-bb7e-4636-9258-6690ec6a71e7.png';

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
        <TopCoin />
        {loading && <LoaderScreen />}
      </div>
      <ProfilePanel />
    </div>
  )
}