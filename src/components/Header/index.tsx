import { Box, Text } from "ink";
import HeaderItem from "./HeaderItem";
import { useRouter } from "../../contexts/router-context";

type HeaderProps = {
  children?: React.ReactNode
}
export default function Header({ children }: HeaderProps) {

  const { currentPath } = useRouter()

  return (
    <Box
      borderTop={false} borderRight={false} borderLeft={false}
      borderStyle="single"
      borderBottomColor="green" height={3}
      flexDirection="row"
    >
      <HeaderItem path="water">Water</HeaderItem>
      <HeaderItem path="settings">Setting</HeaderItem>
    </Box>
  )
}