import './index.scss';
import WelcomePage from './pages/welcomePage/welcomePage';
import SignUp from './pages/signUp/signUp';
import Login from './pages/login/Login';
import Dashboard from './pages/dashboard/Dashboard';
import Rankings from './pages/rankings/Rankings';
import Profile from './pages/profile/Profile';
import News from './pages/news/News';
import CountdownTimer from './components/countdownTimer/CountdownTimer';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { UserProvider } from './context/UserContext';

function App() {

  return (
    <Provider store={store}>
      <BrowserRouter>
        <UserProvider>
          <Routes>
            <Route path="/welcome" element={<WelcomePage />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/rankings" element={<Rankings />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/test" element={<CountdownTimer />} />
            <Route path="/news" element={<News />} />
          </Routes>
        </UserProvider>
      </BrowserRouter>
    </Provider>
  )
}

export default App
