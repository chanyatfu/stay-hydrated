export function getRandomItem<T>(arr: Array<T>) {
  const randomIndex = Math.floor(Math.random() * arr.length);
  return arr[randomIndex];
}

export function ringBell() {
  console.log("\x07");
}
