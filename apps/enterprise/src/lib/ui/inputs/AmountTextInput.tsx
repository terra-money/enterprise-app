import { formatAmount } from '@terra-money/apps/libs/formatting';
import { Ref, forwardRef, ReactNode } from 'react';
import styled from 'styled-components';
import { ShyTextButton } from '../buttons/ShyTextButton';
import { HStack } from '../Stack';
import { Text } from '../Text';

import { TextInput, TextInputProps } from './TextInput';
import { enforceTextInputIntoNumber } from './utils/enforceTextInputIntoNumber';

type AmountTextInputProps = TextInputProps & {
  value: number | undefined;
  onValueChange?: (value: number | undefined) => void;
  max?: number;
  unit?: ReactNode;
};

const UnitContainer = styled.div`
  border-radius: 8px;
  padding: 16px;
  font-weight: bold;
  position: absolute;
  right: 16px;
  background: ${({ theme }) => theme.colors.backgroundGlass.toCssValue()};
`;

export const AmountTextInput = forwardRef(function AmountInputInner(
  { onValueChange, label, onChange, max, inputOverlay, unit, ...props }: AmountTextInputProps,
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
      inputOverlay={
        unit ? (
          <UnitContainer>
            <Text weight="semibold" color="regular">
              {unit}
            </Text>
          </UnitContainer>
        ) : undefined
      }
      onValueChange={(value) => {
        onValueChange?.(enforceTextInputIntoNumber(value));
      }}
    />
  );
});
