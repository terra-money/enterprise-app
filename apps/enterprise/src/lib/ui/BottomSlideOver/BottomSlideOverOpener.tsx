import { useBoolean } from 'lib/shared/hooks/useBoolean';
import { ReactNode } from 'react';
import { BottomSlideOver, BottomSlideOverProps } from '.';

interface OpenerParams {
  onClick: () => void;
}

type BottomSlideOverOpenerProps = Omit<BottomSlideOverProps, 'onClose'> & {
  renderOpener: (params: OpenerParams) => ReactNode;
};

export const BottomSlideOverOpener = ({ renderOpener, ...props }: BottomSlideOverOpenerProps) => {
  const [isOpen, { toggle: toggleMenu }] = useBoolean(false);

  return (
    <>
      {renderOpener({ onClick: toggleMenu })}
      {isOpen && <BottomSlideOver onClose={toggleMenu} {...props} />}
    </>
  );
};
