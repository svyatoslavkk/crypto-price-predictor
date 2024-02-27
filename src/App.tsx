import './index.scss';
import WelcomePage from './pages/welcomePage/welcomePage';
import SignUp from './pages/signUp/signUp';
import Login from './pages/login/Login';
import Dashboard from './pages/dashboard/Dashboard';
import Rankings from './pages/rankings/Rankings';
import Profile from './pages/profile/Profile';
import News from './pages/news/News';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { UserProvider } from './context/UserContext';
import RootLayout from './_root/RootLayout';
import { BetProvider } from './context/BetContext';
import { AuthProvider } from './context/AuthContext';

function App() {

  return (
    <Provider store={store}>
      <BrowserRouter>
        <AuthProvider>
          <UserProvider>
            <BetProvider>
              <Routes>
                <Route path="/welcome" element={<WelcomePage />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/login" element={<Login />} />

                <Route element={<RootLayout />}>
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/rankings" element={<Rankings />} />
                  <Route path="/news" element={<News />} />
                </Route>
                
                <Route path="/profile" element={<Profile />} />
              </Routes>
            </BetProvider>
          </UserProvider>
        </AuthProvider>
      </BrowserRouter>
    </Provider>
  )
}

export default App
