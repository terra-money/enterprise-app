import { useBoolean } from 'lib/shared/hooks/useBoolean';
import { Dispatch, ReactNode, SetStateAction, useState } from 'react';

import { Popover } from './Popover';

interface RenderContainerParams {
  onMouseLeave: () => void;
  onMouseEnter: () => void;
  ref: Dispatch<SetStateAction<HTMLElement | null>>;
}

interface Props {
  renderContainer: (params: RenderContainerParams) => ReactNode;
  tooltip?: ReactNode;
}

export const PopoverHolder = ({ renderContainer, tooltip }: Props) => {
  const [anchor, setAnchor] = useState<HTMLElement | null>(null);

  const [isTooltipOpen, { unset: hideTooltip, set: showTooltip }] = useBoolean(false);

  return (
    <>
      {renderContainer({
        onMouseEnter: showTooltip,
        onMouseLeave: hideTooltip,
        ref: setAnchor,
      })}
      {anchor && isTooltipOpen && tooltip && (
        <Popover placement="top" anchor={anchor}>
          {tooltip}
        </Popover>
      )}
    </>
  );
};
