import { Box, Text } from "ink";
import HeaderItem from "./HeaderItem";
import { useRouter } from "../../contexts/router-context";
import { useStore } from "../../stores/root-store";
import { getTotalVolume } from "../../helpers";

type HeaderProps = {
  children?: React.ReactNode;
};
export default function Header({ children }: HeaderProps) {
  const { currentPath } = useRouter();
  const { store } = useStore();
  const percentOfWaterLeft = store.remainingVolume / store.maxVolume;

  const dailyTargetReached = Math.round(
    (getTotalVolume(store.volumes) / store.dailyTarget) * 100,
  );
  let targetColor = "red";
  if (dailyTargetReached >= 30) {
    targetColor = "magenta";
  }
  if (dailyTargetReached >= 60) {
    targetColor = "yellow";
  }
  if (dailyTargetReached >= 100) {
    targetColor = "green";
  }

  return (
    <Box
      borderTop={false}
      borderRight={false}
      borderLeft={false}
      borderStyle="single"
      borderBottomColor="green"
      height={3}
      flexDirection="row"
      justifyContent="space-between"
    >
      <Box flexDirection="row">
        <HeaderItem path="water" accent={store.isSettingVolume}>
          Water
        </HeaderItem>
        <HeaderItem path="history">History</HeaderItem>
        <HeaderItem path="settings">Settings</HeaderItem>
        <HeaderItem path="tips">Tips</HeaderItem>
        <HeaderItem path="appinfo">App Info</HeaderItem>
      </Box>
      <Box paddingTop={1} paddingLeft={2} paddingRight={2}>
        <Text color="green" wrap="truncate-start">
          Daily Target reached:{" "}
          <Text color={targetColor}>{dailyTargetReached}%</Text>
        </Text>
      </Box>
    </Box>
  );
}
