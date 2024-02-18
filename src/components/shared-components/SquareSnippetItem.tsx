import { SquareSnippetItemProps } from "../../types/interfaces";

export default function SquareSnippetItem({ image, pretitle, title, text }: SquareSnippetItemProps) {
  return (
    <div className="chart-item">
      <div className="visual-info">
        <img className="large-sq-img" src={image} alt="Profile Image" />
        <div className="position-item">
          <span className="small-text" style={{color: '#050505', fontWeight: 700}}>{pretitle}</span>
        </div>
      </div>
      <h3 className="small-header">{title}</h3>
      <span className="small-text">${text}</span>
    </div>
  )
}