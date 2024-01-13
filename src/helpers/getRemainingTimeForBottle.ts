export default function getRemainingTimeForBottle(remainingVolume: number, waterPerHours: number) {
  const remainingTime = remainingVolume / waterPerHours;
  const remainingHours = Math.floor(remainingTime);
  const remainingMinutes = Math.floor((remainingTime - remainingHours) * 60);

  return `${remainingHours}h ${remainingMinutes}m`;
}