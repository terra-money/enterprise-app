import { Stack, StackProps, VStack } from 'lib/ui/Stack';
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
  direction?: StackProps['direction'];
}

const Container = styled(VStack)`
  max-width: 554px;
  position: relative;
`;

export function PrimarySelect<T>({
  options,
  getName,
  selectedOption,
  groupName,
  onSelect,
  label,
  direction = 'column',
}: Props<T>) {
  return (
    <Container gap={24}>
      {label && <Text color="supporting">{label}</Text>}
      <Stack direction={direction} gap={24}>
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
      </Stack>
    </Container>
  );
}
