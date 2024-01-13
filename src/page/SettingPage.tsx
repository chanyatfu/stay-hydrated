import { Box, Text } from "ink";
import { useInput } from "../hooks/useInput";

export default function SettingPage() {
  useInput((chunk: string) => {
  }, [])

  return (
    <>
      <Box><Text>Bottle volume: 660mL</Text></Box>
      <Box><Text>Water per hour: 500mL</Text></Box>
    </>
  )
}