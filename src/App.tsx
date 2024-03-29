import MainPage from "./page/MainPage";
import WelcomePage from "./page/WelcomePage";
import { useRouter } from "./contexts/router-context";
import Layout from "./page/layout";
import SettingPage from "./page/SettingPage";
import HistoryPage from "./page/HistoryPage";
import { useEventHandler } from "./hooks/useEventHandler";
import TipsPage from "./page/TipsPage";
import AppInfoPage from "./page/AppInfoPage";
import { useNotification } from "./hooks/useAlarm";
import { useReloadWhenDayPass } from "hooks/useReloadWhenDayPass";

function App() {
  const { currentPath } = useRouter();

  useEventHandler();
  useNotification();
  // useReloadWhenDayPass();

  switch (currentPath) {
    case "welcome":
      return (
        <Layout justifyContent="center" alignItems="center">
          <WelcomePage />
        </Layout>
      );
    case "water":
      return (
        <Layout>
          <MainPage />
        </Layout>
      );
    case "history":
      return (
        <Layout>
          <HistoryPage />
        </Layout>
      );
    case "settings":
      return (
        <Layout>
          <SettingPage />
        </Layout>
      );
    case "tips":
      return (
        <Layout>
          <TipsPage />
        </Layout>
      );
    case "appinfo":
      return (
        <Layout>
          <AppInfoPage />
        </Layout>
      );
  }
}

export default App;
