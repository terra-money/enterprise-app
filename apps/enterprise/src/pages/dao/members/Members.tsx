import { Throbber } from 'components/primitives';
import { useCurrentDao } from 'dao/components/CurrentDaoProvider';
import { Navigate } from 'react-router';
import { MultisigMembers } from './MultisigMembers';

export const Members = () => {
  const dao = useCurrentDao();

  if (dao === undefined) {
    return <Throbber />;
  }

  if (dao.type === 'multisig') {
    return <MultisigMembers dao={dao} />;
  }

  return <Navigate to={`/dao/${dao.address}`} replace={true} />;
};
