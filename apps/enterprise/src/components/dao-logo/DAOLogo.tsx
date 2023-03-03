import { SafeImage } from 'components/safe-image/SafeImage';
import { forwardRef } from 'react';
import { ReactComponent as LogoIcon } from 'components/assets/LogoSmall.svg';
import styled from 'styled-components';
import { roundedCSS } from 'lib/ui/utils/roundedCSS';
import { centerContentCSS } from 'lib/ui/utils/centerContentCSS';
import { Text } from 'lib/ui/Text';
import { getSameDimensionsCSS } from 'lib/ui/utils/getSameDimensionsCSS';

export const daoLogoSizes = ['s', 'm', 'l'] as const;

type DaoLogoSize = typeof daoLogoSizes[number];

const logoSizeRecord: Record<DaoLogoSize, number> = {
  s: 40,
  m: 48,
  l: 60
}

interface DAOLogoProps {
  logo?: string
  size?: DaoLogoSize
  className?: string
}

const Container = styled.div<{ size: DaoLogoSize }>`
  background: ${({ theme }) => theme.colors.backgroundGlass.toCssValue()};
  ${roundedCSS};
  ${centerContentCSS};

  padding: 8px;

  height: ${({ size }) => getSameDimensionsCSS(logoSizeRecord[size])};

  img {
    object-fit: cover;
    ${({ size }) => getSameDimensionsCSS(logoSizeRecord[size] * 0.64)};
  }
`


export const DAOLogo = forwardRef<any, DAOLogoProps>((props, ref) => {
  const { logo, size = 'm', className } = props;

  return (
    <Container
      ref={ref}
      size={size}
      className={className}
    >
      <SafeImage
        fallback={(
          <Text size={20} color="supporting">
            <LogoIcon />
          </Text>
        )}
        src={logo}
        render={(params) => <img ref={ref} {...params} alt="" />}
      />
    </Container>
  );
});
