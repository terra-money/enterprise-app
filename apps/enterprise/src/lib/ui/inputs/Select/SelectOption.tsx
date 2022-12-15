import { ReactNode, useEffect, useRef } from 'react';
import styled, { css } from 'styled-components';
import { centerContentCSS } from 'lib/ui/utils/centerContentCSS';

import { InvisibleHTMLRadio, Props as InvisibleHTMLRadioProps } from '../InvisibleHTMLRadio';
import { roundedCSS } from 'lib/ui/utils/roundedCSS';
import { Text } from 'lib/ui/Text';

const Container = styled.label<{ isSelected: boolean }>`
  cursor: pointer;
  ${roundedCSS}
  padding: 0 16px;
  text-decoration: none;
  ${centerContentCSS};
  font-size: 14px;
  font-weight: 500;
  height: 48px;

  :hover {
    background: ${({ theme }) => theme.colors.foregroundAltHover.toCssValue()};
  }

  ${({ isSelected, theme }) =>
    isSelected &&
    css`
      background: ${theme.colors.foregroundAlt.toCssValue()};
    `};
`;

interface Props extends InvisibleHTMLRadioProps {
  children: ReactNode;
  className?: string;
}

export const SelectOption = ({ isSelected, children, className, ...rest }: Props) => {
  const ref = useRef<HTMLLabelElement>(null);
  useEffect(() => {
    if (isSelected) {
      ref.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [isSelected]);

  return (
    <Container ref={ref} className={className} tabIndex={-1} isSelected={isSelected}>
      <Text color={isSelected ? 'gradient' : 'supporting'}>{children}</Text>
      <InvisibleHTMLRadio isSelected={isSelected} {...rest} />
    </Container>
  );
};
