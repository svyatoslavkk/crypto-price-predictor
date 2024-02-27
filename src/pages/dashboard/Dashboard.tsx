import LogoutIcon from '@mui/icons-material/Logout';
import LoaderScreen from "../../components/loaders/loaderScreen/LoaderScreen";
import TopPlayersSlider from "../../components/topPlayersSlider/TopPlayersSlider";
import CoinsRow from "../../components/coinsRow/CoinsRow";
import NewsSlide from "../../components/newsSlide/NewsSlide";
import NewsSection from "../../components/newsSection/NewsSection";
import UserPreview from "../../components/userPreview/UserPreview";
import TopCoin from "../../components/topCoin/TopCoin";
import useLogout from "../../hooks/useLogout";
import { DASHBOARD_TITLE } from '../../constants/constants';

export default function Dashboard() {
  const { loading, handleLogout } = useLogout();

  return (
    <div className="dashboard">
      <div className="top-section">
        <h1 className="large-header">{DASHBOARD_TITLE}</h1>
        <button className="small-circle-button" onClick={handleLogout}>
          <LogoutIcon fontSize="small" />
        </button>
      </div>
      <UserPreview />
      <TopCoin />
      <TopPlayersSlider />
      <CoinsRow />
      <NewsSlide />
      <NewsSection />
      {loading && <LoaderScreen />}
    </div>
  )
}