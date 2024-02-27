import { IAchievement } from "../../types/types";

export default function AchievementItem({ header, image, description, achieved }: IAchievement) {
  return (
    <div className="list-item" key={header} style={{ opacity: achieved ? 1 : 0.2 }}>
      <div className="flex-info">
        <img className="avg-sq-img" src={image} alt="Check Icon" />
        <div>
          <h3 className="small-header">{header}</h3>
          <span className="small-text">{description}</span>
        </div>
      </div>
    </div>
  )
}