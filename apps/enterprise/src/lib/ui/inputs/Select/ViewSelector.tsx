import { HStack } from 'lib/ui/Stack';
import { hideScrollbarsCSS } from 'lib/ui/utils/hideScrollbarsCSS';
import styled from 'styled-components';

import { SelectOption } from './SelectOption';

interface Props<T> {
  options: readonly T[];
  getName: (option: T) => string;
  selectedOption: T;
  onSelect: (option: T) => void;
  groupName: string;
}

const Container = styled(HStack)`
  gap: 4px;
  overflow-x: auto;

  ${hideScrollbarsCSS};
`;

export function ViewSelector<T>({ options, getName, selectedOption, groupName, onSelect }: Props<T>) {
  return (
    <Container>
      {options.map((option) => (
        <SelectOption
          groupName={groupName}
          isSelected={option === selectedOption}
          value={getName(option)}
          onSelect={() => onSelect(option)}
          key={getName(option)}
        >
          {getName(option)}
        </SelectOption>
      ))}
    </Container>
  );
}
