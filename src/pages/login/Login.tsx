import React from 'react';
import GoogleIcon from '@mui/icons-material/Google';
import { Link } from 'react-router-dom';
import LoaderScreen from '../../components/loaders/loaderScreen/LoaderScreen';
import { useAuthContext } from '../../context/AuthContext';
import ClassicInput from '../../components/ui/ClassicInput';
import { EMAIL_PLACEHOLDER, LOGIN_VALUE, PASSWORD_PLACEHOLDER, PASSWORD_TYPE, SUBMIT_TYPE, TEXT_TYPE } from '../../constants/constants';

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
            onClick={signIn}
            value={LOGIN_VALUE}
          />
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
