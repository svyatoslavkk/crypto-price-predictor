import TopButtons from "../../components/topButtons/TopButtons";
import { User } from "../../types/types";
import { useUserContext } from "../../context/UserContext";
import RankItem from "../../components/util/RankItem";
import { RankItemLoadingUI } from "../../components/ui/loadingUI";
import { RANKINGS_TITLE } from "../../constants/constants";

export default function Rankings() {
  const { loading, rankUsers } = useUserContext();

  return (
    <div className="rankings">
      <TopButtons pageTitle={RANKINGS_TITLE} />
      <ul className="list-column">
        {loading ? (
          <RankItemLoadingUI />
        ) : (
          <>
            {rankUsers.map((user: User) => (
              <RankItem 
                uid={user.uid}
                avatar={user.avatar}
                userName={user.userName}
                rank={user.rank}
                balance={user.balance}
              />
            ))}
          </>
        )}
      </ul>
    </div>
  )
}