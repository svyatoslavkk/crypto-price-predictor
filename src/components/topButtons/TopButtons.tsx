import { useState } from 'react';
import LogoutIcon from '@mui/icons-material/Logout';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import { useNavigate } from 'react-router-dom';
import LoaderScreen from '../loaders/loaderScreen/LoaderScreen';
import { handleLogout } from '../../services/authUtils';

interface TopButtonsProps {
  pageTitle: string;
}

export default function TopButtons({ pageTitle }: TopButtonsProps) {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogoutClick = async () => {
    await handleLogout(navigate, setLoading);
  }

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="top-buttons">
      <button className="small-circle-button" onClick={handleGoBack}>
        <KeyboardArrowLeftIcon fontSize="medium" />
      </button>
      <h2 className="large-header">{pageTitle}</h2>
      <button className="small-circle-button" onClick={handleLogoutClick}>
        <LogoutIcon fontSize="small" />
      </button>
      {loading && <LoaderScreen />}
    </div>
  )
}