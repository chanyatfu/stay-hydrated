import { Box, Text } from "ink";

type SettingItemProps = {
  title: string
  value: string
  hovered?: boolean
  selected?: boolean
}
export default function SettingItem({
  title,
  value,
  hovered = false,
  selected = false,
}: SettingItemProps) {

  const hoveredButNotSelected = hovered && !selected


  return (
    <Box>
      <Text
        backgroundColor={hoveredButNotSelected ? 'gray' : undefined}
      >
        {title}: <Text backgroundColor={selected ? 'gray' : undefined}>{value}</Text>
      </Text>
    </Box>
  )
}
