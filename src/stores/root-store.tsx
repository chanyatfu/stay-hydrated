import { createContext, useContext, useEffect, useReducer } from "react";
import { getRandomItem } from "helpers";
import { waterQuotes } from "water-quotes";
import { useDatabase } from "database";

type Store = {
  volumes: number[];
  maxVolume: number;
  remainingVolume: number;
  waterPerHours: number;
  isSettingVolume: boolean;
  quote: string;
  isSoundOn: boolean;
  dailyTarget: number;
  runInBackground: boolean;
  lastUpdated: number,
}

const initialStore = {
  volumes: new Array<number>,
  maxVolume: 660,
  remainingVolume: 660,
  waterPerHours: 400,
  isSettingVolume: false,
  quote: getRandomItem(waterQuotes) || "",
  isSoundOn: true,
  dailyTarget: 3000,
  runInBackground: true,
  lastUpdated: Date.now(),
}


type StoreAction =
  | { type: "ADD_BOTTLE", payload: number }
  | { type: "SET_MAX_VOLUME", payload: number }
  | { type: "SET_REMAINING_VOLUME", payload: number }
  | { type: "SET_WATER_PER_HOURS", payload: number }
  | { type: "SET_IS_SETTING_VOLUME", payload: boolean }
  | { type: "SET_QUOTE", payload: string }
  | { type: "TOGGLE_SOUND" }
  | { type: "SET_DAILY_TARGET", payload: number }
  | { type: "LOAD_STORED_DATA", payload: Store }
  | { type: "TOGGLE_RUN_IN_BACKGROUND" }
  | { type: "RESET_LAST_UPDATED_AND_REMAINING_VOLUME" }

function storeReducer(state: Store, action: StoreAction) {
  switch (action.type) {
    case "ADD_BOTTLE": {
      return {
        ...state,
        volumes: [...state.volumes, action.payload]
      }
    }
    case "SET_MAX_VOLUME": {
      return {
        ...state,
        maxVolume: action.payload
      }
    }
    case "SET_REMAINING_VOLUME": {
      return {
        ...state,
        remainingVolume: action.payload,
        lastUpdate: Date.now()
      }
    }
    case "SET_WATER_PER_HOURS": {
      return {
        ...state,
        waterPerHours: action.payload
      }
    }
    case "SET_IS_SETTING_VOLUME": {
      return {
        ...state,
        isSettingVolume: action.payload
      }
    }
    case "SET_QUOTE": {
      return {
        ...state,
        quote: action.payload
      }
    }
    case "TOGGLE_SOUND": {
      return {
        ...state,
        isSoundOn: !state.isSoundOn
      }
    }
    case "SET_DAILY_TARGET": {
      return {
        ...state,
        dailyTarget: action.payload
      }
    }
    case "LOAD_STORED_DATA": {
      // Need to consider if day change
      const secondElispedSinceLastLogin = (Date.now() - action.payload.lastUpdated) / 1000;
      let remainingVolume: number;
      if (action.payload.runInBackground && !action.payload.isSettingVolume) {
        remainingVolume = Math.max(0, action.payload.remainingVolume - secondElispedSinceLastLogin * (action.payload.waterPerHours / 3600));
      } else {
        remainingVolume = action.payload.remainingVolume;
      }
      console.log('secondElispedSinceLastLogin', secondElispedSinceLastLogin)
      console.log(remainingVolume)

      return {
        ...action.payload,
        remainingVolume: remainingVolume,
        isSettingVolume: remainingVolume === 0,
        lastUpdated: Date.now(),
      }
    }
    case "RESET_LAST_UPDATED_AND_REMAINING_VOLUME": {
      const secondElispedSinceLastLogin = (Date.now() - state.lastUpdated) / 1000;
      let remainingVolume: number;
      if (state.runInBackground && !state.isSettingVolume) {
        remainingVolume = Math.max(0, state.remainingVolume - secondElispedSinceLastLogin * (state.waterPerHours / 3600));
      } else {
        remainingVolume = state.remainingVolume;
      }
      return {
        ...state,
        remainingVolume: remainingVolume,
        isSettingVolume: remainingVolume === 0,
        lastUpdated: Date.now(),
      }
    }

    case "TOGGLE_RUN_IN_BACKGROUND": {
      return {
        ...state,
        runInBackground: !state.runInBackground,
      }
    }
    default: {
      throw new Error("Unhandled action type")
    }

  }
}

type StoreContextType = {
  store: Store
  storeDispatch: React.Dispatch<StoreAction>
}

const StoreContext = createContext<StoreContextType>({
  store: initialStore,
  storeDispatch: () => {},
});

export const useStore = () => useContext(StoreContext);

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const { isDatabaseLoaded, db, dailyCollection } = useDatabase();
  const [store, storeDispatch] = useReducer(storeReducer, initialStore)

  useEffect(() => {
    if (!isDatabaseLoaded || !dailyCollection) return;

    // Load data from the database when the application starts
    const today = new Date().toISOString().split('T')[0];
    const storedData = dailyCollection.findOne({ date: today });
    console.log(storedData);

    if (storedData) {
      storeDispatch({ type: 'LOAD_STORED_DATA', payload: storedData.store });
    }
  }, [isDatabaseLoaded, dailyCollection]);

  useEffect(() => {
    // Save data to the database whenever the store changes
    if (!isDatabaseLoaded || !dailyCollection) return;
    const today = new Date().toISOString().split('T')[0];
    let dataEntry = dailyCollection.findOne({ date: today });

    if (dataEntry) {
      // If an entry for today exists, update it
      dataEntry.store = store;
      dailyCollection.update(dataEntry);
    } else {
      // If no entry exists for today, create a new one
      dailyCollection.insert({ date: today, store });
    }

    if (db) {
      db.saveDatabase();
    }
  }, [store, isDatabaseLoaded, dailyCollection]);

  return (
    <StoreContext.Provider value={{store, storeDispatch}}>
      {children}
    </StoreContext.Provider>
  );
}
