import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getStatusColor(status: string): string {
  switch (status) {
    case "Alive":
      return "bg-green-500";
    case "Dead":
      return "bg-red-500";
    case "unknown":
      return "bg-gray-500";
    default:
      return "bg-gray-500";
  }
}
