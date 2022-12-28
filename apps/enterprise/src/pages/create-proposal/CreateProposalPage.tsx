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
import { ProposalType } from './SelectProposalTypePage';
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

type CreateProposalPageParams = {
  type: ProposalType;
  address: CW20Addr;
};

export const CreateProposalPage = () => {
  const { type, address } = useParams<CreateProposalPageParams>();

  const { data: dao, isLoading } = useDAOQuery(address as CW20Addr);

  return (
    <Navigation>
      <LoadingPage isLoading={isLoading}>
        <ConditionalWallet
          notConnected={() => <ConnectWalletPrompt />}
          connected={() =>
            dao ? (
              <CurrentDaoProvider value={dao}>
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
            ) : null
          }
        />
      </LoadingPage>
    </Navigation>
  );
};
