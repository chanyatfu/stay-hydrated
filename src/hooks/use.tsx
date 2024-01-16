import { useStore } from "stores/root-store";

export function useReloadWhenDayPass() {
  // Save data to the database whenever the store changes
  const { store, storeDispatch } = useStore();
  const { isDatabaseLoaded, db, dailyCollection } = useDatabase();
  if (!isDatabaseLoaded || !dailyCollection) return;
  const today = new Date().toDateString();
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
  storeDispatch();
}
