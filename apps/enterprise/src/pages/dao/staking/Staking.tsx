import { Throbber } from 'components/primitives';
import { Navigate } from 'react-router';
import { useOutletContext } from 'react-router';
import { DAOOutletContext } from '../DAOPage';
import { TokenStaking } from './TokenStaking';
import { NFTStaking } from './NFTStaking';

export const Staking = () => {
  const { dao } = useOutletContext<DAOOutletContext>();

  if (dao === undefined) {
    return <Throbber />;
  }

  switch (dao.type) {
    case 'token':
      return <TokenStaking dao={dao} />;
    case 'nft':
      return <NFTStaking dao={dao} />;
  }

  return <Navigate to={`/dao/${dao!.address}`} replace={true} />;
};
