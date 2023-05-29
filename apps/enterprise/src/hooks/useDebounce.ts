import { useEffect, useState, useRef } from 'react';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

export const useDebounceSearch = (value: string | undefined, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  const value$ = useRef(new Subject<string | undefined>());

  useEffect(() => {
    const subscription = value$.current.pipe(debounceTime(delay), distinctUntilChanged()).subscribe(setDebouncedValue);

    return () => subscription.unsubscribe();
  }, [delay]);

  useEffect(() => {
    value$.current.next(value);
  }, [value]);

  return debouncedValue;
};
