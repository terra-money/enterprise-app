import styled from 'styled-components';
import { TextInputContainer } from './TextInput';
import { centerContentCSS } from '../utils/centerContentCSS';
import { SearchIcon } from '../icons/SearchIcon';
import { InputWrapper } from './InputWrapper';
import { VStack } from '../Stack';
import { ChangeEvent } from 'react';
import { CloseButton } from '../buttons/CloseButton';

const searchInputHeight = `60px`;

const Input = styled(TextInputContainer)`
  height: ${searchInputHeight};
  padding-left: ${searchInputHeight};
`;

interface SearchTextInputProps extends React.ComponentProps<typeof Input> {
  onValueChange: (value: string) => void;
}

const SearchIconWrapper = styled.div`
  position: absolute;
  pointer-events: none;
  width: ${searchInputHeight};
  left: 0;
  font-size: 20px;
  ${centerContentCSS};
`;

const CloseIconWr = styled.div`
  position: absolute;
  width: ${searchInputHeight};
  right: 0;
  ${centerContentCSS};
`;

export const SearchInput = ({ onClear, onValueChange, ...props }: SearchTextInputProps) => {
  return (
    <InputWrapper>
      <VStack fullWidth justifyContent="center" style={{ position: 'relative' }}>
        <Input
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            props.onChange?.(event);
            onValueChange?.(event.currentTarget.value);
          }}
          isValid
          {...props}
          placeholder={props.placeholder ?? 'Search...'}
        />
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        {props.value && (
          <CloseIconWr>
            <CloseButton as="div" onClick={() => onValueChange('')} />
          </CloseIconWr>
        )}
      </VStack>
    </InputWrapper>
  );
};
