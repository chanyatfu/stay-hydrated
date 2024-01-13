import { Box, Text } from "ink";
import { useEffect, useState } from "react";
import { useCounter } from "./hooks/useCounter";
import Bottle from "./components/Bottle";
import { getTotalVolume } from "./helpers/getTotalVolume";
import { getRandomItem } from "./helpers/getRandomItem";
import { waterQuotes } from "./water-quotes";
import getRemainingTimeForBottle from "./helpers/getRemainingTimeForBottle";

function App() {

	const [counter, setCounter] = useCounter();
  const [volumes, setVolumes] = useState<number[]>([]);
  const [currentVolume, setCurrentVolume] = useState(660);
  const [waterPerHours, setWaterPerHours] = useState(400);
  const [bottleStartTime, setBottleStartTime] = useState(Date.now())

  useEffect(() => {
    if (counter < 0) {
      setCounter(100)
      setVolumes(prev => [...prev, currentVolume])
      setBottleStartTime(Date.now())
    }
  }, [counter, setCounter])

  return (
    <Box flexDirection="column"
      borderStyle="round" borderColor="green"
      paddingX={4} paddingY={1} margin={1}
      rowGap={1}
    >
      <Box flexDirection="column">
        <Box borderStyle="classic" borderColor="green">
          <Text>The total amount of water you drink today is: {getTotalVolume(volumes)}</Text>
        </Box>
        <Box borderStyle="classic" borderColor="green">
          <Text>Finish the current bottle in: {getRemainingTimeForBottle(currentVolume * (counter/100), waterPerHours)}</Text>
        </Box>
      </Box>
      <Box flexDirection="row">
        {volumes.map((volume, index) =>
          <Bottle key={index} volume={volume} percent={0} />
        )}
        <Bottle percent={counter} volume={currentVolume} />
      </Box>
      <Box borderStyle="classic" borderColor="green">
        <Text>{getRandomItem(waterQuotes)}</Text>
      </Box>
    </Box>
  )
}

export default App;
