import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import { useMediaQuery } from '@mui/material';
import { User } from '../../types/types';
import { TopPlayersSliderLoadingUI } from '../ui/loadingUI';
import { useUserContext } from '../../context/UserContext';

export default function TopPlayersSlider() {
  const { rankUsers, loading } = useUserContext();
  
  if (loading) {
    return TopPlayersSliderLoadingUI;
  }

  const isSmallScreen = useMediaQuery('(max-width:999px)');
  const isExtraSmallScreen = useMediaQuery('(max-width:400px)');

  const splideOptions = isExtraSmallScreen 
      ? {
        perPage: 2,
        perMove: 1,
        rewind : true,
        height: '7.4rem',
        pagination: false,
        gap    : '0.5rem',
      }
    : isSmallScreen 
        ? {
          perPage: 3,
          perMove: 1,
          rewind : true,
          height: '7.4rem',
          pagination: false,
          gap    : '0.5rem',
        }
      : {
        perPage: 4,
        perMove: 1,
        rewind : true,
        height: '7.4rem',
        pagination: false,
        gap    : '0.5rem',
      };

  return(
    <section className="list-column">
      <div className="header-section">
        <h3 className="small-header">Top Players</h3>
        <div></div>
      </div>
      <Splide
        options={ splideOptions }
        aria-labelledby="basic-example-heading"
      >
        {rankUsers.map((user: User) => (
          <SplideSlide key={user.uid}>
            <div className="chart-item">
              <div className="visual-info">
                <img className="large-sq-img" src={user.avatar} alt="Profile Image" />
                <div className="position-item">
                  <span className="small-text" style={{color: '#050505', fontWeight: 700}}>{user.rank}</span>
                </div>
              </div>
              <h3 className="small-header">{user.userName}</h3>
              <span className="small-text">${user.balance}</span>
            </div>
          </SplideSlide>
        ))}
      </Splide>
    </section>
  )
}
