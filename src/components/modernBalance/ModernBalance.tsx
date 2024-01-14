import InfoIcon from '@mui/icons-material/Info';

export default function ModernBalance({ userBalance }) {
  return (
    <section className="modern-balance">
      <div className="flex-info">
        <h3 className="small-text">Your Balance</h3>
        <InfoIcon fontSize="small" sx={{ color: '#fff' }} />
      </div>
      <div className="balance">
        <p className="two-diff-texts"><h2 className="text-style-one">${userBalance}</h2><span className="medium-text" style={{marginBottom: 4}}>.00</span></p>
      </div>
    </section>
  )
}