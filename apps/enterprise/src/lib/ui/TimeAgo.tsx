import { useRhythmicRerender } from './hooks/useRhythmicRerender';
import { formatDistanceToNowStrict } from 'date-fns';
import { Text } from './Text';
import styled, { keyframes } from 'styled-components';
import { useState } from 'react';
import { useBoolean } from 'lib/shared/hooks/useBoolean';
import { Popover } from './popover/Popover';

interface TimeAgoProps {
  value: Date;
}

// TODO: reuse between RectButton
const tooltipAnimation = keyframes`
  from {
    transform: translateY(4px);
    opacity: 0.6;
  }
`;

const TooltipContainer = styled.div`
  border-radius: 4px;
  padding: 4px 8px;
  background: ${({ theme }) => theme.colors.text.getVariant({ a: () => 1 }).toCssValue()};
  color: ${({ theme }) => theme.colors.background.toCssValue()};
  font-size: 14px;
  max-width: 320px;
  text-align: center;
  animation: ${tooltipAnimation} 300ms ease-out;
`;

export const TimeAgo = ({ value }: TimeAgoProps) => {
  useRhythmicRerender();

  const [anchor, setAnchor] = useState<HTMLElement | null>(null);

  const [isTooltipOpen, { unset: hideTooltip, set: showTooltip }] = useBoolean(false);

  const dateDetails = value.toLocaleString('en-US', {
    weekday: 'short',
    day: 'numeric',
    year: 'numeric',
    month: 'long',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
  });

  return (
    <Text onMouseEnter={showTooltip} onMouseLeave={hideTooltip} ref={setAnchor}>
      {formatDistanceToNowStrict(value, { addSuffix: true })}
      {anchor && isTooltipOpen && (
        <Popover placement="bottom" anchor={anchor}>
          <TooltipContainer>{dateDetails}</TooltipContainer>
        </Popover>
      )}
    </Text>
  );
};
