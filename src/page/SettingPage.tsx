import { Box, Text } from "ink";
import { useInput } from "../hooks/useInput";

export default function SettingPage() {

  return (
    <>
      <Box><Text>Bottle capacity: 660mL</Text></Box>
      <Box><Text>Water per hour: 500mL</Text></Box>
      <Box><Text>Sound: <Text inverse color="green">ON</Text></Text></Box>
    </>
  )
}