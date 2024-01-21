import { useState } from 'react';
import LogoutIcon from '@mui/icons-material/Logout';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import { useNavigate } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';
import LoaderScreen from '../loaders/loaderScreen/LoaderScreen';

interface TopButtonsProps {
  pageTitle: string;
}

export default function TopButtons({ pageTitle }: TopButtonsProps) {
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

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="top-buttons">
      <button className="small-circle-button" onClick={handleGoBack}>
        <KeyboardArrowLeftIcon fontSize="medium" />
      </button>
      <h2 className="large-header">{pageTitle}</h2>
      <button className="small-circle-button" onClick={handleLogout}>
        <LogoutIcon fontSize="small" />
      </button>
      {loading && <LoaderScreen />}
    </div>
  )
}