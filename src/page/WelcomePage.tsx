import { Box, Text } from "ink";
import Layout from "./layout";

export default function WelcomePage() {

  const logo = [
    "     ___    ___ ___    ___  _______      ______      ______     ___________  __________",
    "    /  /   /  / \\  \\  /  / /  ___  \\    /  ___ \\    /  __  \\   /___   ____/ /  _______/",
    "   /  /___/  /   \\  \\/  / /  /   \   \\  /  /   \\ \\  /  /__\\  |     /  /     /  /______",
    "  /  ____   /     \\    / /  /    /  / /   \\__/  / /  ____   /    /  /     /  _______/",
    " /  /   /  /       /  / /  /____/  / /  ___   _/ /  /   /  /    /  /     /  /______",
    "/__/   /__/       /__/ /________ ./ /__/   \\__\\ /__/   /__/    /__/     /_________/",
  ]

  return (
    <Layout justifyContent="center" alignItems="center">
      <Box flexDirection="column">
        {logo.map((line, index) => <Text key={index} color="green">{line}</Text>)}
      </Box>
      <Box>
        <Text>
          Press any key to start
        </Text>
      </Box>
    </Layout>
  )
}
