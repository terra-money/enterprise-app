import { CW20Addr } from '@terra-money/apps/types';
import { assertDefined } from '@terra-money/apps/utils';
import { ConditionalWallet } from 'components/conditional-wallet';
import { Navigation } from 'components/Navigation';
import { ConnectWalletPrompt } from 'components/not-connected';
import { ConditionalRender } from 'components/primitives';
import { useDAOQuery } from 'queries';
import { useParams } from 'react-router';
import { BurnTokensProposalPage } from './burn/BurnTokensProposalPage';
import { CreateConfigProposalPage } from './config/CreateConfigProposalPage';
import { DelegateProposalPage } from './delegate/DelegateProposalPage';
import { MultisigMembersProposalPage } from './multisig-members/MultisigMembersProposalPage';
import { proposalTitle, ProposalType, ProposalVotingType } from './SelectProposalTypePage';
import { SpendTreasuryProposalPage } from './spend/SpendTreasuryProposalPage';
import { UpdateWhitelistedAssetsProposalPage } from './whitelisted-assets/UpdateWhitelistedAssetsProposalPage';
import { UpdateWhitelistedNFTsProposalPage } from './whitelisted-nfts/UpdateWhitelistedNFTsProposalPage';
import { LoadingPage } from 'pages/shared/LoadingPage';
import { CurrentDaoProvider } from 'pages/shared/CurrentDaoProvider';
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

export const CreateProposalPage = () => {
  const params = useParams<CreateProposalPageParams>();
  const type = assertDefined(params.type);
  const address = assertDefined(params.address);
  const [searchParams] = useSearchParams();

  const proposalVotingType = (searchParams.get('votingType') || 'regular') as ProposalVotingType;
  console.log(proposalVotingType);

  const { data: dao, isLoading } = useDAOQuery(address as CW20Addr);

  return (
    <Navigation>
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
                      council={() => <CouncilForm />}
                      text={() => <TextProposalForm />}
                      config={() => <CreateConfigProposalPage />}
                      upgrade={() => <UpgradeProposalForm />}
                      assets={() => <UpdateWhitelistedAssetsProposalPage />}
                      nfts={() => <UpdateWhitelistedNFTsProposalPage />}
                      execute={() => <ExecuteMessageProposalForm />}
                      members={() => <MultisigMembersProposalPage />}
                      mint={() => <MintTokensProposalForm />}
                      spend={() => <SpendTreasuryProposalPage />}
                      burn={() => <BurnTokensProposalPage />}
                      delegate={() => <DelegateProposalPage />}
                    />
                  </CurrentDaoProvider>
                ) : null}
              </Container>
            </AnimatedPage>
          )}
        />
      </LoadingPage>
    </Navigation>
  );
};
