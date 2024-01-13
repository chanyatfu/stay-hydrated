import { Box, Text } from "ink";
import { useInput } from "../../hooks/useInput";
import SettingItem from "./SettingItem";
import { useState } from "react";
import { useStore } from "../../stores/root-store";
import { formatNumberToLiter } from "../../helpers/formatNumberToLiter";

type SettingItemData = {
  title: string
  value: string
}

export default function SettingPage() {

  const { store, storeDispatch } = useStore()

  const settingItemData: SettingItemData[] = [
    { title: "Bottle capacity", value: formatNumberToLiter(store.maxVolume) },
    { title: "Water per hour", value: formatNumberToLiter(store.waterPerHours) },
    { title: "Sound", value: store.isSoundOn ? "ON" : "OFF" },
  ]

  const [hoveredIndex, setHoveredIndex] = useState(0);
  const [isSelected, setIsSelected] = useState(false);

  useInput((chunk) => {
    switch (chunk) {
      case '\x1b[A': { // up arrow
        if (isSelected) {
          switch (hoveredIndex) {
            case 0: {
              storeDispatch({ type: "SET_MAX_VOLUME", payload: store.maxVolume + 20 })
              break;
            }
            case 1: {
              storeDispatch({ type: "SET_WATER_PER_HOURS", payload: store.waterPerHours + 20 })
              break;
            }
            case 2: {
              storeDispatch({ type: "TOGGLE_SOUND" })
              break;
            }
          }
        } else {
          setHoveredIndex((hoveredIndex + settingItemData.length - 1) % settingItemData.length)
        }
        break;
      }
      case '\x1b[B': { // down arrow
        if (isSelected) {
          switch (hoveredIndex) {
            case 0: {
              storeDispatch({ type: "SET_MAX_VOLUME", payload: store.maxVolume - 20 })
              break;
            }
            case 1: {
              storeDispatch({ type: "SET_WATER_PER_HOURS", payload: store.waterPerHours - 20 })
              break;
            }
            case 2: {
              storeDispatch({ type: "TOGGLE_SOUND" })
              break;
            }
          }
        } else {
          setHoveredIndex((hoveredIndex + 1) % settingItemData.length)
        }
        break;
      }
      case '\r':
      case '\n':
      case '\r\n': {
        setIsSelected(prev => !prev)
        break;
      }
    }
  }, [hoveredIndex, isSelected, settingItemData])

  return (
    <>
      {settingItemData.map((item, index) => (
        <SettingItem key={index} title={item.title} value={item.value} hovered={index === hoveredIndex} selected={index === hoveredIndex && isSelected} />
      ))}
    </>
  )
}