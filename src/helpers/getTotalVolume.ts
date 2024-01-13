export function getTotalVolume(volumes: number[]) {
  return volumes.length === 0 ? 0 : volumes.reduce((a, b) => a + b)
}