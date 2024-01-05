import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GoogleIcon from '@mui/icons-material/Google';
import { app, database } from '../../firebase/firebaseConfig';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  updateProfile
} from 'firebase/auth';
import { collection, addDoc } from 'firebase/firestore';

export default function SignUp() {
  const auth = getAuth(app);
  const googleProvider = new GoogleAuthProvider();
  const navigate = useNavigate();
  const collectionRef = collection(database, 'Users Data');
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(event.target.value);
  };
  
  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };
  
  const handleSubmit = async () => {
    try {
      const response = await createUserWithEmailAndPassword(auth, email, password);
      const currentUser = auth.currentUser;
  
      if (currentUser) {
        await updateProfile(currentUser, {
          displayName: userName,
        });

        console.log(response.user);
        console.log("User registered successfully!");

        await addDoc(collectionRef, {
          userName: userName,
          email: currentUser.email,
        });
        navigate('/dashboard');
      }
    } catch (err) {
      console.error('Registration error:', err.message);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      console.log(user);
      const usernameFromGoogle = user.displayName || 'FallbackUsername';
      await updateProfile(user, { displayName: usernameFromGoogle });
      await addDoc(collectionRef, {
        email: user.email,
        userName: usernameFromGoogle,
      });
      navigate('/dashboard');
    } catch (err) {
      console.error('Google Sign In error:', err.message);
    }
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
          <div className="links">
            <div className="social-icon" onClick={handleGoogleSignIn}>
              <GoogleIcon fontSize='large' />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}