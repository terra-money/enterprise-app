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
import { UpdateMinimumWeightForRewardsAction } from './UpdateMinimumWeightForRewardsAction';
import { useCurrentDao } from 'dao/components/CurrentDaoProvider';
import { useContractInfoQuery } from 'queries/useContractInfoQuery';
import { useEnterpriseLatestCodeIdQuery } from 'queries/useEnterpriseCodeIdsQuery';
import { Match } from 'lib/ui/Match';

export const ProposalActions = () => {
  const proposal = useCurrentProposal();
  const dao = useCurrentDao();

  const { data: contractInfo } = useContractInfoQuery(dao.address);
  const { data: latestCodeId } = useEnterpriseLatestCodeIdQuery();

  const isUpToDate = latestCodeId && contractInfo ? latestCodeId === contractInfo.code_id : undefined;
  return (
    <VStack gap={40}>
      {proposal.actions
        .filter((action) => !(action.hasOwnProperty('update_minimum_weight_for_rewards') && !isUpToDate))
        .map((action) => {
          const type = getProposalActionType(action);
          const msg = getProposalActionMsg(action);
          return (
            <CurrentProposalActionProvider value={{ type, msg }}>
              <Match
                value={type}
                update_gov_config={() => <GovConfigProposalAction />}
                update_metadata={() => <MetadataProposalAction />}
                update_asset_whitelist={() => <UpdateAssetsWhitelistAction />}
                update_nft_whitelist={() => <UpdateNFTsWhitelistAction />}
                request_funding_from_dao={() => null}
                execute_msgs={() => <ExecuteMessagesProposalAction />}
                update_council={() => <UpdateCouncilAction />}
                upgrade_dao={() => <UpgradeProposalAction />}
                distribute_funds={() => null}
                update_minimum_weight_for_rewards={() => <UpdateMinimumWeightForRewardsAction />}
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
