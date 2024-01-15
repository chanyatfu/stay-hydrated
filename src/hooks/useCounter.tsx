import { useEffect, useState } from "react";

export function useCounter(): [number, React.Dispatch<React.SetStateAction<number>>] {
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCounter((previousCounter) => previousCounter - 1);
    }, 50);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return [counter, setCounter];
}
