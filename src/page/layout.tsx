import { Box } from "ink";

type LayoutProps = {
  children: React.ReactNode
  justifyContent?: "flex-start" | "center" | "flex-end" | "space-between" | "space-around" | undefined
  alignItems?: "flex-start" | "center" | "flex-end" | "stretch" | undefined
}
export default function Layout({
  children,
  justifyContent,
  alignItems
}: LayoutProps) {
  return (
    <Box
      height={23}
      justifyContent={justifyContent}
      alignItems={alignItems}
      flexDirection="column"
      borderStyle="round" borderColor="green"
      paddingX={4} paddingY={1} margin={1}
      rowGap={1}
    >
      {children}
    </Box>
  )
}