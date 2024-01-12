import { useEffect, useState } from "react";

export function useCounter(): [
  number, React.Dispatch<React.SetStateAction<number>>
] {
	const [counter, setCounter] = useState(100);

	useEffect(() => {
		const timer = setInterval(() => {
			setCounter(previousCounter => previousCounter - 1);
		}, 20);

		return () => {
			clearInterval(timer);
		};
	}, []);

  return [counter, setCounter];

}
