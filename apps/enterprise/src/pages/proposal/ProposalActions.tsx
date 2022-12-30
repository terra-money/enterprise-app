import { ConditionalRender } from 'components/primitives';
import { CurrentProposalActionProvider } from 'dao/components/CurrentProposalActionProvider';
import { getProposalActionMsg, getProposalActionType } from 'dao/shared/proposal';
import { VStack } from 'lib/ui/Stack';
import { CurrentDAOMultisigMembersProvider } from 'pages/create-proposal/multisig-members/CurrentDAOMultisigMembersProvider';
import { useCurrentProposal } from './CurrentProposalProvider';
import { ExecuteMessagesProposalAction } from './ExecuteMessagesProposalAction';
import { GovConfigProposalAction } from './GovConfigProposalAction';
import { MetadataProposalAction } from './MetadataProposalAction';
import { UpdateAssetsWhitelistAction } from './UpdateAssetsWhitelistAction';
import { UpdateCouncilAction } from './UpdateCouncilAction';
import { UpdateMultisigMembersAction } from './UpdateMultisigMembersAction';
import { UpdateNFTsWhitelistAction } from './UpdateNFTWhitelistAction';
import { UpgradeProposalAction } from './UpgradeProposalAction';

export const ProposalActions = () => {
  const proposal = useCurrentProposal();

  return (
    <VStack gap={40}>
      {proposal.proposal_actions.map((action) => {
        const type = getProposalActionType(action);
        const msg = getProposalActionMsg(action);
        return (
          <CurrentProposalActionProvider value={{ type, msg }}>
            <ConditionalRender
              value={type}
              update_gov_config={() => <GovConfigProposalAction />}
              update_metadata={() => <MetadataProposalAction />}
              update_asset_whitelist={() => <UpdateAssetsWhitelistAction />}
              update_nft_whitelist={() => <UpdateNFTsWhitelistAction />}
              request_funding_from_dao={() => null}
              execute_msgs={() => <ExecuteMessagesProposalAction />}
              update_council={() => <UpdateCouncilAction />}
              upgrade_dao={() => <UpgradeProposalAction />}
              modify_multisig_membership={() => (
                <CurrentDAOMultisigMembersProvider>
                  <UpdateMultisigMembersAction />
                </CurrentDAOMultisigMembersProvider>
              )}
            />
          </CurrentProposalActionProvider>
        );
      })}
    </VStack>
  );
};
