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
import { useStore } from "../stores/root-store";

export default function MainPage() {
  const quote = useMemo(() => getRandomItem(waterQuotes), []);

  const { store, storeDispatch } = useStore()
  const { volumes, maxVolume, remainingVolume, waterPerHours, isSettingVolume } = store

  // const [volumes, setVolumes] = useState<number[]>([]);
  // const [maxVolume, setMaxVolume] = useState(660);
  // const [remainingVolume, setRemainingVolume] = useState(660)
  // const [waterPerHours, setWaterPerHours] = useState(400);
  // const [isSettingVolume, setIsSettingVolume] = useState(false);

  return (
    <>
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
    </>
  )
}