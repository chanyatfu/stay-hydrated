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

function App() {

  const { currentPath, setCurrentPath } = useRouter()
  const { store, storeDispatch } = useStore()
  const { volumes, maxVolume, remainingVolume, waterPerHours, isSettingVolume } = store

  useEffect(() => {
		const interval = setInterval(() => {
      if (isSettingVolume) {
        return
      }
      if (remainingVolume >= 0) {
        storeDispatch({ type: "SET_REMAINING_VOLUME", payload: remainingVolume - 1 })
      }

    }, 1)

		return () => {
			clearInterval(interval);
		};
	}, [remainingVolume, isSettingVolume]);



  useInput((chunk: string) => {
    if (chunk === '\u0003') { // Ctrl+C
      process.exit();
    }
    if (!isSettingVolume) {
      return
    }

    const changeAmount = 20
    switch(chunk) {
      case '\x1b[A':  // up arrow
        if (remainingVolume + changeAmount > maxVolume) {
          ringBell()
        }
        storeDispatch({ type: "SET_REMAINING_VOLUME", payload: Math.min(maxVolume, remainingVolume + changeAmount) })
        break;
      case '\x1b[B': // down arrow
        if (store.remainingVolume - changeAmount < 0) {
          ringBell()
        }
        storeDispatch({ type: "SET_REMAINING_VOLUME", payload: Math.max(0, remainingVolume - changeAmount) })
        break;
      case '\r':
      case '\n':
      case '\r\n':
        if (remainingVolume > 0) {
          storeDispatch({ type: "SET_IS_SETTING_VOLUME", payload: false })
        } else {
          storeDispatch({ type: "SET_REMAINING_VOLUME", payload: maxVolume })
          storeDispatch({ type: "ADD_BOTTLE", payload: maxVolume })
          storeDispatch({ type: "SET_IS_SETTING_VOLUME", payload: false })
        }
        break;
      default:
        break;
    }
  }, [maxVolume, remainingVolume, isSettingVolume])


  useEffect(() => {
    if (remainingVolume <= 0 && !isSettingVolume) {
      storeDispatch({ type: "SET_IS_SETTING_VOLUME", payload: true })
    }
  }, [remainingVolume])

  useInput((chunk: string) => {
    if (currentPath === 'welcome') {
      if (chunk === '\u0003') { // Ctrl+C
        process.exit();
      } else {
        setCurrentPath('water');
      }
    }
  }, [])

  useInput((chunk: string) => {
    switch (chunk) {
      case '1': {
        setCurrentPath('water')
        break;
      }
      case '2': {
        setCurrentPath('history')
        break;
      }
      case '3': {
        setCurrentPath('settings')
        break;
      }
    }
  }, [])

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

  }

}

export default App;
