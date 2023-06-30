import { ComponentWithChildrenProps } from 'lib/shared/props';
import { HelpCircleIcon } from './icons/HelpCircleIcon';
import { Tooltip } from './Tooltip';
import { ReactNode } from 'react';
import { HStack } from './Stack';

interface WithHintProps extends ComponentWithChildrenProps {
  hint?: ReactNode;
}

export const WithHint = ({ children, hint }: WithHintProps) => {
  return (
    <HStack alignItems="center" gap={4}>
      {children}
      {hint && (
        <Tooltip
          placement="top"
          content={hint}
          renderOpener={(props) => (
            <div {...props}>
              <HelpCircleIcon />
            </div>
          )}
        />
      )}
    </HStack>
  );
};
