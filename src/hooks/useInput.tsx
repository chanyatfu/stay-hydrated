import { useEffect } from "react";

export function useInput(
  handleInput: (chunk: string) => void,
  dependencies: any[] = [],
) {
  useEffect(() => {
    // Enable raw mode to read input characters immediately
    process.stdin.setRawMode(true);
    process.stdin.resume();
    process.stdin.setEncoding("utf8");

    process.stdin.on("data", handleInput);

    return () => {
      // Clean up
      process.stdin.off("data", handleInput);
      process.stdin.setRawMode(false);
      process.stdin.pause();
    };
  }, dependencies);
}
