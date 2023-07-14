import { Ref, forwardRef, ReactNode, useState } from 'react';
import styled from 'styled-components';
import { HStack } from '../Stack';
import { Text } from '../Text';

import { TextInput, TextInputProps } from './TextInput';

type AmountTextInputProps = Omit<TextInputProps, 'value' | 'onValueChange'> & {
  value: number | undefined;
  onValueChange?: (value: number | undefined) => void;
  unit?: ReactNode;
  shouldBePositive?: boolean;
  shouldBeInteger?: boolean;
  suggestion?: ReactNode;
};

const UnitContainer = styled.div`
  border-radius: 8px;
  padding: 16px;
  font-weight: bold;
  position: absolute;
  right: 16px;
  background: ${({ theme }) => theme.colors.mist.toCssValue()};
`;

export const AmountTextInput = forwardRef(function AmountInputInner(
  {
    onValueChange,
    label,
    onChange,
    value,
    inputOverlay,
    unit,
    type = 'number',
    suggestion,
    placeholder,
    shouldBePositive,
    shouldBeInteger,
    ...props
  }: AmountTextInputProps,
  ref: Ref<HTMLInputElement> | null
) {
  const valueAsString = value?.toString() ?? '';
  const [inputValue, setInputValue] = useState<string>(valueAsString);

  return (
    <TextInput
      {...props}
      type={type}
      label={
        <HStack alignItems="center" justifyContent="space-between" gap={16} fullWidth>
          {label}
          {suggestion}
        </HStack>
      }
      inputOverlay={
        unit ? (
          <UnitContainer>
            <Text weight="semibold" color="regular">
              {unit}
            </Text>
          </UnitContainer>
        ) : undefined
      }
      placeholder={placeholder ?? 'Enter amount'}
      value={Number(valueAsString) === Number(inputValue) ? inputValue : valueAsString}
      ref={ref}
      onValueChange={(value) => {
        if (shouldBePositive) {
          value = value.replace(/-/g, '');
        }

        if (value === '') {
          setInputValue('');
          onValueChange?.(undefined);
          return;
        }

        const parse = shouldBeInteger ? parseInt : parseFloat;
        const valueAsNumber = parse(value);
        if (isNaN(valueAsNumber)) {
          return;
        }

        setInputValue(valueAsNumber.toString() !== value ? value : valueAsNumber.toString());
        onValueChange?.(valueAsNumber);
      }}
    />
  );
});
