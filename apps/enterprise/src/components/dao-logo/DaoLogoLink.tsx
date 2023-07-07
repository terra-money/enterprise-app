import { InternalLink } from 'components/link';
import { getDaoPath } from 'navigation';
import styled from 'styled-components';
import { DAOLogo, DAOLogoProps } from './DAOLogo';
import { getColor } from 'lib/ui/theme/getters';

interface DaoLogoLinkProps extends DAOLogoProps {
  address: string;
}

const Logo = styled(DAOLogo)`
  :hover {
    background: ${getColor('mistExtra')};
  }
`;

export const DaoLogoLink = ({ address, ...rest }: DaoLogoLinkProps) => {
  return (
    <InternalLink to={getDaoPath(address)}>
      <Logo {...rest} />
    </InternalLink>
  );
};
