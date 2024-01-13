import { useState } from "react";
import { useInput } from "./hooks/useInput";
import MainPage from "./page/MainPage";
import WelcomePage from "./page/WelcomePage";

function App() {

  const [isWelcomePage, setIsWelcomePage] = useState(true)

  useInput((chunk: string) => {
    setIsWelcomePage(false);
  }, [])

  if (isWelcomePage) {
    return <WelcomePage />
  }

  return (
    <MainPage />
  )
}

export default App;
