import { VStack } from 'lib/ui/Stack';
import { Text } from 'lib/ui/Text';
import styled from 'styled-components';
import { PrimarySelectOption } from './PrimarySelectOption';

interface Props<T> {
  label?: string;
  options: readonly T[];
  getName: (option: T) => string;
  selectedOption: T;
  onSelect: (option: T) => void;
  groupName: string;
}

const Container = styled(VStack)`
  gap: 24px;
  max-width: 554px;
  position: relative;
`;

export function PrimarySelect<T>({ options, getName, selectedOption, groupName, onSelect, label }: Props<T>) {
  return (
    <Container>
      {label && <Text color="supporting">{label}</Text>}
      {options.map((option) => (
        <PrimarySelectOption
          groupName={groupName}
          isSelected={option === selectedOption}
          value={getName(option)}
          onSelect={() => onSelect(option)}
          key={getName(option)}
        >
          {getName(option)}
        </PrimarySelectOption>
      ))}
    </Container>
  );
}
