import { ConditionalRender } from 'components/primitives';
import { CurrentDAOMultisigMembersProvider } from 'pages/create-proposal/multisig-members/CurrentDAOMultisigMembersProvider';
import { ConfigProposalActions } from './ConfigProposalActions';
import { useCurrentProposal } from './CurrentProposalProvider';
import { ExecuteMessagesProposalAction } from './ExecuteMessagesProposalAction';
import { UpdateAssetsWhitelistAction } from './UpdateAssetsWhitelistAction';
import { UpdateMultisigMembersAction } from './UpdateMultisigMembersAction';
import { UpdateNFTsWhitelistAction } from './UpdateNFTWhitelistAction';
import { UpgradeProposalAction } from './UpgradeProposalAction';

export const ProposalActions = () => {
  const { type } = useCurrentProposal();

  return (
    <ConditionalRender
      value={type}
      Text={() => null}
      Other={() => null}
      Members={() => (
        <CurrentDAOMultisigMembersProvider>
          <UpdateMultisigMembersAction />
        </CurrentDAOMultisigMembersProvider>
      )}
      Execute={() => <ExecuteMessagesProposalAction />}
      Assets={() => <UpdateAssetsWhitelistAction />}
      NFTs={() => <UpdateNFTsWhitelistAction />}
      Config={() => <ConfigProposalActions />}
      Upgrade={() => <UpgradeProposalAction />}
    />
  );
};
