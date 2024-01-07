import { useState } from 'react';
import LogoutIcon from '@mui/icons-material/Logout';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import { useNavigate } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';
import LoaderScreen from '../loaders/loaderScreen/LoaderScreen';

export default function TopButtons() {
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

  return (
    <div className="top-buttons">
      <button className="small-circle-button">
        <KeyboardArrowLeftIcon fontSize="medium" />
      </button>
      <button className="small-circle-button" onClick={handleLogout}>
        <LogoutIcon fontSize="small" />
      </button>
      {loading && <LoaderScreen />}
    </div>
  )
}