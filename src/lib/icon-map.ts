import {
  Bed, Bathtub, Television, Wind, WifiHigh, Thermometer, Martini,
} from "@phosphor-icons/react"
import type { ComponentType } from "react"

// Map icon name strings (from DB) to Phosphor icon components
// This file must only be imported from client components ("use client")
export const iconMap: Record<string, ComponentType<any>> = {
  Bed, Bathtub, Television, Wind, WifiHigh, Thermometer, Martini,
}
