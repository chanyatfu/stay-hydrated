export function formatNumberToLiter(volume: number) {
  if (volume >= 1000) {
    return `${Math.round(volume / 10) / 100}L`
  } else if (volume <= 0) {
    return 'emptied'
  } else {
    return `${Math.round(volume)}mL`
  }
}