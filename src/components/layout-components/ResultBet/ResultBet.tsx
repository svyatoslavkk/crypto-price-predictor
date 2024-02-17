import { IResultBet } from "../../../types/types";
import winEmoji from "../../../assets/winEmoji.png";
import loseEmoji from "../../../assets/loseEmoji.png";

export default function ResultBet({ countdown, isBetResultShown, betStatus }: IResultBet) {
  return (
    <div className={`active-bet ${(countdown <= 0 && isBetResultShown) ? 'active-status-bet' : ''}`} style={{ justifyContent: "center" }}>
      {betStatus === 'win' ? (
        <img src={winEmoji} className="small-circle-img" alt="Emoji Status" />
      ) : (
        <img src={loseEmoji} className="small-circle-img" alt="Emoji Status" />
      )}
      <h3 className="large-header" style={{color: betStatus === 'win' ? '#0cff41' : '#ff5e5e'}}>
        {betStatus === 'win' ? 'YOU WIN!' : 'TRY AGAIN'}
      </h3>
    </div>
  )
}