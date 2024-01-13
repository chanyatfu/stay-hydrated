export function formatNumberToLiter(volume: number) {
  if (volume >= 1000) {
    return `${Math.round(volume / 10) / 100}L`
  } else {
    return `${Math.round(volume)}mL`
  }
}