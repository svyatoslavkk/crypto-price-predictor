import React from 'react';
import GoogleIcon from '@mui/icons-material/Google';
import { Link } from 'react-router-dom';
import LoaderScreen from '../../components/loaders/loaderScreen/LoaderScreen';
import { useAuthContext } from '../../context/AuthContext';
import ClassicInput from '../../components/ui/ClassicInput';
import { EMAIL_PLACEHOLDER, PASSWORD_PLACEHOLDER, PASSWORD_TYPE, SIGNUP_VALUE, SUBMIT_TYPE, TEXT_TYPE, USERNAME_PLACEHOLDER } from '../../constants/constants';

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
          <ClassicInput 
            type={TEXT_TYPE}
            placeholder={USERNAME_PLACEHOLDER}
            onChange={handleUsernameChange}
          />
          <ClassicInput 
            type={TEXT_TYPE}
            placeholder={EMAIL_PLACEHOLDER}
            onChange={handleEmailChange}
          />
          <ClassicInput 
            type={PASSWORD_TYPE}
            placeholder={PASSWORD_PLACEHOLDER}
            onChange={handlePasswordChange}
          />
          <ClassicInput
            type={SUBMIT_TYPE}
            onClick={handleSubmit}
            value={SIGNUP_VALUE}
          />
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