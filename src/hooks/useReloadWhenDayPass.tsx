import { useDatabase } from "database";
import { getRandomItem } from "helpers";
import { useEffect, useState } from "react";
import { useStore } from "stores/root-store";
import { waterQuotes } from "water-quotes";

function getTodayDate() {
  return new Date().toDateString();
}

export function useReloadWhenDayPass() {
  // Save data to the database whenever the store changes

  const [currentDate, setCurrentDate] = useState(getTodayDate());
  const { isDatabaseLoaded, db, dailyCollection } = useDatabase();
  const { store, storeDispatch } = useStore();

  useEffect(() => {
    const today = getTodayDate();
    if (currentDate === today) {
      return;
    }
    console.log("date change");
    if (!isDatabaseLoaded || !dailyCollection) return;
    setCurrentDate(today);
    let dataEntry = dailyCollection.findOne({ date: today });
    if (dataEntry) {
      // If an entry for today exists, update it
      dataEntry.store = store;
      dailyCollection.update(dataEntry);
    } else {
      // If no entry exists for today, create a new one
      dailyCollection.insert({ date: today, store });
      storeDispatch({ type: "SET_QUOTE", payload: getRandomItem(waterQuotes) });
    }
    if (db) {
      db.saveDatabase();
    }

    storeDispatch({ type: "CLEAR_DAILY_DATA" });
  }, [currentDate]);
}
