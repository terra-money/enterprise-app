import { useMyAddress } from 'chain/hooks/useMyAddress';
import { useCurrentDao } from 'dao/components/CurrentDaoProvider';

export const useAmICouncilMember = () => {
  // @ts-ignore
  const { dao_council } = useCurrentDao();

  const myAddress = useMyAddress();

  if (!dao_council || !myAddress) {
    return false;
  }

  return dao_council.members.includes(myAddress);
};
