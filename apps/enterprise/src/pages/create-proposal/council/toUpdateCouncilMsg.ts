import { enterprise } from 'types/contracts';

export type AssetType = 'native' | 'cw20';

interface ToUpdateCouncilMsgParams {
  members: string[];
  allowedProposalTypes: enterprise.ProposalActionType[];
}

export const toUpdateCouncilMsg = ({
  members,
  allowedProposalTypes,
}: ToUpdateCouncilMsgParams): enterprise.UpdateCouncilMsg => {
  if (members.length === 0) {
    return {
      dao_council: null,
    };
  }

  return {
    dao_council: {
      members,
      allowed_proposal_action_types: allowedProposalTypes,
      // TODO: receive from the form
      quorum: '0.3',
      threshold: '0.51',
    },
  };
};
