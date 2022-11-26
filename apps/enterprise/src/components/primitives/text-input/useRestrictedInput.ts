import { ChangeEvent, ClipboardEvent, KeyboardEvent, useCallback, useMemo } from 'react';

export interface RestrictedInputReturn {
  onKeyPress: (event: KeyboardEvent<HTMLInputElement>) => void;
  onPaste?: (event: ClipboardEvent<HTMLInputElement>) => void;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}

export function useRestrictedInput(
  availableCharacters: ((character: string) => boolean) | string
): RestrictedInputReturn {
  const test: (character: string) => boolean = useMemo(() => {
    if (typeof availableCharacters === 'string') {
      const pattern: RegExp = new RegExp(`[${availableCharacters}]`);
      return (character: string) => pattern.test(character);
    } else if (typeof availableCharacters === 'function') {
      return availableCharacters;
    }
    throw new Error('availableCharacters must be string or function');
  }, [availableCharacters]);

  const onKeyPress: (event: KeyboardEvent<HTMLInputElement>) => void = useCallback(
    (event: KeyboardEvent<HTMLInputElement>) => {
      if (!test(event.key)) {
        // prevent key press
        event.preventDefault();
        event.stopPropagation();
      }
    },
    [test]
  );

  return {
    onKeyPress,
  };
}
