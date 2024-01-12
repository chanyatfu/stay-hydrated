import { Box, Text } from "ink";
import { useId } from "react";

export default function Bottle({ percent }: { percent: number }) {

  percent = Math.max(0, Math.min(100, percent))
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
    { index: 4, fraction: "|  v  |" },
    // { index: 7, fraction: "\\_____/" },
    { index: 7, fraction: "\\=====/" },
    ...[6, 5, 4, 3, 2].flatMap(index => [
      { index: index, fraction: "|_____|" },
      { index: index, fraction: "|-----|" },
    ]),
    { index: 1, fraction: " /___\\ " },
    { index: 1, fraction: " /---\\ " },
  ]

  const fraction = Math.ceil( percent / (100 / filled.length + 1) )
  emptyBottle[filled[fraction].index] = filled[fraction].fraction

  return (
    <Box flexDirection="column">
      {emptyBottle.map((line, index) =>
        <Text key={index}>{line}</Text>
      )}
    </Box>
  )
}