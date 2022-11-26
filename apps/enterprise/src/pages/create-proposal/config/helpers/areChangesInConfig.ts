import { ConfigProposalFormState } from '../useCreateConfigProposalForm';
import { DAO } from 'types';
import { getProposalActions } from './getProposalActions';

export const areChangesInConfig = (formInput: ConfigProposalFormState, dao: DAO) => {
  return getProposalActions(formInput, dao).length > 0;
};
