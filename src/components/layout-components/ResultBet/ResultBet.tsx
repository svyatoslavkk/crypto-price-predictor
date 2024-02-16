import { IResultBet } from "../../../types/types";

export default function ResultBet({ countdown, isBetResultShown, betStatus }: IResultBet) {
  return (
    <div className={`active-bet ${(countdown <= 0 && isBetResultShown) ? 'active-status-bet' : ''}`}>
      <h3 className="large-header" style={{color: betStatus === 'win' ? '#0cff41' : '#ff5e5e'}}>
        {betStatus === 'win' ? 'YOU WIN!' : 'TRY AGAIN'}
      </h3>
    </div>
  )
}