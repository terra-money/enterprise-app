import { getDaoRatio } from 'pages/create-dao/helpers/toCreateDaoMsg';
import { enterprise } from 'types/contracts';

interface ToUpdateCouncilMsgParams {
  members: string[];
  allowedProposalTypes: enterprise.ProposalActionType[];
  quorum: number;
  threshold: number;
}

export const toUpdateCouncilMsg = ({
  members,
  allowedProposalTypes,
  quorum,
  threshold,
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
      quorum: getDaoRatio(quorum),
      threshold: getDaoRatio(threshold),
    },
  };
};
