import { useState } from "react";
import { useInput } from "./hooks/useInput";
import MainPage from "./page/MainPage";
import WelcomePage from "./page/WelcomePage";
import { useRouter } from "./contexts/router-context";
import Layout from "./page/layout";
import { Box } from "ink";
import SettingPage from "./page/SettingPage";

function App() {

  const { currentPath, setCurrentPath } = useRouter()

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
      case '1':
      case '\x1b[11~': // F1
      case '\x1bOP': {
        setCurrentPath('water')
        break;
      }
      case '2':
      case '\x1b[12~': // F2
      case '\x1bOQ': {
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
    case 'settings':
      return <Layout><SettingPage /></Layout>
  }


}

export default App;
