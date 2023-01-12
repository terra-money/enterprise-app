import { gradientBackgroundCSS, gradientColorCSS } from 'lib/ui/gradients';
import styled, { css } from 'styled-components';

import { RectButton, Props as RectButtonProps } from './RectButton';

type PrimaryButtonKind = 'primary' | 'attention' | 'reversed' | 'secondary';

export type Props = RectButtonProps & {
  kind?: PrimaryButtonKind;
};

const defaultKind = 'primary';

const Container = styled(RectButton)<Props>`
  color: ${({ theme }) => theme.colors.white.toCssValue()};

  ${({ kind = defaultKind }) =>
    ({
      primary: css`
        ${gradientBackgroundCSS};
        color: ${({ theme }) => theme.colors.background.toCssValue()};
      `,
      attention: css`
        background: ${({ theme }) => theme.colors.attention.toCssValue()};
      `,
      reversed: css`
        background: ${({ theme }) => theme.colors.text.toCssValue()};
        color: ${({ theme }) => theme.colors.background.toCssValue()};
      `,
      secondary: css`
        background: ${({ theme }) => theme.colors.foregroundAlt.toCssValue()};
        .content {
          ${gradientColorCSS};
        }
      `,
    }[kind])};
  ${({ isDisabled, isLoading, kind = defaultKind }) =>
    !isDisabled &&
    !isLoading &&
    {
      primary: css``,
      attention: css`
        :hover {
          background: ${({ theme }) => theme.colors.attentionHover.toCssValue()};
        }
      `,
      reversed: css`
        :hover {
          background: ${({ theme }) => theme.colors.textSupporting.toCssValue()};
        }
      `,
      secondary: css`
        :hover {
          background: ${({ theme }) => theme.colors.foregroundAltHover.toCssValue()};
        }
      `,
    }[kind]};
`;

export const PrimaryButton = ({ as, ...rest }: Props) => <Container forwardedAs={as} {...rest} />;
