import WindowIcon from '@mui/icons-material/Window';
import BarChartIcon from '@mui/icons-material/BarChart';
import PersonIcon from '@mui/icons-material/Person';
import { Link, useLocation } from 'react-router-dom';

export default function SideBar() {
  const location = useLocation();
  return (
    <aside className="sidebar">
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
    </aside>
  )
}