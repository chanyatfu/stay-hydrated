export function formatNumberToLiter(volume: number) {
  if (volume >= 1000) {
    return `${Math.round(volume / 10) / 100}L`;
  } else if (volume <= 0) {
    return "empty";
  } else {
    return `${Math.round(volume)}mL`;
  }
}

export function padBoth(
  originalString: string,
  length: number,
  padString: string = " ",
): string {
  const totalPadding = length - originalString.length;
  const paddingStart = Math.floor(totalPadding / 2);
  const paddingEnd = totalPadding - paddingStart;

  return originalString
    .padStart(originalString.length + paddingStart, padString)
    .padEnd(length, padString);
}
