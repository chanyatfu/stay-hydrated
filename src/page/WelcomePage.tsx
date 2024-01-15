import { Box, Text } from "ink";

export default function WelcomePage() {

  const logo = [
    "     ___    ___ ___    ___  _______      ______      ______     ___________  __________  _______   ",
    "    /  /   /  / \\  \\  /  / /  ___  \\    /  ___ \\    /  __  \\   /___   ____/ /  _______/ /  ___  \\",
    "   /  /___/  /   \\  \\/  / /  /   \   \\  /  /   \\ \\  /  /__\\  |     / /      /  /______  /  /   \   \\",
    "  /  ____   /     \\    / /  /    /  / /   \\__/  / /  ____   /    /  /     /  _______/ /  /    /  /",
    " /  /   /  /       /  / /  /____/  / /  ___   _/ /  /   /  /    /  /     /  /______  /  /____/  /",
    "/__/   /__/       /__/ /________ ./ /__/   \\__\\ /__/   /__/    /__/     /_________/ /________ ./",
  ]

  return (
    <>
      <Box flexDirection="column">
        {logo.map((line, index) => <Text key={index} color="green">{line}</Text>)}
      </Box>
      <Box>
        <Text>Press any key to start</Text>
      </Box>
    </>
  )
}
