import { useBoolean } from 'lib/shared/hooks/useBoolean';
import { ReactNode, useState } from 'react';
import { Popover, PopoverPlacement } from './Popover';

interface OpenerParams {
  onClick: () => void;
}

interface Props {
  renderOpener: (params: OpenerParams) => ReactNode;
  renderContent: () => ReactNode;
  placement?: PopoverPlacement;
}

export const PopoverOpener = ({ renderOpener, renderContent, placement }: Props) => {
  const [anchor, setAnchor] = useState<HTMLDivElement | null>(null);
  const [isMenuOpen, { toggle: toggleMenu }] = useBoolean(false);

  return (
    <>
      <div ref={setAnchor}>{renderOpener({ onClick: toggleMenu })}</div>
      {anchor && isMenuOpen && (
        <Popover placement={placement} onClickOutside={toggleMenu} anchor={anchor}>
          {renderContent()}
        </Popover>
      )}
    </>
  );
};
