import { createContext, useContext, useEffect, useReducer } from "react";
import { getRandomItem } from "../helpers/getRandomItem";
import { waterQuotes } from "../water-quotes";
import { dailyCollection, db } from "../database";

type Store = {
  volumes: number[];
  maxVolume: number;
  remainingVolume: number;
  waterPerHours: number;
  isSettingVolume: boolean;
  quote: string;
  isSoundOn: boolean;
  dailyTarget: number;
}

const initialStore = {
  volumes: [],
  maxVolume: 660,
  remainingVolume: 660,
  waterPerHours: 400,
  isSettingVolume: false,
  quote: getRandomItem(waterQuotes),
  isSoundOn: true,
  dailyTarget: 3000.
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
        remainingVolume: action.payload
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
      return {
        ...action.payload
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
  const [store, storeDispatch] = useReducer(storeReducer, initialStore)

  useEffect(() => {
    // Load data from the database when the application starts
    if (dailyCollection === undefined) return;
    const today = new Date().toISOString().split('T')[0];
    const storedData = dailyCollection.findOne({ date: today });
    console.log(storedData)

    if (storedData) {
      storeDispatch({ type: 'LOAD_STORED_DATA', payload: storedData.store });
    }
  }, [dailyCollection]);

  useEffect(() => {
    // Save data to the database whenever the store changes
    if (dailyCollection === undefined) return;
    const today = new Date().toISOString().split('T')[0];
    let dataEntry = dailyCollection.findOne({ date: today });

    if (dataEntry) {
      dataEntry.store = store;
      dailyCollection.update(dataEntry);
    } else {
      dailyCollection.insert({ date: today, store });
    }

    db.saveDatabase();
  }, [store, dailyCollection]);

  return (
    <StoreContext.Provider value={{store, storeDispatch}}>
      {children}
    </StoreContext.Provider>
  );
}
