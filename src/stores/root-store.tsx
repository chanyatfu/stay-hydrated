import { createContext, useContext, useReducer } from "react";
import { getRandomItem } from "../helpers/getRandomItem";
import { waterQuotes } from "../water-quotes";

type Store = {
  volumes: number[];
  maxVolume: number;
  remainingVolume: number;
  waterPerHours: number;
  isSettingVolume: boolean;
  quote: string;
}

const initialStore = {
  volumes: [],
  maxVolume: 660,
  remainingVolume: 660,
  waterPerHours: 400,
  isSettingVolume: false,
  quote: getRandomItem(waterQuotes)
}


type StoreAction =
  | { type: "ADD_BOTTLE", payload: number }
  | { type: "SET_MAX_VOLUME", payload: number }
  | { type: "SET_REMAINING_VOLUME", payload: number }
  | { type: "SET_WATER_PER_HOURS", payload: number }
  | { type: "SET_IS_SETTING_VOLUME", payload: boolean }
  | { type: "SET_QUOTE", payload: string }

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

  return (
    <StoreContext.Provider value={{store, storeDispatch}}>
      {children}
    </StoreContext.Provider>
  );
}
