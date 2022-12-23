import { formatAmount } from '@terra-money/apps/libs/formatting';
import { Ref, forwardRef } from 'react';
import { ShyTextButton } from '../buttons/ShyTextButton';
import { HStack } from '../Stack';
import { Text } from '../Text';

import { TextInput, TextInputProps } from './TextInput';
import { enforceTextInputIntoNumber } from './utils/enforceTextInputIntoNumber';

type AmountTextInputProps = TextInputProps & {
  value: number | undefined;
  onValueChange?: (value: number | undefined) => void;
  max?: number;
};

export const AmountTextInput = forwardRef(function AmountInputInner(
  { onValueChange, label, onChange, max, ...props }: AmountTextInputProps,
  ref: Ref<HTMLInputElement> | null
) {
  return (
    <TextInput
      {...props}
      label={
        <HStack fullWidth alignItems="center" gap={8} justifyContent="space-between">
          <Text>{label}</Text>
          {max !== undefined && (
            <ShyTextButton onClick={() => onValueChange?.(max)} text={`Max: ${formatAmount(max)}`} />
          )}
        </HStack>
      }
      ref={ref}
      onValueChange={(value) => {
        onValueChange?.(enforceTextInputIntoNumber(value));
      }}
    />
  );
});
