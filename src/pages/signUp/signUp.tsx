import React from 'react';
import GoogleIcon from '@mui/icons-material/Google';
import { Link } from 'react-router-dom';
import LoaderScreen from '../../components/loaders/loaderScreen/LoaderScreen';
import { useAuthContext } from '../../context/AuthContext';

export default function SignUp() {
  const { loading, handleUsernameChange, handleEmailChange, handlePasswordChange, handleAvatarChange, handleSubmit, handleGoogleSignUp } = useAuthContext();

  return (
    <div className="signup">
      <div className="ring">
        <i style={{ '--clr' : '#00ff0a' } as React.CSSProperties}></i>
        <i style={{ '--clr' : '#ff0057' } as React.CSSProperties}></i>
        <i style={{ '--clr' : '#fffd44' } as React.CSSProperties}></i>
        <div className="login">
          <h2>Register</h2>
          <div className="inputBx">
            <label htmlFor="avatarInput" className="avatar-label">
              Choose Avatar
            </label>
            <input
              type="file"
              id="avatarInput"
              accept="image/*"
              onChange={handleAvatarChange}
            />
          </div>
          <div className="inputBx">
            <input 
              type="text" 
              className="classic-input" 
              placeholder="Username"
              onChange={handleUsernameChange}
            />
          </div>
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
          <div className="inputBx" onClick={handleSubmit}>
            <input 
              type="submit" 
              className="classic-input" 
              value="Sign Up"
            />
          </div>
          <p className="medium-text">Already have an account? <Link to="/login" className="link-text">Log In</Link></p>
          <div className="links">
            <button className="social-icon" onClick={handleGoogleSignUp}>
              <GoogleIcon fontSize='large' />
            </button>
          </div>
        </div>
      </div>
      {loading && <LoaderScreen />}
    </div>
  )
}