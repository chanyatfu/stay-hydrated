import { useEffect, useRef } from "react";
import { useRouter } from "../contexts/router-context";
import { useStore } from "../stores/root-store";
import { useInput } from "./useInput";
import { ringBell } from "../helpers/ringBell";

export function useEventHandler() {

  const { currentPath, setCurrentPath } = useRouter()
  const { store, storeDispatch } = useStore()
  const { volumes, maxVolume, remainingVolume, waterPerHours, isSettingVolume } = store
  const buffer = useRef<number | null>(null)

  useEffect(() => {
		const interval = setInterval(() => {
      if (isSettingVolume) {
        return
      }
      if (remainingVolume >= 0) {
        if (currentPath === 'welcome') {
          return
        }
        storeDispatch({ type: "SET_REMAINING_VOLUME", payload: remainingVolume - 1 })
      }

    }, 1)

		return () => {
			clearInterval(interval);
		};
	}, [remainingVolume, isSettingVolume, currentPath]);

  useEffect(() => {
    if (remainingVolume <= 0 && !isSettingVolume) {
      storeDispatch({ type: "SET_IS_SETTING_VOLUME", payload: true })
    }
  }, [remainingVolume, isSettingVolume])

  useInput((chunk: string) => {
    if (chunk === '\u0003') { // Ctrl+C
      process.exit();
    }
    switch (chunk) {
      case '1': {
        setCurrentPath('water')
        return;
      }
      case '2': {
        setCurrentPath('history')
        return;
      }
      case '3': {
        setCurrentPath('settings')
        return;
      }
    }
    switch(currentPath) {
      case "welcome": {
        setCurrentPath('water');
        return;
      }
      case "water": {
        if (chunk === 'c') {  // hard clear
          buffer.current = store.remainingVolume
          storeDispatch({ type: "SET_REMAINING_VOLUME", payload: 0 })
          storeDispatch({ type: "SET_IS_SETTING_VOLUME", payload: true })
        }
        if (chunk === 'z') {  // undo
          if (buffer.current === null) {
            return
          }
          storeDispatch({ type: "SET_REMAINING_VOLUME", payload: buffer.current })
          storeDispatch({ type: "SET_IS_SETTING_VOLUME", payload: false })
          buffer.current = null
        }
        if (!isSettingVolume) {
          return
        }

        const changeAmount = 20
        switch(chunk) {
          case '\x1b[A':  // up arrow
            if (remainingVolume + changeAmount > maxVolume) {
              ringBell()
            }
            storeDispatch({ type: "SET_REMAINING_VOLUME", payload: Math.min(maxVolume, remainingVolume + changeAmount) })
            break;
          case '\x1b[B': // down arrow
            if (store.remainingVolume - changeAmount < 0) {
              ringBell()
            }
            storeDispatch({ type: "SET_REMAINING_VOLUME", payload: Math.max(0, remainingVolume - changeAmount) })
            break;
          case '\r':
          case '\n':
          case '\r\n':
            if (remainingVolume > 0) {
              storeDispatch({ type: "SET_IS_SETTING_VOLUME", payload: false })
            } else {
              storeDispatch({ type: "SET_REMAINING_VOLUME", payload: maxVolume })
              storeDispatch({ type: "ADD_BOTTLE", payload: maxVolume })
              storeDispatch({ type: "SET_IS_SETTING_VOLUME", payload: false })
            }
            break;
          default:
            break;
        }
        break;
      }
      case "history": {
        break;
      }
      case "settings": {
        break;
      }

    }
  }, [maxVolume, remainingVolume, isSettingVolume, currentPath])

}