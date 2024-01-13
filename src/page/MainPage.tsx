import { useEffect, useMemo, useState } from "react";
import { getRandomItem } from "../helpers/getRandomItem";
import { waterQuotes } from "../water-quotes";
import { useInput } from "../hooks/useInput";
import { ringBell } from "../helpers/ringBell";
import { Box, Text } from "ink";
import { formatNumberToLiter } from "../helpers/formatNumberToLiter";
import { getTotalVolume } from "../helpers/getTotalVolume";
import getRemainingTimeForBottle from "../helpers/getRemainingTimeForBottle";
import Bottle from "../components/Bottle";
import Layout from "./layout";

export default function MainPage() {
  const quote = useMemo(() => getRandomItem(waterQuotes), []);

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

    const changeAmount = 20
    switch(chunk) {
      case '\x1b[A':  // up arrow
        if (remainingVolume + changeAmount > maxVolume) {
          ringBell()
        }
        setRemainingVolume(prev => Math.min(maxVolume, prev + changeAmount))
        break;
      case '\x1b[B': // down arrow
        if (remainingVolume - changeAmount < 0) {
          ringBell()
        }
        setRemainingVolume(prev => Math.max(0, prev - changeAmount))
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
    <Layout>
      <Box flexDirection="column">
        <Box borderStyle="classic" borderColor="green">
          {isSettingVolume ?
            <Text>Set the remaining volume: {formatNumberToLiter(remainingVolume)}</Text>
            :
            <Text>The total amount of water you drink today is {formatNumberToLiter(getTotalVolume(volumes) + (maxVolume - remainingVolume))}
            </Text>
          }
        </Box>
        <Box borderStyle="classic" borderColor="green">
          {isSettingVolume ?
            <Text>Adjust remaining water volume with Up/Down arrows, and press Enter to confirm.</Text>
            :
            <Text>Finish the current bottle in {getRemainingTimeForBottle(remainingVolume, waterPerHours)}</Text>
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
        <Text>{quote}</Text>
      </Box>
    </Layout>
  )
}