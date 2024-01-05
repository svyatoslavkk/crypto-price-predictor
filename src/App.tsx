import './index.scss';
import WelcomePage from './pages/welcomePage/welcomePage';
import SignUp from './pages/signUp/signUp';
import Login from './pages/login/Login';
import Dashboard from './pages/dashboard/Dashboard';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/welcome" element={<WelcomePage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
