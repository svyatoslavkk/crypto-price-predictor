import React, { useState } from 'react';
import GoogleIcon from '@mui/icons-material/Google';
import { useNavigate } from 'react-router-dom';
import { app } from '../../firebase/firebaseConfig';
import {
  getAuth,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { Link } from 'react-router-dom';
import LoaderScreen from '../../components/loaders/loaderScreen/LoaderScreen';

export default function Login() {
  const auth = getAuth(app);
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const signIn = () => {
    setLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((response) => {
        const user = response.user;
        console.log(user);
        user.getIdToken()
          .then((accessToken) => {
            sessionStorage.setItem('Token', accessToken);
            navigate('/profile');
          })
          .catch((error) => {
            console.error('getIdToken error', error);
          });
      })
      .catch((error) => {
        console.error('signIn error', error);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  
  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  return (
    <div className="signup">
      <div className="ring">
        <i style={{ '--clr' : '#00ff0a' } as React.CSSProperties}></i>
        <i style={{ '--clr' : '#ff0057' } as React.CSSProperties}></i>
        <i style={{ '--clr' : '#fffd44' } as React.CSSProperties}></i>
        <div className="login">
          <h2>Login</h2>
          <div className="inputBx">
            <input 
              type="text" 
              className="classic-input" 
              placeholder="Email"
              onChange={handleEmailChange}
            />
          </div>
          <div className="inputBx">
            <input 
              type="password"
              className="classic-input"
              placeholder="Password"
              onChange={handlePasswordChange}
            />
          </div>
          <div className="inputBx" onClick={signIn}>
            <input type="submit" className="classic-input" value="Login" />
          </div>
          <p className="medium-text">Not a Member? <Link to="/signup" className="link-text">Register</Link></p>
          <div className="links">
            <div className="social-icon">
              <GoogleIcon fontSize='large' />
            </div>
          </div>
        </div>
      </div>
      {loading && <LoaderScreen />}
    </div>
  )
}
