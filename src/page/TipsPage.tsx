import { Box, Text } from "ink";

export default function TipsPage() {
  const tips = [
    "1. Press C to force clear a bottle. Press Z to revert.",
    "2. Press the corresponding number key to switch page.",
    "3. Your history is automatically saved. You don't need to worry about losing data.",
  ]

  return (
    <>
      <Box flexDirection="column" rowGap={1}>
        {tips.map((tip, index) => <Box key={index}><Text>{tip}</Text></Box>)}
      </Box>
    </>
  )
}