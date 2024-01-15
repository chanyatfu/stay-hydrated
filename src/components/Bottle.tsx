import { Box, Text } from "ink";
import { padBoth } from "helpers";

type BottleProps = {
  percent: number
  volume: number
}
export default function Bottle({ percent, volume }: BottleProps) {
  percent = Math.max(0, Math.min(1, percent))
  let emptyBottle = [
    "  |=|  ",
    " /   \\ ",
    "|     |",
    "|     |",
    "|     |",
    "|     |",
    "|     |",
    "\\_____/",
  ]
  const filled = [
    { index: 4, fraction: `|${padBoth(volume.toString(), 5)}|` },
    { index: 7, fraction: "\\=====/" },
    ...[6, 5, 4, 3, 2].flatMap(index => [
      { index: index, fraction: "|_____|" },
      { index: index, fraction: "|-----|" },
    ]),
    { index: 1, fraction: " /___\\ " },
    { index: 1, fraction: " /---\\ " },
  ]
  const fraction = Math.ceil( (100 * percent) / (100 / filled.length + 1) )
  emptyBottle[filled[fraction].index] = filled[fraction].fraction
  const color = percent === 0 ? 'green' : 'blue'

  return (
    <Box flexDirection="column">
      {emptyBottle.map((line, index) => <Text key={index} color={color}>{line}</Text>)}
    </Box>
  )
}
