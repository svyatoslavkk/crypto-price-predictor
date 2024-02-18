import { useUserContext } from "../../context/UserContext";

export default function PanelRank() {
  const { user, rankUsers } = useUserContext();
  const myCurrRank = rankUsers
  .filter((data) => data.uid === user?.uid)
  .map((data) => data.rank)[0];

  return (
    <div className="panel-rank">
      <span className="small-text">Rank</span>
      <div className="panel-ring">
        <span className="extra-large-text">#{myCurrRank}</span>
      </div>
    </div>
  )
}