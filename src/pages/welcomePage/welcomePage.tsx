import illustration from '../../assets/kerfin7_nea_2777.png';

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
      <button className="classic-button">Get Started</button>
    </div>
  )
}