import { useRef } from 'react';

export const usePreviousIfEmpty = <T>(initialValue: T, value: T | undefined): T => {
  const previousRef = useRef<T>(initialValue);

  if (value !== undefined) {
    previousRef.current = value;
  }

  return previousRef.current;
};
