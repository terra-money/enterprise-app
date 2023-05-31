import { CW20Addr } from '@terra-money/apps/types';
import { assertDefined } from '@terra-money/apps/utils';
import { ConditionalWallet } from 'components/conditional-wallet';
import { ConnectWalletPrompt } from 'components/not-connected';
import { ConditionalRender } from 'components/primitives';
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
import { LoadingPage } from 'pages/shared/LoadingPage';
import { CurrentDaoProvider } from 'dao/components/CurrentDaoProvider';
import { TextProposalForm } from './text/TextProposalForm';
import { UpgradeProposalForm } from './upgrade/UpgradeProposalForm';
import { ExecuteMessageProposalForm } from './execute/ExecuteMessageProposalForm';
import { MintTokensProposalForm } from './mint/MintTokensProposalForm';
import { CouncilForm } from './council/CouncilForm';
import { useSearchParams } from 'react-router-dom';
import { AnimatedPage } from '@terra-money/apps/components';
import styled from 'styled-components';
import { VStack } from 'lib/ui/Stack';
import { Header } from './Header';
import { CreateProposalProvider } from './CreateProposalProvider';
import { MetadataProposalForm } from './metadata/MetadataProposalForm';
import { UndelegateProposalForm } from './undelegate/UndelegateProposalForm';
import { RedelegateProposalForm } from './redelegate/RedelegateProposalForm';
import { MintNftProposalPage } from './mint/MintNftProposalPage';
import { enterprise } from 'types/contracts';
import { MinimumWeightForRewardsProposalPage } from './minWeight/MinimumWeightForRewardsProposalPage';

type CreateProposalPageParams = {
  type: ProposalType;
  address: CW20Addr;
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

  const { data: dao, isLoading } = useDAOQuery(address as CW20Addr);

  return (
    <CreateProposalProvider value={{ proposalVotingType }}>
      <LoadingPage isLoading={isLoading}>
        <ConditionalWallet
          notConnected={() => <ConnectWalletPrompt />}
          connected={() => (
            <AnimatedPage>
              <Container>
                {dao ? (
                  <CurrentDaoProvider value={dao}>
                    <Header title={proposalTitle[type]} />
                    <ConditionalRender
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
                ) : null}
              </Container>
            </AnimatedPage>
          )}
        />
      </LoadingPage>
    </CreateProposalProvider>
  );
};
