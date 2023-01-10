import { ComponentWithChildrenProps } from 'lib/shared/props';
import styled, { css } from 'styled-components';
import { defaultTransitionCSS } from 'lib/ui/animations/transitions';
import { centerContentCSS } from 'lib/ui/utils/centerContentCSS';
import { getHorizontalPaddingCSS } from 'lib/ui/utils/getHorizontalPaddingCSS';
import { Spinner } from 'lib/ui/Spinner';

import { UnstyledButton } from '../UnstyledButton';
import { roundedCSS } from 'lib/ui/utils/roundedCSS';
import { PopoverHolder } from 'lib/ui/popover/PopoverHolder';
import { ReversedTooltip } from 'lib/ui/popover/ReversedTooltip';
import { Text } from 'lib/ui/Text';

export const rectButtonSizes = ['xs', 's', 'm', 'l', 'xl'] as const;

type RectButtonSize = typeof rectButtonSizes[number];

export type Props = React.ButtonHTMLAttributes<HTMLButtonElement> &
  ComponentWithChildrenProps & {
    as?: 'button' | 'div';
    size?: RectButtonSize;
    isDisabled?: boolean;
    isLoading?: boolean;
    isRounded?: boolean;
    tooltipText?: string | false;
  };

interface ContainerProps {
  size: RectButtonSize;
  isDisabled?: boolean;
  isLoading?: boolean;
}

const Container = styled(UnstyledButton)<ContainerProps>`
  color: ${({ theme }) => theme.colors.text.toCssValue()};
  ${defaultTransitionCSS};

  ${centerContentCSS};

  ${roundedCSS};

  ${({ size }) =>
    ({
      xs: css`
        ${getHorizontalPaddingCSS(8)}
        height: 28px;
        font-size: 14px;
      `,
      s: css`
        ${getHorizontalPaddingCSS(16)}
        height: 36px;
        font-size: 14px;
      `,
      m: css`
        ${getHorizontalPaddingCSS(24)}
        height: 64px;
        font-size: 16px;
      `,
      l: css`
        ${getHorizontalPaddingCSS(20)}
        height: 56px;
        font-size: 14px;
      `,
      xl: css`
        ${getHorizontalPaddingCSS(40)}
        height: 56px;
        font-size: 18px;
      `,
    }[size])};

  font-weight: 600;

  cursor: ${({ isDisabled, isLoading }) => (isDisabled ? 'initial' : isLoading ? 'wait' : 'pointer')};

  ${({ isDisabled }) =>
    isDisabled &&
    css`
      opacity: 0.8;
    `};
`;

export const RectButton = ({
  children,
  size = 'm',
  isDisabled = false,
  isLoading = false,
  tooltipText,
  onClick,
  ...rest
}: Props) => {
  return (
    <PopoverHolder
      renderContainer={(props) => (
        <Container
          size={size}
          isDisabled={isDisabled}
          isLoading={isLoading}
          onClick={isDisabled || isLoading ? undefined : onClick}
          {...props}
          {...rest}
        >
          {isLoading ? (
            <div>
              <Spinner />
            </div>
          ) : (
            <>{children}</>
          )}
        </Container>
      )}
      tooltip={
        tooltipText ? (
          <ReversedTooltip>
            <Text size={14} as="div">
              {tooltipText}
            </Text>
          </ReversedTooltip>
        ) : undefined
      }
    />
  );
};
