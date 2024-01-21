import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';

export default function ModernWinrate({ myWinrate }: { myWinrate: number }) {
  const progressWidth = `${myWinrate}%`;

  return (
    <section className="modern-winrate">
      <div className="flex-info">
        <h3 className="small-text">Your Winrate</h3>
        <EmojiEventsIcon fontSize="small" sx={{ color: '#fff' }} />
      </div>
      <div className="modern-progress">
        <span className="progress-winrate">
          <span className="medium-header">{myWinrate.toFixed(0)}%</span>
        </span>
        <div className="modern-progress-value" style={{ width: progressWidth }}></div>
      </div>
    </section>
  )
}