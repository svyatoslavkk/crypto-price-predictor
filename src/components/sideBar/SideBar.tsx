import WindowIcon from '@mui/icons-material/Window';
import BarChartIcon from '@mui/icons-material/BarChart';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import { Link, useLocation } from 'react-router-dom';

export default function SideBar() {
  const location = useLocation();
  return (
    <aside className="sidebar">
      <div className="top-level">
        <div className="logo">
          <h2 className="large-header">B&B</h2>
        </div>
        <Link to="/dashboard" className={`icon ${location.pathname === '/dashboard' ? 'active-icon' : ''}`}>
          <WindowIcon />
          <span className="icon-text">Home</span>
        </Link>
        <Link to="/rankings" className={`icon ${location.pathname === '/rankings' ? 'active-icon' : ''}`}>
          <BarChartIcon />
          <span className="icon-text">Rankings</span>
        </Link>
        <Link to="/profile" className={`icon ${location.pathname === '/profile' ? 'active-icon' : ''}`}>
          <PersonIcon />
          <span className="icon-text">Profile</span>
        </Link>
      </div>
      <div className="bottom-level">
        <div className="icon">
          <LogoutIcon />
          <span className="icon-text">Logout</span>
        </div>
      </div>
    </aside>
  )
}