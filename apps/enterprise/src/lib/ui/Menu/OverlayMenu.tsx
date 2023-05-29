import { ReactNode, useState } from 'react';
import { BottomSlideOver } from 'lib/ui/BottomSlideOver';

import { MenuOption, MenuOptionProps } from './MenuOption';
import { PopoverMenu } from './PopoverMenu';
import { useBoolean } from 'lib/shared/hooks/useBoolean';
import { PrimaryButton } from '../buttons/rect/PrimaryButton';
import { Popover } from '../popover/Popover';
import { ResponsiveView } from '../ResponsiveView';
import { HStack, VStack } from '../Stack';
import { Text } from '../Text';

interface OpenerParams {
  ref: (anchor: HTMLElement | null) => void;
  onClick: () => void;
}

interface OverlayMenuProps {
  title: ReactNode;
  content?: ReactNode;
  options?: MenuOptionProps[];
  renderOpener: (params: OpenerParams) => ReactNode;
}

export function OverlayMenu({ options, renderOpener, title, content }: OverlayMenuProps) {
  const [anchor, setAnchor] = useState<HTMLElement | null>(null);

  const [isMenuOpen, { unset: closeMenu, toggle: toggleMenu }] = useBoolean(false);

  return (
    <>
      {renderOpener({ onClick: toggleMenu, ref: setAnchor })}
      {isMenuOpen && anchor && (
        <ResponsiveView
          small={() => (
            <BottomSlideOver onClose={closeMenu} title={title}>
              <VStack gap={12}>
                {content && (
                  <VStack style={{ padding: 20 }} gap={12}>
                    {content}
                  </VStack>
                )}
                {options &&
                  options.map(({ text, icon, onSelect, kind }) => (
                    <PrimaryButton
                      style={{ justifyContent: 'flex-start', height: 56 }}
                      kind={kind === 'alert' ? 'alert' : 'secondary'}
                      size="l"
                      isRounded={true}
                      key={text}
                      onClick={() => {
                        onSelect();
                        closeMenu();
                      }}
                    >
                      <HStack alignItems="center" gap={8}>
                        {icon} <Text>{text}</Text>
                      </HStack>
                    </PrimaryButton>
                  ))}
              </VStack>
            </BottomSlideOver>
          )}
          normal={() => (
            <Popover placement="bottom" onClickOutside={toggleMenu} anchor={anchor} enableScreenCover>
              <PopoverMenu onClose={closeMenu} title={title}>
                {content && (
                  <VStack style={{ padding: 12 }} gap={8}>
                    {content}
                  </VStack>
                )}
                {options &&
                  options.map(({ text, icon, onSelect, kind }) => (
                    <MenuOption
                      text={text}
                      key={text}
                      icon={icon}
                      kind={kind}
                      onSelect={() => {
                        closeMenu();
                        onSelect();
                      }}
                    />
                  ))}
              </PopoverMenu>
            </Popover>
          )}
        />
      )}
    </>
  );
}
