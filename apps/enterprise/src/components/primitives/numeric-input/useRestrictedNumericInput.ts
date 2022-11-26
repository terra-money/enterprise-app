import { ChangeEvent, ClipboardEvent, KeyboardEvent, useCallback } from 'react';
import { RestrictedInputReturn, useRestrictedInput } from '../text-input';

export interface RestrictedNumberInputProps {
  type?: 'decimal' | 'integer';
  maxDecimalPoints?: number;
  maxIntegerPoints?: number;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}

export function useRestrictedNumericInput(props: RestrictedNumberInputProps): RestrictedInputReturn {
  const { type = 'decimal', maxDecimalPoints, maxIntegerPoints, onChange: _onChange } = props;

  const { onKeyPress: restrictCharacters } = useRestrictedInput(type === 'integer' ? '0-9' : '0-9.');

  const isInvalid = useCallback(
    (nextValue: string): boolean => {
      if (nextValue.length > 0 && nextValue[0] === '.') {
        nextValue = '0'.concat(nextValue);
      }
      return (
        Number.isNaN(+nextValue) ||
        (typeof maxIntegerPoints === 'number' && new RegExp(`^[0-9]{${maxIntegerPoints + 1},}`).test(nextValue)) ||
        (type === 'decimal' &&
          typeof maxDecimalPoints === 'number' &&
          new RegExp(`\\.[0-9]{${maxDecimalPoints + 1},}$`).test(nextValue))
      );
    },
    [maxDecimalPoints, maxIntegerPoints, type]
  );

  const onKeyPress = useCallback(
    (event: KeyboardEvent<HTMLInputElement>) => {
      restrictCharacters(event);

      if (event.isDefaultPrevented()) {
        return;
      }

      const { value, selectionStart, selectionEnd } = event.target as HTMLInputElement;

      if (typeof selectionStart !== 'number' || typeof selectionEnd !== 'number') {
        event.preventDefault();
        event.stopPropagation();
        return;
      }

      const char = event.key;

      const nextValue = value.substring(0, selectionStart) + char + value.substring(selectionEnd);

      if (isInvalid(nextValue)) {
        event.preventDefault();
        event.stopPropagation();
      }
    },
    [restrictCharacters, isInvalid]
  );

  const onPaste = useCallback(
    (event: ClipboardEvent<HTMLInputElement>) => {
      const pastedText = event.clipboardData?.getData('text');

      if (!/^[0-9.]+$/.test(pastedText)) {
        event.preventDefault();
        event.stopPropagation();
      }

      const { value, selectionStart, selectionEnd } = event.target as HTMLInputElement;

      if (typeof selectionStart !== 'number' || typeof selectionEnd !== 'number') {
        event.preventDefault();
        event.stopPropagation();
        return;
      }

      const nextValue = value.substring(0, selectionStart) + pastedText + value.substring(selectionEnd);

      if (isInvalid(nextValue)) {
        event.preventDefault();
        event.stopPropagation();
      }
    },
    [isInvalid]
  );

  const onChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      if (_onChange) {
        const hasNonNumeralCharacters = /[^0-9.]/g;

        if (hasNonNumeralCharacters.test(event.target.value)) {
          event.target.value = event.target.value.replace(/[^0-9.]/g, '');
        }

        if (event.target.value.length > 0 && event.target.value[0] === '.') {
          event.target.value = '0'.concat(event.target.value[0]);
        }

        _onChange(event);
      }
    },
    [_onChange]
  );

  return { onKeyPress, onPaste, onChange };
}
