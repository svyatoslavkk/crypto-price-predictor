import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';

const useLogout = () => {
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

  return { loading, handleLogout };
};

export default useLogout;
