import { Throbber } from 'components/primitives';
import { Navigate } from 'react-router';
import { TokenStaking } from './TokenStaking';
import { NFTStaking } from './NFTStaking';
import { useCurrentDao } from 'pages/shared/CurrentDaoProvider';

export const Staking = () => {
  const dao = useCurrentDao();

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
