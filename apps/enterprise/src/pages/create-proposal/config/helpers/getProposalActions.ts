import { ConfigProposalFormState } from '../useCreateConfigProposalForm';
import { DAO } from 'types';
import { enterprise } from 'types/contracts';
import { toUpdateGovConfigMsg } from './toUpdateGovConfigMsg';
import { toUpdateMetadataMsg } from '../../metadata/toUpdateMetadataMsg';

const hasChangedFields = (msg: Record<string, any>) => Object.values(msg).some((value) => value !== 'no_change');

export const getProposalActions = (
  formInput: ConfigProposalFormState,
  dao: DAO,
  tokenDecimals?: number
): enterprise.ProposalAction[] => {
  const proposalActions: enterprise.ProposalAction[] = [];

  const updateMetadataMsg = toUpdateMetadataMsg(dao, formInput);
  if (hasChangedFields(updateMetadataMsg)) {
    proposalActions.push({ update_metadata: updateMetadataMsg });
  }

  const updateGovConfigMsg = toUpdateGovConfigMsg(dao, formInput, tokenDecimals);
  if (hasChangedFields(updateGovConfigMsg)) {
    proposalActions.push({ update_gov_config: updateGovConfigMsg });
  }

  return proposalActions;
};
