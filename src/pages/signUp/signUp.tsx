import GoogleIcon from '@mui/icons-material/Google';
import { useState } from 'react';
import { app } from '../../firebase/firebaseConfig';
import {
  getAuth,
  createUserWithEmailAndPassword,
} from 'firebase/auth';

export default function SignUp() {
  const auth = getAuth(app);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };
  
  const handleSubmit = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((response) => {
        console.log(response.user);
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <div className="signup">
      <div className="ring">
        <i style={{ '--clr' : '#00ff0a' } as React.CSSProperties}></i>
        <i style={{ '--clr' : '#ff0057' } as React.CSSProperties}></i>
        <i style={{ '--clr' : '#fffd44' } as React.CSSProperties}></i>
        <div className="login">
          <h2>Register</h2>
          <div className="inputBx">
            <input 
              type="text" 
              className="classic-input" 
              placeholder="Username" 
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
          <div className="links">
            <div className="social-icon">
              <GoogleIcon fontSize='large' />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}