import HeaderPanel from '../headerPanel/HeaderPanel';
import ModernBalance from '../modernBalance/ModernBalance';
import ModernWinrate from '../modernWinrate/ModernWinrate';
import { useUserContext } from '../../context/UserContext';
import { profilePanelLoadingUI } from '../ui/loadingUI';
import DesktopActiveBet from '../layout-components/DesktopActiveBet';
import DesktopResultBet from '../layout-components/DesktopResultBet';
import PanelRank from '../shared-components/PanelRank';
import PanelProfileMain from '../shared-components/PanelProfileMain';

export default function ProfilePanel() {
  const { myData, loading } = useUserContext();
  const myWinrate = myData ? (myData.winBets / myData.totalBets) * 100 : 0;

  return (
    <section className="profile-panel">
      <HeaderPanel />
      {loading && profilePanelLoadingUI}
      {!loading && (
      <div className="panel-info">
        <PanelProfileMain />
        <PanelRank />
      </div>
      )}
      <ModernBalance />
      <ModernWinrate myWinrate={myWinrate} />
      <DesktopActiveBet />
      <DesktopResultBet />
    </section>
  )
}
