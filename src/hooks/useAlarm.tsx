import { ringBell } from "helpers";
import { useEffect } from "react";
import { useStore } from "stores/root-store";

export function useAlarm() {
  const { store, storeDispatch } = useStore()
  const { volumes, maxVolume, remainingVolume, waterPerHours, isSettingVolume } = store


  useEffect(() => {
    const percentOfWaterLeft = remainingVolume / maxVolume;
    if (percentOfWaterLeft < 0.5) {
      // Alarm the user once
    }
    if (percentOfWaterLeft <= 0) {
      ringBell()
      // keep alarming the user
    }
  }, [remainingVolume, maxVolume])
}