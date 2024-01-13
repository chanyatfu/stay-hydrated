import { Box, Text } from "ink";
import { useEffect, useState } from "react";
import { useCounter } from "./hooks/useCounter";
import Bottle from "./components/Bottle";
import { getTotalVolume } from "./helpers/getTotalVolume";
import { getRandomItem } from "./helpers/getRandomItem";
import { waterQuotes } from "./water-quotes";
import getRemainingTimeForBottle from "./helpers/getRemainingTimeForBottle";
import { formatNumberToLiter } from "./helpers/formatNumberToLiter";
import { useInput } from "./hooks/useInput";
import { ringBell } from "./helpers/ringBell";

function App() {

  const [volumes, setVolumes] = useState<number[]>([]);
  const [maxVolume, setMaxVolume] = useState(660);
  const [remainingVolume, setRemainingVolume] = useState(660)
  const [waterPerHours, setWaterPerHours] = useState(400);
  const [isInputActive, setIsInputActive] = useState(false);
  const [isSettingVolume, setIsSettingVolume] = useState(false);

  useEffect(() => {
		const interval = setInterval(() => {
      if (isSettingVolume) {
        return
      }
      if (remainingVolume >= 0) {
        setRemainingVolume(prev => prev - 1)
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
    switch(chunk) {
      case '\x1b[A':  // up arrow
        if (remainingVolume + 10 > maxVolume) {
          ringBell()
        }
        setRemainingVolume(prev => Math.min(maxVolume, prev + 10))
        break;
      case '\x1b[B': // down arrow
        if (remainingVolume - 10 < 0) {
          ringBell()
        }
        setRemainingVolume(prev => Math.max(0, prev - 10))
        break;
      case '\r':
      case '\n':
      case '\r\n':
        if (remainingVolume > 0) {
          setIsSettingVolume(false)
        } else {
          setRemainingVolume(maxVolume)
          setVolumes(prev => [...prev, maxVolume])
          setIsSettingVolume(false)
        }
        break;
      default:
        break;
    }
  }, [maxVolume, remainingVolume, isSettingVolume])


  useEffect(() => {
    if (remainingVolume <= 0 && !isSettingVolume) {
      setIsSettingVolume(true);
    }
  }, [remainingVolume])

  return (
    <Box flexDirection="column"
      borderStyle="round" borderColor="green"
      paddingX={4} paddingY={1} margin={1}
      rowGap={1}
    >
      <Box flexDirection="column">
        <Box borderStyle="classic" borderColor="green">
          {isSettingVolume ?
            <Text>Set the volume of your bottle: {formatNumberToLiter(remainingVolume)}</Text>
            :
            <Text>The total amount of water you drink today is:
              {formatNumberToLiter(getTotalVolume(volumes) + (maxVolume - remainingVolume))}
            </Text>
          }
        </Box>
        <Box borderStyle="classic" borderColor="green">
          {isSettingVolume ?
            <Text>Did you drink all your water? use Up/down arrow to adjust the remaining volume and space to confirm</Text>
            :
            <Text>Finish the current bottle in: {getRemainingTimeForBottle(remainingVolume, waterPerHours)}</Text>
          }
        </Box>
      </Box>
      <Box flexDirection="row">
        {volumes.map((volume, index) =>
          <Bottle key={index} volume={volume} percent={0} />
        )}
        <Bottle percent={remainingVolume / maxVolume} volume={maxVolume} />
      </Box>
      <Box borderStyle="classic" borderColor="green">
        <Text>{getRandomItem(waterQuotes)}</Text>
      </Box>
    </Box>
  )
}

export default App;
