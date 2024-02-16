import questionIcon from '../../assets/question-icon.png';
import buyBtcIcon from '../../assets/Bitcoin Buy-2.png';
import miningIcon from '../../assets/Mining Bitcoin-1.png';
import btcIcon from '../../assets/Bitcoin-1.png';
import safeIcon from '../../assets/Safe-1.png';
import tick from '../../assets/Tick-3.png';
import { useState } from 'react';
import DevLoader from '../loaders/devLoader/DevLoader';
import { useUserContext } from '../../context/UserContext';
import { IBetDetails } from '../../types/types';
import InfiniteScroll from 'react-infinite-scroll-component';
import HistoryBetItem from '../util/HistoryBetItem/HistoryBetItem';
import AchievementItem from '../util/AchievementItem/AchievementItem';

export default function ProfileInfo() {
  const { myData } = useUserContext();
  const [activeButton, setActiveButton] = useState("Achievements");
  const [visibleBets, setVisibleBets] = useState(10);
  const currentHistoryBets = myData?.historyBets;
  const currentHistoryBetsCopy = [...currentHistoryBets || []];
  const reversedHistory = currentHistoryBetsCopy;
  console.log("reversedHistory", reversedHistory)

  const winTotal = myData?.winBets || 0;

  const checkWinSeries = (history: BetDetails[], winsNeeded: number) => {
    let consecutiveWins = 0;
    for (const bet of history) {
      if (bet.result === 'win') {
        consecutiveWins++;
        if (consecutiveWins === winsNeeded) {
          return true;
        }
      } else {
        consecutiveWins = 0
      }
    }
    return false;
  }
  
  const achievements = [
    {
      image: winTotal > 0 ? tick : questionIcon,
      header: "Novice Trader",
      description: "Make your first successful prediction.",
      achieved: winTotal > 0 ? true : false,
    },
    {
      image: checkWinSeries(reversedHistory, 3) ? buyBtcIcon : questionIcon,
      header: "Accurate Forecast",
      description: "Successfully predict 3 times in a row.",
      achieved: checkWinSeries(reversedHistory, 3),
    },
    {
      image: checkWinSeries(reversedHistory, 6) ? miningIcon : questionIcon,
      header: "Master of Trends",
      description: "Successfully predict 6 times in a row.",
      achieved: checkWinSeries(reversedHistory, 6),
    },
    {
      image: checkWinSeries(reversedHistory, 9) ? btcIcon : questionIcon,
      header: "Relentless Predictor",
      description: "Successfully predict 9 times in a row.",
      achieved: checkWinSeries(reversedHistory, 9),
    },
    {
      image: checkWinSeries(reversedHistory, 9) ? safeIcon : questionIcon,
      header: "Best of the Best",
      description: "Successfully predict 12 times in a row.",
      achieved: checkWinSeries(reversedHistory, 12),
    },
  ];

  const handleLoadMore = () => {
    setVisibleBets((prev) => prev + 10);
  };

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
            {achievements.map((item) => {
              return (
                <AchievementItem 
                  header={item.header}
                  image={item.image}
                  description={item.description}
                  achieved={item.achieved}
                />
              );
            })}
          </>
        )}
      </div>
      <div className="list-column">
      {activeButton === "History" && (
        <>
          {reversedHistory.length > 0 ? (
            <div className="history-bet-column">
            {reversedHistory.map((bet: IBetDetails) => (
              <HistoryBetItem 
                openTime={bet.openTime}
                direction={bet.direction}
                openPrice={bet.openPrice}
                closePrice={bet.closePrice}
                result={bet.result}
              />
            ))}
              <button className="sq-btn" onClick={handleLoadMore}>
                <h3 className="small-header">More</h3>
              </button>
            </div>
          ) : (
            <DevLoader />
          )}
        </>
      )}
      </div>
    </div>
  )
}