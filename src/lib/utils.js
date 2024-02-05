import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export function formatDate(input) {
	if (input === undefined || input === null) return null
  const date = new Date(input)
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  })
}

export function formatDateMonthDay(input) {
	if (input === undefined || input === null) return null
	const date = new Date(input)
	return date.toLocaleDateString("en-US", {
		month: "short",
		day: "numeric",
	})
}
