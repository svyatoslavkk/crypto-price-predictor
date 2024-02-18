import TopButtons from "../../components/topButtons/TopButtons";
import { User } from "../../types/types";
import { useUserContext } from "../../context/UserContext";
import RankItem from "../../components/util/RankItem";
import { RankItemLoadingUI } from "../../components/ui/loadingUI";

export default function Rankings() {
  const { loading, rankUsers } = useUserContext();

  const pageTitle = "Rankings";

  return (
    <div className="rankings">
      <TopButtons pageTitle={pageTitle} />
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