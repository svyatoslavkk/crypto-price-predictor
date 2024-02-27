import { createContext, useContext, useState, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { app, database } from '../firebase/firebaseConfig';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile
} from 'firebase/auth';
import { collection, addDoc, doc, updateDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const AuthContext = createContext<{
  userName: string;
  email: string;
  password: string;
  avatar: File | null;
  loading: boolean;
  handleUsernameChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handleEmailChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handlePasswordChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handleAvatarChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: () => Promise<void>;
  signIn: () => Promise<void>;
  handleGoogleSignUp: (event: React.MouseEvent<HTMLButtonElement>) => void;
}>({
  userName: "",
  email: "",
  password: "",
  avatar: null,
  loading: false,
  handleUsernameChange: () => {},
  handleEmailChange: () => {},
  handlePasswordChange: () => {},
  handleAvatarChange: () => {},
  handleSubmit: async () => {},
  signIn: async () => {},
  handleGoogleSignUp: () => {},
});

export const AuthProvider = ({ children }: any) => {
  const auth = getAuth(app);
  const googleProvider = new GoogleAuthProvider();
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [avatar, setAvatar] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const collectionRef = collection(database, 'Users Data');

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(event.target.value);
  };
  
  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
  
    if (file) {
      setAvatar(file);
    }
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const response = await createUserWithEmailAndPassword(auth, email, password);
      const currentUser = auth.currentUser;
  
      if (currentUser) {
        let pictureUrl = null;
        
        if (avatar) {
          const storage = getStorage(app);
          const storageRef = ref(storage, 'avatars/' + currentUser?.uid + '.jpg');
          await uploadBytes(storageRef, avatar);
          pictureUrl = await getDownloadURL(storageRef);
        }

        await updateProfile(currentUser, {
          displayName: userName,
          photoURL: pictureUrl,
        });

        console.log(response.user);
        sessionStorage.setItem('Token', response.user?.accessToken);
        sessionStorage.setItem('FullName', userName);

        const docRef = await addDoc(collectionRef, {
          uid: currentUser.uid,
          userName: userName,
          email: currentUser.email,
          balance: 100,
          totalBets: 0,
          winBets: 0,
          historyBets: [],
          lastClaimedBonus: "2000-01-01T18:10:59.977Z",
          ...(avatar && { avatar: pictureUrl }),
        });
  
        const docId = docRef.id;
  
        await updateDoc(doc(collectionRef, docId), {
          docId: docId,
        });

        setTimeout(() => {
          navigate('/dashboard');
        }, 1000);
      }
    } catch (err: any) {
      console.error('Registration error:', err.message);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  };

  const signIn = async () => {
    setLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((response) => {
        const user = response.user;
        console.log(user);
        user.getIdToken()
          .then((accessToken) => {
            sessionStorage.setItem('Token', accessToken);
            setTimeout(() => {
              navigate('/dashboard');
            }, 1000);
          })
          .catch((error) => {
            console.error('getIdToken error', error);
          });
      })
      .catch((error) => {
        console.error('signIn error', error);
      })
      .finally(() => {
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      });
  };

  const handleGoogleSignUp = async (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
    setLoading(true);
    const provider = googleProvider;
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const docRef = await addDoc(collectionRef, {
        uid: user.uid,
        userName: userName,
        email: user.email,
        balance: 100,
        totalBets: 0,
        winBets: 0,
        historyBets: [],
        lastClaimedBonus: "2000-01-01T18:10:59.977Z",
        avatar: user.photoURL,
      });
      const docId = docRef.id;
      await updateDoc(doc(collectionRef, docId), { docId: docId });

      setTimeout(() => {
        navigate('/dashboard');
      }, 1000);
    } catch (err: any) {
      console.error('Google Sign In error:', err.message);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  };

  return (
    <AuthContext.Provider value={{ 
      userName, 
      email, 
      password, 
      avatar, 
      loading, 
      handleUsernameChange, 
      handleEmailChange, 
      handlePasswordChange, 
      handleAvatarChange, 
      handleSubmit,
      signIn,
      handleGoogleSignUp,
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  return useContext(AuthContext);
};
