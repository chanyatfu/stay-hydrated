export function padBoth(originalString: string, length: number, padString: string = ' '): string {
  const totalPadding = length - originalString.length;
  const paddingStart = Math.floor(totalPadding / 2);
  const paddingEnd = totalPadding - paddingStart;

  return originalString.padStart(originalString.length + paddingStart, padString).padEnd(length, padString);
}