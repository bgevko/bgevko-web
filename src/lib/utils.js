import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

const path = require('path')

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export function formatDate(input) {
  const date = new Date(input)
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  })
}

