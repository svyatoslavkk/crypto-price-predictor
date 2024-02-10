import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import SimpleLoader from '../loaders/simpleLoader/SimpleLoader';
import TollIcon from '@mui/icons-material/Toll';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';

export const coinsRowLoadingUI = (
  <div className="list-column">
    <div className="header-section">
      <h3 className="small-header">Coins</h3>
      <div></div>
    </div>
    <Splide 
      options={ {
        perPage: 3,
        perMove: 1,
        rewind : true,
        height: '7.6rem',
        pagination: false,
        gap    : '0.5rem',
      } }
      aria-labelledby="basic-example-heading"
    >
      {Array.from({ length: 3 }, (_, index) => (
        <SplideSlide>
          <div key={index} className="mini-window-loading">
            <div className="card__image"></div>
          </div>
        </SplideSlide>
      ))}
    </Splide>
  </div>
);

export const modernBalanceLoadingUI = (
  <section className="modern-balance" style={{backgroundColor: '#22222288'}}>
    <SimpleLoader />
    <div className="flex-info" style={{opacity: 0}}>
      <h3 className="small-text">Your Balance</h3>
      <TollIcon fontSize="small" sx={{ color: '#fff' }} />
    </div>
    <div className="balance" style={{opacity: 0}}>
      <p className="two-diff-texts"><h2 className="text-style-one">$0</h2><span className="medium-text" style={{marginBottom: 4}}>.00</span></p>
    </div>
  </section>
);

export const newsSectionLoadingUI = Array.from({ length: 3 }, (_, index) => (
  <div key={index} className="list-item">
    <SimpleLoader />
    <img className="large-sq-img" alt="Article Image" style={{opacity: 0}} />
    <div className="text-items-column" style={{opacity: 0}}>
      <h3 className="small-header">Title</h3>
    </div>
  </div>
));

export const newsSlideLoadingUI = (
  <section className="news-slide">
    <div className="header-section">
      <h3 className="small-header">News</h3>
      <button className="transparent-btn">
        More
      </button>
    </div>
    <Splide 
      options={ {
        type: 'loop',
        perPage: 1,
        perMove: 1,
        rewind : true,
        height: '14.5rem',
        pagination: true,
        gap    : '0.5rem',
      } }
      aria-labelledby="basic-example-heading"
    >
      {Array.from({ length: 3 }, (_, index) => (
        <SplideSlide>
          <div key={index} className="news-slide-item-loading">
            <div className="card__image"></div>
          </div>
        </SplideSlide>
      ))}
    </Splide>
  </section>
);

export const profilePanelLoadingUI = (
  <div className="panel-info">
    <div className="panel-main">
      <div className="panel-main-loading">
        <div className="card__image"></div>
      </div>
      <img className="panel-sq-img" alt="Profile Image" style={{opacity: 0}} />
      <div className="panel-username" style={{opacity: 0}}>
        <span className="medium-text">NO_AUTH</span>
        <button className="sq-btn">
          <ArrowOutwardIcon />
        </button>
      </div>
    </div>
    <div className="panel-rank">
      <div className="panel-main-loading">
        <div className="card__image"></div>
      </div>
      <span className="small-text" style={{opacity: 0}}>Rank</span>
      <div className="panel-ring" style={{opacity: 0}}>
        <span className="extra-large-text">#1</span>
      </div>
    </div>
  </div>
);

export const TopPlayersSliderLoadingUI = (
  <section className="list-column">
    <div className="header-section">
      <h3 className="small-header">Top Players</h3>
      <div></div>
    </div>
    <Splide
      options={ {
        perPage: 4,
        perMove: 1,
        rewind : true,
        height: '7.4rem',
        pagination: false,
        gap    : '0.5rem',
      } }
      aria-labelledby="basic-example-heading"
    >
      {[...Array(7)].map((_, index) => (
        <SplideSlide key={index}>
          <div className="chart-item-loading">
            <div className="large-sq-img"></div>
            <span className="mid-line"></span>
            <span className="small-line"></span>
          </div>
        </SplideSlide>
      ))}
    </Splide>
  </section>
);