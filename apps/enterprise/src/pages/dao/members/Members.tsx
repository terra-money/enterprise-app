import { Throbber } from 'components/primitives';
import { Navigate, useOutletContext } from 'react-router';
import { DAOOutletContext } from '../DAOPage';
import { MultisigMembers } from './MultisigMembers';

export const Members = () => {
  const { dao } = useOutletContext<DAOOutletContext>();

  if (dao === undefined) {
    return <Throbber />;
  }

  if (dao.type === 'multisig') {
    return <MultisigMembers dao={dao} />;
  }

  return <Navigate to={`/dao/${dao.address}`} replace={true} />;
};
