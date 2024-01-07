import { achievements } from '../../utils/achievements';
import { useState } from 'react';
import DevLoader from '../loaders/devLoader/DevLoader';

export default function ProfileInfo() {
  const [activeButton, setActiveButton] = useState("Achievements");

  return (
    <div className="profile-info">
      <div className="buttons">
        <button
          className={`full-btn ${activeButton === "Achievements" ? "active" : ""}`}
          onClick={() => setActiveButton("Achievements")}
        >
          <span>Achievements</span>
        </button>
        <button
          className={`full-btn ${activeButton === "History" ? "active" : ""}`}
          onClick={() => setActiveButton("History")}
        >
          <span>History</span>
        </button>
      </div>
      <div className="list-column">
        {activeButton === "Achievements" && (
          <>
            {achievements.map((item) => (
              <div className="list-item" key={item.header} style={{ opacity: item.achieved ? 1 : 0.5 }}>
                <img className="small-sq-img" src={item.image} alt="Check Icon" />
                <div>
                  <h3 className="small-header">{item.header}</h3>
                  <span className="small-text">{item.description}</span>
                </div>
              </div>
            ))}
          </>
        )}
        {activeButton === "History" && (
          <>
            <DevLoader />
          </>
        )}
      </div>
    </div>
  )
}