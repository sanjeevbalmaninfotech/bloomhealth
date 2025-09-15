import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
  // 1. Combine all inputs into one string using clsx
  // 2. Let twMerge resolve Tailwind conflicts
  return twMerge(
    clsx(...inputs), // notice the spread — original snippet passed 'inputs' array directly
  );
}
