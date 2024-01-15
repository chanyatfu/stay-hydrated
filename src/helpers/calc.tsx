export function getRemainingTimeForBottle(
  remainingVolume: number,
  waterPerHours: number,
) {
  const remainingTime = remainingVolume / waterPerHours;
  const remainingHours = Math.floor(remainingTime);
  const remainingMinutes = Math.ceil((remainingTime - remainingHours) * 60);

  return `${remainingHours}h ${remainingMinutes}m`;
}

export function getTotalVolume(volumes: number[]) {
  return volumes.length === 0 ? 0 : volumes.reduce((a, b) => a + b);
}
