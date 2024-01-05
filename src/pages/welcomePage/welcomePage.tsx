import illustration from '../../assets/kerfin7_nea_2777.png';
import { Link } from 'react-router-dom';

export default function WelcomePage() {
  return (
    <div className="container">
      <div>
        <img className="illustration-img" src={illustration} alt="Illustration" />
      </div>
      <div className="header-content">
        <h1 className="header-text">BULL&BEAR</h1>
        <h1 className="header-text">PREDICTION</h1>
      </div>
      <Link to="/signup" className="classic-button">
        Get Started
      </Link>
    </div>
  )
}