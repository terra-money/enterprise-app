import { ReactNode } from 'react';
import { Text } from 'lib/ui/Text';

import { PopoverHolder } from './PopoverHolder';
import { ReversedTooltip } from './ReversedTooltip';

interface Props {
  children: ReactNode;
  text?: ReactNode;
}

export const SimpleTooltip = ({ children, text }: Props) => {
  if (!text) return <>{children}</>;
  return (
    <PopoverHolder
      renderContainer={(props) => <div {...props}>{children}</div>}
      tooltip={
        <ReversedTooltip>
          <Text as="div">{text}</Text>
        </ReversedTooltip>
      }
    />
  );
};
