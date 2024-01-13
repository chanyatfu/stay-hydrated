import { Box, Text } from "ink";
import { useRouter } from "../../contexts/router-context";

type HeaderItem = {
  children?: React.ReactNode
  path: string
}
export default function HeaderItem({
  path,
  children,
}: HeaderItem) {

  const { currentPath } = useRouter()

  return (
    <Box
      paddingTop={1} paddingLeft={2} paddingRight={2}
    >
      <Text dimColor={currentPath !== path} color="green">{children}</Text>
    </Box>
  )
}