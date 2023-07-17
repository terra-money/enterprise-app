import { useCurrentDao } from 'dao/components/CurrentDaoProvider';
import { Navigate } from 'react-router';
import { MultisigMembers } from './MultisigMembers';
import { toDao } from 'dao/utils/toDao';
import { Spinner } from 'lib/ui/Spinner';

export const Members = () => {
  const dao = useCurrentDao();

  if (dao === undefined) {
    return <Spinner />;
  }

  if (dao.dao_type === 'multisig') {
    return <MultisigMembers dao={toDao(dao)} />;
  }

  return <Navigate to={`/dao/${dao.address}`} replace={true} />;
};
