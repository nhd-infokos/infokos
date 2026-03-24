import * as PhosphorIcons from "@phosphor-icons/react"
import type { ComponentType } from "react"

// Automatically map ALL Phosphor icon components.
// Filters out non-icon utility exports (IconContext, SSR, etc.)
// This file must only be imported from client components ("use client")
// Browse all icons at: https://phosphoricons.com
export const iconMap: Record<string, ComponentType<any>> = (() => {
  const map: Record<string, ComponentType<any>> = {}
  for (const [name, value] of Object.entries(PhosphorIcons)) {
    // Only keep PascalCase exports that are actual React components (objects with $$typeof)
    if (
      /^[A-Z][a-z]/.test(name) &&
      typeof value === "object" &&
      value !== null &&
      "$$typeof" in value
    ) {
      map[name] = value as unknown as ComponentType<any>
    }
  }
  return map
})()
