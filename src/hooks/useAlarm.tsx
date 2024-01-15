import { useEffect } from "react";
import { useStore } from "stores/root-store";
import notifier from 'node-notifier';


export function useNotification() {
  const { store } = useStore()


  useEffect(() => {
    if (store.allowsNotification) {
      notifier.notify({
        title: 'Reminder',
        message: 'Start your day hydrated!',
        sound: store.isSoundOn,
      });
    }
  }, [])

  useEffect(() => {
    if (store.isSettingVolume && store.allowsNotification) {
      notifier.notify({
        title: 'Reminder',
        message: 'Time to finish your current water bottle!',
        sound: store.isSoundOn,
      });
    }
  }, [store.isSettingVolume])

}