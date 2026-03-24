import * as AllIcons from "@phosphor-icons/react"
import type { ComponentType } from "react"

// Automatically map ALL Phosphor icon components by their export name.
// Filter out non-icon exports (IconContext, IconBase, SSRBase, etc.)
export const iconMap: Record<string, ComponentType<any>> = Object.fromEntries(
  Object.entries(AllIcons).filter(
    ([name]) => /^[A-Z]/.test(name) && !name.startsWith("Icon") && name !== "SSR"
  )
)
