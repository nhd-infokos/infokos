import {
  Bed, Bathtub, Television, Wind, WifiHigh, Thermometer, Martini,
} from "@phosphor-icons/react";
import type { ComponentType } from "react";

// Map icon name strings (from DB) to Phosphor icon components
export const iconMap: Record<string, ComponentType<any>> = {
  Bed,
  Bathtub,
  Television,
  Wind,
  WifiHigh,
  Thermometer,
  Martini,
};

// Format price as Indonesian Rupiah (e.g. "Rp 1.200.000")
export function formatPrice(price: number): string {
  return `Rp ${new Intl.NumberFormat("id-ID").format(price)}`;
}

// Format price short for map markers (e.g. "Rp 1.2jt")
export function formatPriceShort(price: number): string {
  if (price >= 1000000) {
    const m = price / 1000000;
    return `Rp ${m % 1 === 0 ? m.toFixed(0) : m.toFixed(1)}jt`;
  }
  return `Rp ${Math.round(price / 1000)}rb`;
}
