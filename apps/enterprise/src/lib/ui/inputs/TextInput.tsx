import { ChangeEvent, InputHTMLAttributes, Ref, forwardRef } from 'react';
import styled, { css } from 'styled-components';
import { defaultTransitionCSS } from 'lib/ui/animations/transitions';
import { defaultInputShapeCSS, inputPaddingCSS } from './config';

import { InputWrapperWithErrorMessageProps, InputWrapperWithErrorMessage } from './InputWrapper';
import { Spinner } from '../Spinner';
import { getColor } from '../theme/getters';

export type SharedTextInputProps = Pick<InputWrapperWithErrorMessageProps, 'label' | 'error' | 'inputOverlay'> & {
  onValueChange?: (value: string) => void;
  isLoading?: boolean;
};

export const commonInputCSS = css<{
  isValid: boolean;
}>`
  ${defaultInputShapeCSS};
  max-width: 100%;
  width: 100%;

  background: ${getColor('mist')};
  ${inputPaddingCSS};
  color: ${({ theme }) => theme.colors.text.toCssValue()};

  ${defaultTransitionCSS};

  &::placeholder {
    color: ${({ theme }) => theme.colors.textShy.toCssValue()};
  }

  outline: 1px solid transparent;
  ${({ isValid, theme }) => {
    const errorColor = theme.colors.alert.toCssValue();
    const regularColor = isValid ? theme.colors.mist.toCssValue() : errorColor;
    const activeColor = isValid ? theme.colors.primary.toCssValue() : errorColor;

    return css`
      border: 1px solid ${regularColor};

      :hover {
        outline-color: ${regularColor};
      }

      :focus,
      :active {
        border-color: ${activeColor};
      }
    `;
  }}
`;

export const TextInputContainer = styled.input`
  ${commonInputCSS};
`;

export const TextInputLoader = () => (
  <TextInputContainer as="div" isValid>
    <Spinner />
  </TextInputContainer>
);

export type TextInputProps = InputHTMLAttributes<HTMLInputElement> & SharedTextInputProps;

export const TextInput = forwardRef(function TextInputInner(
  { onValueChange, label, error, height, isLoading, inputOverlay, ...props }: TextInputProps,
  ref: Ref<HTMLInputElement> | null
) {
  return (
    <InputWrapperWithErrorMessage inputOverlay={inputOverlay} error={error} label={label}>
      {isLoading ? (
        <TextInputLoader />
      ) : (
        <TextInputContainer
          {...props}
          isValid={!error}
          ref={ref}
          onWheel={props.type === 'number' ? ({ currentTarget }) => currentTarget.blur() : undefined}
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            props.onChange?.(event);
            onValueChange?.(event.currentTarget.value);
          }}
        />
      )}
    </InputWrapperWithErrorMessage>
  );
});
