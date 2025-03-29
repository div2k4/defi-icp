import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatICPAmount(amount: number): string {
  return amount.toFixed(2) + " ICP";
}

export function calculateLTV(borrowAmount: number, collateralAmount: number): number {
  if (collateralAmount === 0) return 0;
  return (borrowAmount / collateralAmount) * 100;
}

export function calculateInterest(amount: number, rate: number, duration: number): number {
  return (amount * (rate / 100) * duration) / 12;
}

export function calculateMonthlyPayment(amount: number, interest: number, duration: number): number {
  return (amount + interest) / duration;
}