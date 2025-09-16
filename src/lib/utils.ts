import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: string | Date) {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(date))
}

export function formatCurrency(amount: number) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
  }).format(amount)
}

export function generateStudentId(year: number, courseId: string, sequence: number) {
  const coursePrefix = courseId.substring(0, 3).toUpperCase()
  return `${year}${coursePrefix}${sequence.toString().padStart(3, '0')}`
}

export function calculateAttendancePercentage(present: number, total: number) {
  if (total === 0) return 0
  return Math.round((present / total) * 100)
}
