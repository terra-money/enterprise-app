import { MultisigMember } from 'types/MultisigMember';
import { HStack } from 'lib/ui/Stack';
import { Text } from 'lib/ui/Text';
import styled from 'styled-components';
import { Slider } from 'lib/ui/inputs/Slider';
import { FormState } from 'lib/shared/hooks/useForm';
import { DeleteButton } from 'lib/ui/buttons/DeleteButton';
import { inputBackgroundCSS, inputBorderRadiusCSS, inputPaddingCSS } from 'lib/ui/inputs/config';
import { InputWrapperWithErrorMessage } from 'lib/ui/inputs/InputWrapper';
import { TextInputContainer, commonInputCSS } from 'lib/ui/inputs/TextInput';
import { SeparatedByLine } from 'lib/ui/SeparatedByLine';

interface MultisigMemberInputProps extends FormState<MultisigMember> {
  onChange: (member: Partial<MultisigMember>) => void;
  onRemove: () => void;
}

const Content = styled.div`
  display: grid;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 80px;
  align-items: center;
  gap: 16px;
`;

const Container = styled.div`
  width: 100%;
  overflow: hidden;
  ${inputBorderRadiusCSS};
  ${inputBackgroundCSS};

  ${commonInputCSS};
  height: initial;
  padding: 0;

  > * {
    ${inputPaddingCSS};
  }
`;

const InputWr = styled(HStack)``;

const AddrInput = styled(TextInputContainer)`
  background: transparent;
  outline: none;
  border: none;
  padding: 0;
  height: initial;
`;

export const MultisigMemberInput = ({ addr, addrError, weight, onChange, onRemove }: MultisigMemberInputProps) => {
  return (
    <InputWrapperWithErrorMessage error={addrError}>
      <Container isValid={!addrError}>
        <SeparatedByLine gap={16}>
          <InputWr gap={24} alignItems="center">
            <AddrInput
              autoFocus
              isValid={!addrError}
              placeholder="Enter a wallet address"
              value={addr}
              onChange={({ currentTarget }) => onChange({ addr: currentTarget.value })}
            />

            <DeleteButton onClick={onRemove} />
          </InputWr>
          {!addrError && (
            <HStack>
              <HStack gap={20} fullWidth alignItems="center">
                <Text color="supporting">Weight</Text>
                <Content>
                  <Slider
                    size="l"
                    step={1}
                    min={0}
                    max={100}
                    onChange={(weight) => onChange({ weight })}
                    value={weight}
                  />
                  <Text style={{ textAlign: 'end' }} weight="bold">
                    {weight}%
                  </Text>
                </Content>
              </HStack>
            </HStack>
          )}
        </SeparatedByLine>
      </Container>
    </InputWrapperWithErrorMessage>
  );
};
