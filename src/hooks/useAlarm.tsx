import { ringBell } from "helpers";
import { useEffect } from "react";
import { useStore } from "stores/root-store";

export function useAlarm() {
  const { store, storeDispatch } = useStore()
  const { volumes, maxVolume, remainingVolume, waterPerHours, isSettingVolume } = store


  useEffect(() => {

    const interval = setInterval(() => {
      if (store.isSettingVolume) {
        if (store.isSoundOn) {
          ringBell()
        }
      }
    }, 1000)

		return () => {
			clearInterval(interval);
		};
  }, [remainingVolume, maxVolume])
}