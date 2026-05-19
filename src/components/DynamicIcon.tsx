"use client";

import { iconMap } from "@/lib/icon-map";

export default function DynamicIcon({ 
  name, 
  className, 
  weight = "regular" 
}: { 
  name: string | null; 
  className?: string; 
  weight?: any; 
}) {
  if (!name) return null;
  const Icon = iconMap[name];
  if (!Icon) return null;
  return <Icon className={className} weight={weight} />;
}
