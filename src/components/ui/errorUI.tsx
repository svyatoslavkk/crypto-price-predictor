import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const coinsRowErrorImg = 'https://cdn.gobankingrates.com/wp-content/uploads/2018/03/bitcoin-ethereum-cryptocurrency-taxes-blockchain-iStock-886921308.jpg';

const newsSectionErrorImg = 'https://play-lh.googleusercontent.com/jGpj_gR6iUi1FqHZ8w__2G0zonoONbRYkYIgARnKpOtKL7we9d213Bvn6AOUMF5WVgOV=w240-h480-rw';

export const coinsRowErrorUI = (
  <div className="mini-window">
    <div className="error-content">
      <h3 className="medium-header">404</h3>
      <p className="small-text">Sorry. The data is broken. Please try again later.</p>
    </div>
    <div className="error-bg-block">
      <img src={coinsRowErrorImg} className="error-bg-img" alt="Error Image" />
    </div>
    <div className="flex-info" style={{ opacity: 0 }}>
      <img className="small-circle-img" alt="Coin" />
      <div className="text-items-column">
        <h3 className="small-header">Bitcoin</h3>
        <span className="small-text">BTC</span>
      </div>
    </div>
    <div className="flex-info" style={{ opacity: 0 }}>
      <span className="medium-text">$45090</span>
      <div className={`percentage-progress`}>
        <KeyboardArrowDownIcon fontSize='small' />
        <span>1%</span>
      </div>
    </div>
  </div>
);

export const newsSectionErrorUI = Array.from({ length: 3 }, (_, index) => (
  <div key={index} className="list-item">
    <h3 className="small-header">Error fetching crypto news. Try later.</h3>
    <img src={newsSectionErrorImg} className="large-sq-img" alt="Article Image" style={{opacity: 0}} />
    <div className="text-items-column" style={{opacity: 0}}>
      <h3 className="small-header">Title</h3>
    </div>
  </div>
));