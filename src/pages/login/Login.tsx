import React from 'react';
import GoogleIcon from '@mui/icons-material/Google';
import { Link } from 'react-router-dom';
import LoaderScreen from '../../components/loaders/loaderScreen/LoaderScreen';
import { useAuthContext } from '../../context/AuthContext';

export default function Login() {
  const { loading, handleEmailChange, handlePasswordChange, signIn } = useAuthContext();

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
            <button className="social-icon">
              <GoogleIcon fontSize='large' />
            </button>
          </div>
        </div>
      </div>
      {loading && <LoaderScreen />}
    </div>
  )
}
