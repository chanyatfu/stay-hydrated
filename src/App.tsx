import { useEffect, useState } from "react";
import { useInput } from "./hooks/useInput";
import MainPage from "./page/MainPage";
import WelcomePage from "./page/WelcomePage";
import { useRouter } from "./contexts/router-context";
import Layout from "./page/layout";
import { Box } from "ink";
import SettingPage from "./page/SettingPage";
import HistoryPage from "./page/HistoryPage";
import { useStore } from "./stores/root-store";
import { ringBell } from "./helpers/ringBell";
import { useEventHandler } from "./hooks/useEventHandler";
import TipsPage from "./page/TipsPage";

function App() {

  const { currentPath, setCurrentPath } = useRouter()
  const { store, storeDispatch } = useStore()
  const { volumes, maxVolume, remainingVolume, waterPerHours, isSettingVolume } = store

  useEventHandler()

  switch (currentPath) {
    case 'welcome':
      return (
        <Layout justifyContent="center" alignItems="center">
          <WelcomePage />
        </Layout>
      )
    case 'water':
      return <Layout><MainPage /></Layout>
    case 'history':
      return <Layout><HistoryPage /></Layout>
    case 'settings':
      return <Layout><SettingPage /></Layout>
    case 'tips':
      return <Layout><TipsPage /></Layout>

  }

}

export default App;
