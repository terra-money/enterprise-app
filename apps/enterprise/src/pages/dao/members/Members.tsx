import { Throbber } from 'components/primitives';
import { useCurrentDao } from 'dao/components/CurrentDaoProvider';
import { Navigate } from 'react-router';
import { MultisigMembers } from './MultisigMembers';
import { toDao } from 'dao/utils/toDao';

export const Members = () => {
  const dao = useCurrentDao();

  if (dao === undefined) {
    return <Throbber />;
  }

  if (dao.dao_type === 'multisig') {
    return <MultisigMembers dao={toDao(dao)} />;
  }

  return <Navigate to={`/dao/${dao.address}`} replace={true} />;
};
