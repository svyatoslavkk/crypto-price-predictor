import LogoutIcon from '@mui/icons-material/Logout';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';

export default function TopButtons() {
  return (
    <div className="top-buttons">
      <button className="small-circle-button">
        <KeyboardArrowLeftIcon fontSize="medium" />
      </button>
      <button className="small-circle-button">
        <LogoutIcon fontSize="small" />
      </button>
    </div>
  )
}