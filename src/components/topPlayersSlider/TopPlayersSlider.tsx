import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import { useMediaQuery } from '@mui/material';
import { User } from '../../types/types';
import { TopPlayersSliderLoadingUI } from '../ui/loadingUI';
import { useUserContext } from '../../context/UserContext';
import SquareSnippetItem from '../shared-components/SquareSnippetItem';
import HeaderSection from '../shared-components/HeaderSection';
import { TOP_PLAYERS_TITLE } from '../../constants/constants';

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
      <HeaderSection title={TOP_PLAYERS_TITLE} />
      <Splide
        options={ splideOptions }
        aria-labelledby="basic-example-heading"
      >
        {rankUsers.map((user: User) => (
          <SplideSlide key={user.uid}>
            <SquareSnippetItem 
              image={user.avatar}
              pretitle={user.rank}
              title={user.userName}
              text={user.balance}
            />
          </SplideSlide>
        ))}
      </Splide>
    </section>
  )
}
