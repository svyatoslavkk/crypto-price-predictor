import React from 'react';
import GoogleIcon from '@mui/icons-material/Google';
import { useState } from 'react';
import { app, database } from '../../firebase/firebaseConfig';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
} from 'firebase/auth';
import { collection, addDoc } from 'firebase/firestore';

export default function SignUp() {
  const auth = getAuth(app);
  const googleProvider = new GoogleAuthProvider();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
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
  
      const collectionRef = collection(database, 'Users Data');
      if (currentUser) {
        console.log(response.user);
        console.log("User registered successfully!");

        await addDoc(collectionRef, {
          email: currentUser.email,
        });
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