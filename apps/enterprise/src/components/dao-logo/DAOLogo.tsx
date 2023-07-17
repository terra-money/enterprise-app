import { SafeImage } from 'components/safe-image/SafeImage';
import { forwardRef } from 'react';
import { ReactComponent as LogoIcon } from 'components/assets/LogoSmall.svg';
import styled from 'styled-components';
import { roundedCSS } from 'lib/ui/utils/roundedCSS';
import { centerContentCSS } from 'lib/ui/utils/centerContentCSS';
import { getSameDimensionsCSS } from 'lib/ui/utils/getSameDimensionsCSS';
import { getColor } from 'lib/ui/theme/getters';

export const daoLogoSizes = ['s', 'm', 'l'] as const;

type DaoLogoSize = (typeof daoLogoSizes)[number];

const logoSizeRecord: Record<DaoLogoSize, number> = {
  s: 40,
  m: 48,
  l: 60,
};

export interface DAOLogoProps {
  logo?: string;
  size?: DaoLogoSize;
  className?: string;
}

const Container = styled.div<{ size: DaoLogoSize }>`
  background: ${getColor('mist')};
  ${roundedCSS};
  ${centerContentCSS};

  ${({ size }) => getSameDimensionsCSS(logoSizeRecord[size])};

  img {
    object-fit: cover;
    ${roundedCSS};
    width: 64%;

    ${getSameDimensionsCSS('64%')};
  }
`;

export const DAOLogo = forwardRef<any, DAOLogoProps>((props, ref) => {
  const { logo, size = 'm', className } = props;

  return (
    <Container ref={ref} size={size} className={className}>
      <SafeImage fallback={<LogoIcon />} src={logo} render={(params) => <img ref={ref} {...params} alt="" />} />
    </Container>
  );
});
