import { signOut } from 'firebase/auth';
import { getAuth } from 'firebase/auth';

export const handleLogout = async (navigate: any, setLoading: any) => {
  const auth = getAuth();
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
