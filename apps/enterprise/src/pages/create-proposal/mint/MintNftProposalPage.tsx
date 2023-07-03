import { useNftMinterQuery } from 'chain/queries/useNftMinterQuery';
import { Throbber } from 'components/primitives';
import { useCurrentDao } from 'dao/components/CurrentDaoProvider';
import { HStack, VStack } from 'lib/ui/Stack';
import { Text } from 'lib/ui/Text';
import { MintNftProposalForm } from './MintNftProposalForm';
import { Address } from 'chain/components/Address';

export const MintNftProposalPage = () => {
  const dao = useCurrentDao();
  const { data: minter } = useNftMinterQuery(dao.dao_membership_contract);

  if (!minter) {
    return <Throbber />;
  }

  if (minter !== dao.address) {
    return (
      <VStack gap={16}>
        <HStack gap={8} alignItems="center">
          <Text>NFTs minter:</Text>
          <Address value={minter} />
        </HStack>
        <Text color="alert">You can't mint NFTs on this DAO because the NFT minter is set to another address.</Text>
      </VStack>
    );
  }

  return <MintNftProposalForm />;
};
