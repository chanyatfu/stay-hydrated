import { Box, Text, useInput } from "ink";
import { useEffect, useState } from "react";
import { useCounter } from "./hooks/useCounter";
import Bottle from "./components/Bottle";

function App() {
	const [counter, setCounter] = useCounter();
  const [bottleCount, setBottleCount] = useState(0);

  useEffect(() => {
    if (counter < 0) {
      setBottleCount(bottleCount + 1)
      setCounter(100)
    }
  }, [counter, setCounter, bottleCount, setBottleCount])

  return (
    <Box flexDirection="row">
      {Array.from({ length: bottleCount }, (_, index) => <Bottle key={index} percent={0} />)}
      <Bottle percent={counter} />
    </Box>
  )
}

export default App;
