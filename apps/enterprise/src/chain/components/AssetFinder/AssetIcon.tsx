import { SafeImage } from 'components/safe-image/SafeImage';
import { forwardRef } from 'react';
import styled from 'styled-components';
import { roundedCSS } from 'lib/ui/utils/roundedCSS';
import { centerContentCSS } from 'lib/ui/utils/centerContentCSS';
import { getSameDimensionsCSS } from 'lib/ui/utils/getSameDimensionsCSS';
import { PictureIcon } from 'lib/ui/icons/PictureIcon';

export const daoLogoSizes = ['s', 'm', 'l'] as const;

type AssetIconSize = (typeof daoLogoSizes)[number];

const sizeRecord: Record<AssetIconSize, number> = {
  s: 24,
  m: 32,
  l: 40,
};

export interface DAOLogoProps {
  icon?: string;
  size?: AssetIconSize;
  className?: string;
}

const Container = styled.div<{ size: AssetIconSize }>`
  ${roundedCSS};
  ${centerContentCSS};

  ${({ size }) => getSameDimensionsCSS(sizeRecord[size])};

  img {
    object-fit: cover;
    ${roundedCSS};

    ${getSameDimensionsCSS('100%')};
  }
`;

export const AssetIcon = forwardRef<any, DAOLogoProps>((props, ref) => {
  const { icon, size = 'm', className } = props;

  return (
    <Container ref={ref} size={size} className={className}>
      <SafeImage fallback={<PictureIcon />} src={icon} render={(params) => <img ref={ref} {...params} alt="" />} />
    </Container>
  );
});
