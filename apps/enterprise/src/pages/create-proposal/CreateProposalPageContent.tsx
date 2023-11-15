import { assertDefined } from 'lib/shared/utils/assertDefined';
import { ConditionalWallet } from 'components/conditional-wallet';
import { useDAOQuery } from 'queries';
import { useParams } from 'react-router';
import { BurnTokensProposalPage } from './burn/BurnTokensProposalPage';
import { CreateConfigProposalPage } from './config/CreateConfigProposalPage';
import { DelegateProposalPage } from './delegate/DelegateProposalPage';
import { MultisigMembersProposalPage } from './multisig-members/MultisigMembersProposalPage';
import { proposalTitle, ProposalType } from 'dao/shared/proposal';
import { SpendTreasuryProposalPage } from './spend/SpendTreasuryProposalPage';
import { UpdateWhitelistedAssetsProposalPage } from './whitelisted-assets/UpdateWhitelistedAssetsProposalPage';
import { UpdateWhitelistedNFTsProposalPage } from './whitelisted-nfts/UpdateWhitelistedNFTsProposalPage';
import { CurrentDaoProvider } from 'dao/components/CurrentDaoProvider';
import { TextProposalForm } from './text/TextProposalForm';
import { UpgradeProposalForm } from './upgrade/UpgradeProposalForm';
import { ExecuteMessageProposalForm } from './execute/ExecuteMessageProposalForm';
import { MintTokensProposalForm } from './mint/MintTokensProposalForm';
import { CouncilForm } from './council/CouncilForm';
import { useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import { VStack } from 'lib/ui/Stack';
import { Header } from './Header';
import { MetadataProposalForm } from './metadata/MetadataProposalForm';
import { UndelegateProposalForm } from './undelegate/UndelegateProposalForm';
import { RedelegateProposalForm } from './redelegate/RedelegateProposalForm';
import { MintNftProposalPage } from './mint/MintNftProposalPage';
import { enterprise } from 'types/contracts';
import { MinimumWeightForRewardsProposalPage } from './minWeight/MinimumWeightForRewardsProposalPage';
import { Match } from 'lib/ui/Match';
import { ConnectWalletPrompt } from 'chain/components/ConnectWalletPrompt';
import { QueryDependant } from 'lib/query/components/QueryDependant';
import { Center } from 'lib/ui/Center';
import { Spinner } from 'lib/ui/Spinner';
import { Text } from 'lib/ui/Text';
import { CreateProposalProvider } from './CreateProposalProvider';

type CreateProposalPageParams = {
  type: ProposalType;
  address: string;
};

const Container = styled(VStack)`
  height: 100%;
  width: 100%;
  padding: 48px 48px 0 48px;
  gap: 32px;

  overflow-y: auto;

  @media (max-width: 600px) {
    padding: 0;
  }
`;

export const CreateProposalPageContent = () => {
  const params = useParams<CreateProposalPageParams>();
  const type = assertDefined(params.type);
  const address = assertDefined(params.address);
  const [searchParams] = useSearchParams();

  const proposalVotingType = (searchParams.get('votingType') || 'general') as enterprise.ProposalType;

  const { data, status } = useDAOQuery(address);

  return (
    <QueryDependant
      status={status}
      data={data}
      loading={() => (
        <Center>
          <Spinner />
        </Center>
      )}
      error={() => (
        <Center>
          <Text>Failed to load DAO {address}</Text>
        </Center>
      )}
      success={(dao) => (
        <CreateProposalProvider value={{ proposalVotingType }}>
          <ConditionalWallet
            notConnected={() => <ConnectWalletPrompt />}
            connected={() => (
              <Container>
                <CurrentDaoProvider value={dao}>
                  <Header title={proposalTitle[type]} />
                  <Match
                    value={assertDefined(type)}
                    metadata={() => <MetadataProposalForm />}
                    council={() => <CouncilForm />}
                    text={() => <TextProposalForm />}
                    config={() => <CreateConfigProposalPage />}
                    upgrade={() => <UpgradeProposalForm />}
                    assets={() => <UpdateWhitelistedAssetsProposalPage />}
                    nfts={() => <UpdateWhitelistedNFTsProposalPage />}
                    execute={() => <ExecuteMessageProposalForm />}
                    members={() => <MultisigMembersProposalPage />}
                    mint={() => <MintTokensProposalForm />}
                    mintNft={() => <MintNftProposalPage />}
                    spend={() => <SpendTreasuryProposalPage />}
                    burn={() => <BurnTokensProposalPage />}
                    delegate={() => <DelegateProposalPage />}
                    undelegate={() => <UndelegateProposalForm />}
                    redelegate={() => <RedelegateProposalForm />}
                    minWeightForRewards={() => <MinimumWeightForRewardsProposalPage />}
                  />
                </CurrentDaoProvider>
              </Container>
            )}
          />
        </CreateProposalProvider>
      )}
    />
  );
};
