import { Box, Text } from "ink";

export default function TipsPage() {
  const tips = [
    "Press the corresponding number key to switch page.",
    "Press C to force clear a bottle. Press Z to revert.",
    "Your history is automatically saved. You don't need to worry about losing data.",
    "Press Ctrl+C to exit the app.",
    "Water count toward target only if it have been confirmed",
    "Use Up/Down arrow to navigate throught setting. Press Enter to select and unselected. Use Up/Down arrow to modified the value",
    "Turn on the 'Keep tracking when not on app' settting to track your water intake even when you are not on the app.",
  ]

  return (
    <>
      <Box flexDirection="column" rowGap={1}>
        {tips.map((tip, index) => <Box key={index}><Text>{index+1}. {tip}</Text></Box>)}
      </Box>
    </>
  )
}
