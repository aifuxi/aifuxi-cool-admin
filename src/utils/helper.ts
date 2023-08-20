import { ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

import { STORAGE_KEY } from '@/constants/storage';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getBearerToken() {
  if (!localStorage.getItem(STORAGE_KEY.ACCESS_TOKEN)) {
    return undefined;
  }

  return `Bearer ${localStorage.getItem(STORAGE_KEY.ACCESS_TOKEN)}`;
}
