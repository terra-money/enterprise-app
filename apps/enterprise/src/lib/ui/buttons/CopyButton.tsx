import { Text } from 'lib/ui/Text';
import styled from 'styled-components';
import copy from 'copy-to-clipboard';
import { useState } from 'react';
import { defaultTransitionCSS } from '../animations/transitions';
import { Button } from './Button';
import { Match } from '../Match';
import { HStack } from '../Stack';
import { CopyIcon } from '../icons/CopyIcon';
import { CheckIcon } from '../icons/CheckIcon';

interface CopyButtonProps extends Omit<React.ComponentProps<typeof Button>, 'children'> {
  content: string;
}

const IconWr = styled(Text)`
  margin-left: 4px;
  ${defaultTransitionCSS};
`;

type IconToShow = 'copy' | 'copied';

export const CopyButton = ({ content, ...rest }: CopyButtonProps) => {
  const [iconToShow, setIconToShow] = useState<IconToShow>('copy');

  return (
    <Button
      onMouseLeave={() => setIconToShow('copy')}
      onTouchEnd={() => setIconToShow('copy')}
      onClick={() => {
        copy(content);
        setIconToShow('copied');
      }}
      {...rest}
    >
      <HStack alignItems="center" gap={8}>
        <Text>Copy</Text>
        <IconWr as="span">
          <Match value={iconToShow} copy={() => <CopyIcon />} copied={() => <CheckIcon />} />
        </IconWr>
      </HStack>
    </Button>
  );
};
