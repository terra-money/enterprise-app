import { useRhythmicRerender } from './hooks/useRhythmicRerender';
import { formatDistanceToNowStrict } from 'date-fns';
import { Text } from './Text';
import { Tooltip } from './Tooltip';

interface TimeAgoProps {
  value: Date;
}

export const TimeAgo = ({ value }: TimeAgoProps) => {
  useRhythmicRerender();

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
    <Tooltip
      content={dateDetails}
      renderOpener={props => (
        <Text {...props}>
          {formatDistanceToNowStrict(value, { addSuffix: true })}
        </Text>
      )}
    />
  );
};
