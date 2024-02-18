import { Link } from 'react-router-dom';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import { useUserContext } from '../../context/UserContext';
import { fakeImg } from '../../constants/constants';

export default function PanelProfileMain() {
  const { myData } = useUserContext();

  return (
    <div className="panel-main">
      {myData && (
        <img src={myData.avatar ? myData.avatar : fakeImg} className="panel-sq-img" alt="Profile Image" />
      )}
      <div className="panel-darken"></div>
      <div className="panel-username">
        {myData && (
          <span className="medium-text">{myData.userName ? myData.userName : 'NO_AUTH'}</span>
        )}
        <Link to="/profile">
          <button className="sq-btn">
            <ArrowOutwardIcon />
          </button>
        </Link>
      </div>
    </div>
  )
}