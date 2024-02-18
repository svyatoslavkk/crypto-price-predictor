import { useBetContext } from "../../context/BetContext";
import winEmoji from "../../assets/winEmoji.png";
import loseEmoji from "../../assets/loseEmoji.png";

export default function DesktopResultBet() {
  const { countdown, isBetResultShown, setIsBetResultShown, betStatus } = useBetContext();

  const isBetResultShownMakeItFalse = () => {
    setIsBetResultShown(false);
  }

  return (
    <div className={`fixed-overlay ${(countdown <= 0 && isBetResultShown) ? 'active-status-bet' : ''}`} onClick={isBetResultShownMakeItFalse}>
      <div className={`result-bet-modal ${(countdown <= 0 && isBetResultShown) ? 'active-status-bet' : 'active-status-bet'}`}>
        <div className="column-center">
          {betStatus === 'win' ? (
            <img src={winEmoji} className="emoji-img" alt="Emoji Status" />
          ) : (
            <img src={loseEmoji} className="emoji-img" alt="Emoji Status" />
          )}
          <h3 className="large-header" style={{color: betStatus === 'win' ? '#0cff41' : '#ff5e5e'}}>
            {betStatus === 'win' ? 'YOU WIN!' : 'TRY AGAIN'}
          </h3>
        </div>
        <button className="neutral-btn" onClick={isBetResultShownMakeItFalse}>
          <span className="small-header">Close</span>
        </button>
        {(countdown <= 0 && isBetResultShown) && <div className="timer-line"></div>}
      </div>
    </div>
  )
}