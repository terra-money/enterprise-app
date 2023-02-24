import { Address } from 'components/address';
import { useCurrentDao } from 'dao/components/CurrentDaoProvider';
import { SameWidthChildrenRow } from 'lib/ui/Layout/SameWidthChildrenRow';
import { TitledContent } from 'lib/ui/Layout/TitledContent';
import { TitledSection } from 'lib/ui/Layout/TitledSection';
import { Panel } from 'lib/ui/Panel/Panel';
import { enterprise } from 'types/contracts';

const membershipName: Record<enterprise.DaoType, string> = {
  multisig: 'Multisig',
  token: 'Token',
  nft: 'NFT collection',
};

export const AddressesOverview = () => {
  const { address, membershipContractAddress, fundsDistributorContract, type } = useCurrentDao();

  return (
    <TitledSection title="Addresses">
      <SameWidthChildrenRow minChildrenWidth={320} gap={16}>
        <Panel>
          <TitledContent title="DAO address">
            <Address address={address} />
          </TitledContent>
        </Panel>
        <Panel>
          <TitledContent title={`${membershipName[type]} address`}>
            <Address address={membershipContractAddress} />
          </TitledContent>
        </Panel>
        <Panel>
          <TitledContent title={"Funds distributor address"}>
            <Address address={fundsDistributorContract} />
          </TitledContent>
        </Panel>
      </SameWidthChildrenRow>
    </TitledSection>
  );
};
