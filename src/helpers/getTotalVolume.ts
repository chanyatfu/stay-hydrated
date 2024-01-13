export function getTotalVolume(volumes: number[]) {
  const ml = volumes.length === 0 ? 0 : volumes.reduce((a, b) => a + b)
  if (ml >= 1000) {
    return `${ml / 1000}L`
  } else {
    return `${ml}mL`
  }
}